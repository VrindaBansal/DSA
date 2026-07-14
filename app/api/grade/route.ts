import { NextResponse } from 'next/server';
import { OPENAI_MODEL, OPENAI_API_URL } from '@/lib/config';
import { rateLimited } from '@/lib/rate-guard';
import type { GradeResult } from '@/lib/types';

// Short-response grading (spec §5.2, Phase 5): strict JSON out, graded
// against the rubric ONLY — the model must not invent extra criteria.

export const runtime = 'nodejs';

const SCHEMA = {
  name: 'grade',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      verdict: { type: 'string', enum: ['correct', 'partial', 'incorrect'] },
      hitRubricPoints: { type: 'array', items: { type: 'string' } },
      missed: { type: 'array', items: { type: 'string' } },
      feedback: { type: 'string' },
    },
    required: ['verdict', 'hitRubricPoints', 'missed', 'feedback'],
  },
} as const;

export async function POST(req: Request) {
  if (rateLimited()) {
    return NextResponse.json(
      { error: 'Rate limit: >20 requests/minute.' },
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

  const { prompt, rubric, answer } = (await req.json()) as {
    prompt: string;
    rubric: string[];
    answer: string;
  };
  if (!prompt || !Array.isArray(rubric) || !answer?.trim()) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const system = `You grade short answers for a CS learner drilling data structures for interviews. Grade STRICTLY against the rubric points given — and ONLY those points. Do not invent extra criteria, do not penalize style, brevity, or informal tone. Strict but not pedantic: the learner wants to know when she is hand-waving.

For each rubric point decide: did the answer substantively hit it (paraphrase counts, buzzword-drop without substance does not)?
- verdict "correct": all rubric points hit.
- verdict "partial": at least one hit, at least one missed.
- verdict "incorrect": no rubric point substantively hit, or the answer contains a fundamental misconception.
- hitRubricPoints / missed: copy the rubric points verbatim into the right bucket.
- feedback: 1-3 blunt, specific sentences. Name what was dodged or hand-waved. No praise padding, no "great job". If a misconception appears, name it explicitly.`;

  const user = `QUESTION: ${prompt}

RUBRIC (the only grading criteria):
${rubric.map((r, i) => `${i + 1}. ${r}`).join('\n')}

HER ANSWER:
${answer}`;

  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0,
      response_format: { type: 'json_schema', json_schema: SCHEMA },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return NextResponse.json(
      { error: `OpenAI error ${res.status}: ${text.slice(0, 300)}` },
      { status: 502 },
    );
  }

  const data = await res.json();
  try {
    const graded = JSON.parse(
      data.choices[0].message.content,
    ) as GradeResult;
    return NextResponse.json(graded);
  } catch {
    return NextResponse.json(
      { error: 'model returned non-JSON grade' },
      { status: 502 },
    );
  }
}
