import { NextResponse } from 'next/server';
import { OPENAI_MODEL, OPENAI_API_URL } from '@/lib/config';
import { rateLimited } from '@/lib/rate-guard';
import { getAllLessons } from '@/lib/content';
import { MODULES } from '@/lib/modules';

// The AI tutor (spec §8, extended with a course-wide "General" mode). The
// OpenAI key lives server-side only — .env.local, never NEXT_PUBLIC_, never
// in a client bundle.

export const runtime = 'nodejs';

interface LessonChatBody {
  mode: 'lesson';
  lessonId: string;
  lessonTitle: string;
  /** Full MDX source of the current lesson — it's small, just send it. */
  lessonSource: string;
  objectives: string[];
  cheatsheet: string;
  blocksSeen: string[];
  lastWrong?: { prompt: string; myAnswer: string } | null;
  messages: { role: 'user' | 'assistant'; content: string }[];
}

interface GeneralChatBody {
  mode: 'general';
  completedLessonIds: string[];
  currentLessonTitle?: string | null;
  dueReviewCount: number;
  messages: { role: 'user' | 'assistant'; content: string }[];
}

type ChatBody = LessonChatBody | GeneralChatBody;

const SHARED_RULES = `RULES OF ENGAGEMENT
- Prefer the Socratic move for conceptual confusion (e.g. "what would happen if the tail wrapped past the head?"). ONE guiding question, not an interrogation.
- For factual questions, give the answer IMMEDIATELY and directly, then the why. If she asks "what's the complexity of heapify", the first words are "O(n)" — never withhold a fact to be pedagogical.
- Anchor explanations in real systems (Gmail's send queue, Kafka, CDN LRU caches, OS schedulers, git bisect), consistent with this course's own anchors.
- Never be sycophantic. No "great question!". If her answer or assumption is wrong, say plainly that it is wrong and show why. Praise only genuinely sharp observations, briefly.
- Be concise. Use short paragraphs, minimal markdown (bold, inline code, fenced code blocks in Python only). No headers, no bullet-list padding.
- Scope: you are specialized for THIS curriculum — data structures and algorithms as taught here. Politely decline unrelated requests (essay writing, other subjects, general chit-chat) and steer back.`;

function lessonSystemPrompt(b: LessonChatBody): string {
  return `You are the resident tutor inside "Invariant", Vrinda's personal data-structures-and-algorithms learning portal. You are embedded in the lesson "${b.lessonTitle}" (id: ${b.lessonId}) — this is the "This lesson" tab.

${SHARED_RULES}
- Answer in the vocabulary of THIS lesson specifically. If the lesson is about queues, do not reach for graph solutions or material from later modules unless she explicitly asks.

CURRENT LESSON SOURCE (MDX):
${b.lessonSource}

LESSON OBJECTIVES:
${b.objectives.map((o) => `- ${o}`).join('\n')}

LESSON CHEATSHEET:
${b.cheatsheet}

WHERE SHE IS: she has scrolled past ${b.blocksSeen.length} blocks so far${
    b.blocksSeen.length > 0
      ? `, most recently: ${b.blocksSeen.slice(-3).join(', ')}`
      : ' (just opened the lesson)'
  }. Do not reference material far below her position without noting it's coming up.
${
  b.lastWrong
    ? `\nLAST QUESTION SHE GOT WRONG: "${b.lastWrong.prompt}" — her answer was: "${b.lastWrong.myAnswer}". If relevant, probe whether the misconception is resolved; do not gloat.`
    : ''
}`;
}

function curriculumManifest(): string {
  const lessons = getAllLessons();
  return MODULES.map((m) => {
    const ls = lessons.filter((l) => l.meta.module === m.slug);
    const lessonLines = ls
      .map((l) => `    - ${l.meta.title} (id: ${l.meta.id}): ${l.meta.objectives[0] ?? ''}`)
      .join('\n');
    return `  ${m.number}. ${m.title} — ${m.blurb}\n${lessonLines}`;
  }).join('\n');
}

function generalSystemPrompt(b: GeneralChatBody): string {
  return `You are the resident tutor inside "Invariant", Vrinda's personal data-structures-and-algorithms learning portal. This is the "General" tab — not scoped to one lesson. She may ask about anything anywhere in the curriculum below, ask which lesson covers something, or ask you to help her decide what to study next.

${SHARED_RULES}
- You may draw on vocabulary and patterns from ANY module below — this tab is not restricted to one lesson's material.
- If a question is really about a specific lesson's content in depth, you can say so and suggest she open that lesson (naming it) so the "This lesson" tab can see its full source — but still give a real, direct answer here first; don't just punt.

FULL CURRICULUM (module — lessons — one objective each):
${curriculumManifest()}

HER PROGRESS: ${b.completedLessonIds.length} lesson(s) completed${
    b.completedLessonIds.length > 0 ? `: ${b.completedLessonIds.join(', ')}` : ''
  }. ${b.dueReviewCount} review question(s) due today.${
    b.currentLessonTitle ? ` She currently has "${b.currentLessonTitle}" open.` : ''
  }`;
}

export async function POST(req: Request) {
  if (rateLimited()) {
    return NextResponse.json(
      { error: 'Rate limit: >20 requests/minute. Breathe.' },
      { status: 429 },
    );
  }
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY is not set. Add it to .env.local and restart.' },
      { status: 500 },
    );
  }

  const body = (await req.json()) as ChatBody;
  const system = body.mode === 'general' ? generalSystemPrompt(body) : lessonSystemPrompt(body);

  const upstream = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      stream: true,
      temperature: 0.4,
      messages: [
        { role: 'system', content: system },
        ...body.messages.slice(-24),
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '');
    return NextResponse.json(
      { error: `OpenAI error ${upstream.status}: ${text.slice(0, 300)}` },
      { status: 502 },
    );
  }

  // Re-stream SSE deltas as plain text chunks.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();
  const stream = new ReadableStream({
    async start(controller) {
      let buf = '';
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split('\n');
          buf = lines.pop() ?? '';
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith('data:')) continue;
            const data = t.slice(5).trim();
            if (data === '[DONE]') continue;
            try {
              const j = JSON.parse(data);
              const delta = j.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // partial JSON across chunk boundary — handled by buffering
            }
          }
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
