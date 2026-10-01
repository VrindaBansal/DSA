'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import type {
  AppState,
  BankSetResult,
  ChatMessage,
  LessonProgress,
  PracticeTestResult,
  Question,
  ReviewItem,
} from '../types';
import { emptyAppState, emptyLessonProgress } from '../types';
import { createRepo, type ProgressRepo } from './repo';
import { applyAnswer, enterQueue, dueItems } from '../review';
import { emptyFlashcardState, gradeCard, markDay, type CardProgress, type FlashcardState } from '../flashcards';

interface ProgressApi {
  state: AppState;
  ready: boolean;
  visitLesson: (lessonId: string) => void;
  markBlockSeen: (lessonId: string, blockId: string) => void;
  setCompleted: (lessonId: string) => void;
  recordCheck: (
    lessonId: string,
    question: Question,
    correct: boolean,
    answerText: string,
  ) => void;
  recordCodeRun: (lessonId: string, q: Question, passed: boolean) => void;
  useHint: (lessonId: string, exerciseId: string) => void;
  revealSolution: (lessonId: string, exerciseId: string) => void;
  recordComplexityCheck: (
    lessonId: string,
    question: Question,
    correct: boolean,
    answerText: string,
  ) => void;
  answerReview: (item: ReviewItem, correct: boolean) => void;
  /** Practice-bank answer: compact record + misses enter the review queue. */
  recordBankAnswer: (question: Question, correct: boolean) => void;
  recordBankSet: (setId: string, result: BankSetResult) => void;
  /** A finished full-length practice test (kept as a history per test). */
  recordPracticeTest: (result: PracticeTestResult) => void;
  /** Put questions into the review queue as misses (due tomorrow). */
  queueForReview: (items: { id: string; lessonId: string }[]) => void;
  /** Vocab flashcards: "got it" (knew) or "still learning" for one word. */
  gradeFlashcard: (word: string, knew: boolean) => void;
  /** Put a word's flashcard progress back to an earlier value (undo). */
  setFlashcard: (word: string, progress: CardProgress | undefined) => void;
  /** A finished flashcard game: match time in ms (lower is better) or speed-round score (higher is better). */
  recordFlashGame: (game: 'match' | 'speed', score: number) => void;
  appendChat: (lessonId: string, msg: ChatMessage) => void;
  clearChat: (lessonId: string) => void;
  appendGeneralChat: (msg: ChatMessage) => void;
  clearGeneralChat: () => void;
  addNote: (lessonId: string, note: string) => void;
  removeNote: (lessonId: string, index: number) => void;
  dueReview: () => ReviewItem[];
}

const Ctx = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(emptyAppState);
  const [ready, setReady] = useState(false);
  const repoRef = useRef<ProgressRepo | null>(null);

  useEffect(() => {
    repoRef.current = createRepo();
    repoRef.current.load().then((s) => {
      setState(s);
      setReady(true);
    });
  }, []);

  // Debounced whole-state save; the repo decides where it goes.
  useEffect(() => {
    if (!ready || !repoRef.current) return;
    const t = setTimeout(() => repoRef.current!.save(state), 400);
    return () => clearTimeout(t);
  }, [state, ready]);

  const updateLesson = useCallback(
    (lessonId: string, fn: (lp: LessonProgress) => LessonProgress) => {
      setState((s) => {
        const lp = s.lessons[lessonId] ?? emptyLessonProgress(lessonId);
        return { ...s, lessons: { ...s.lessons, [lessonId]: fn(lp) } };
      });
    },
    [],
  );

  const visitLesson = useCallback(
    (lessonId: string) => {
      setState((s) => {
        const lp = s.lessons[lessonId] ?? emptyLessonProgress(lessonId);
        return {
          ...s,
          lastLesson: lessonId,
          lessons: {
            ...s.lessons,
            [lessonId]: { ...lp, lastVisited: Date.now() },
          },
        };
      });
    },
    [],
  );

  const markBlockSeen = useCallback(
    (lessonId: string, blockId: string) => {
      updateLesson(lessonId, (lp) =>
        lp.blocksSeen.includes(blockId)
          ? lp
          : { ...lp, blocksSeen: [...lp.blocksSeen, blockId] },
      );
    },
    [updateLesson],
  );

  const setCompleted = useCallback(
    (lessonId: string) => {
      updateLesson(lessonId, (lp) =>
        lp.completed ? lp : { ...lp, completed: true },
      );
    },
    [updateLesson],
  );

  const recordCheck = useCallback(
    (lessonId: string, question: Question, correct: boolean, answerText: string) => {
      setState((s) => {
        const lp = s.lessons[lessonId] ?? emptyLessonProgress(lessonId);
        const next: LessonProgress = {
          ...lp,
          checks: {
            ...lp.checks,
            [question.id]: {
              questionId: question.id,
              correct,
              answer: answerText,
              at: Date.now(),
            },
          },
          lastWrong: correct
            ? lp.lastWrong
            : {
                questionId: question.id,
                prompt: question.prompt,
                myAnswer: answerText,
                at: Date.now(),
              },
        };
        return {
          ...s,
          lessons: { ...s.lessons, [lessonId]: next },
          review: applyAnswer(s.review, question.id, lessonId, correct),
        };
      });
    },
    [],
  );

  const recordCodeRun = useCallback(
    (lessonId: string, q: Question, passed: boolean) => {
      setState((s) => {
        const lp = s.lessons[lessonId] ?? emptyLessonProgress(lessonId);
        const cp = lp.code[q.id] ?? {
          attempts: 0,
          failedRuns: 0,
          hintsUsed: 0,
          passed: false,
        };
        const nextCp = {
          ...cp,
          attempts: cp.attempts + 1,
          failedRuns: cp.failedRuns + (passed ? 0 : 1),
          passed: cp.passed || passed,
          passedAt: cp.passedAt ?? (passed ? Date.now() : undefined),
        };
        let review = s.review;
        // Needed ≥2 hints → re-know the cost later, not re-type the code (§11).
        if (passed && nextCp.hintsUsed >= 2 && q.kind === 'code' && q.complexityCheck) {
          review = enterQueue(review, q.id, lessonId, true);
        }
        return {
          ...s,
          lessons: {
            ...s.lessons,
            [lessonId]: { ...lp, code: { ...lp.code, [q.id]: nextCp } },
          },
          review,
        };
      });
    },
    [],
  );

  const useHint = useCallback(
    (lessonId: string, exerciseId: string) => {
      updateLesson(lessonId, (lp) => {
        const cp = lp.code[exerciseId] ?? {
          attempts: 0,
          failedRuns: 0,
          hintsUsed: 0,
          passed: false,
        };
        return {
          ...lp,
          code: {
            ...lp.code,
            [exerciseId]: { ...cp, hintsUsed: cp.hintsUsed + 1 },
          },
        };
      });
    },
    [updateLesson],
  );

  const revealSolution = useCallback(
    (lessonId: string, exerciseId: string) => {
      updateLesson(lessonId, (lp) => {
        const cp = lp.code[exerciseId] ?? {
          attempts: 0,
          failedRuns: 0,
          hintsUsed: 0,
          passed: false,
        };
        return {
          ...lp,
          code: {
            ...lp.code,
            [exerciseId]: { ...cp, solutionRevealed: true },
          },
        };
      });
    },
    [updateLesson],
  );

  const recordComplexityCheck = useCallback(
    (lessonId: string, question: Question, correct: boolean, answerText: string) => {
      setState((s) => {
        const lp = s.lessons[lessonId] ?? emptyLessonProgress(lessonId);
        const cp = lp.code[question.id] ?? {
          attempts: 0,
          failedRuns: 0,
          hintsUsed: 0,
          passed: false,
        };
        return {
          ...s,
          lessons: {
            ...s.lessons,
            [lessonId]: {
              ...lp,
              code: {
                ...lp.code,
                [question.id]: { ...cp, complexityCorrect: correct },
              },
              lastWrong: correct
                ? lp.lastWrong
                : {
                    questionId: question.id,
                    prompt: question.prompt,
                    myAnswer: answerText,
                    at: Date.now(),
                  },
            },
          },
          review: applyAnswer(s.review, question.id, lessonId, correct, {
            asComplexityCheck: true,
          }),
        };
      });
    },
    [],
  );

  const answerReview = useCallback((item: ReviewItem, correct: boolean) => {
    setState((s) => ({
      ...s,
      review: applyAnswer(s.review, item.questionId, item.lessonId, correct, {
        asComplexityCheck: item.asComplexityCheck,
      }),
    }));
  }, []);

  const recordBankAnswer = useCallback((question: Question, correct: boolean) => {
    setState((s) => ({
      ...s,
      bank: {
        ...s.bank,
        answers: { ...s.bank.answers, [question.id]: correct ? 1 : 0 },
      },
      review: applyAnswer(s.review, question.id, question.lessonId, correct),
    }));
  }, []);

  const recordBankSet = useCallback((setId: string, result: BankSetResult) => {
    setState((s) => ({
      ...s,
      bank: { ...s.bank, sets: { ...s.bank.sets, [setId]: result } },
    }));
  }, []);

  const recordPracticeTest = useCallback((result: PracticeTestResult) => {
    setState((s) => ({
      ...s,
      tests: { ...s.tests, [result.testId]: [...(s.tests?.[result.testId] ?? []), result].slice(-10) },
    }));
  }, []);

  const queueForReview = useCallback((items: { id: string; lessonId: string }[]) => {
    setState((s) => {
      let review = s.review;
      for (const it of items) review = applyAnswer(review, it.id, it.lessonId, false);
      return { ...s, review };
    });
  }, []);

  const updateFlashcards = useCallback((fn: (fc: FlashcardState) => FlashcardState) => {
    setState((s) => ({ ...s, flashcards: fn({ ...emptyFlashcardState(), ...s.flashcards }) }));
  }, []);

  const gradeFlashcard = useCallback(
    (word: string, knew: boolean) =>
      updateFlashcards((fc) => ({
        ...fc,
        cards: { ...fc.cards, [word]: gradeCard(fc.cards[word], knew) },
        days: markDay(fc.days),
      })),
    [updateFlashcards],
  );

  const setFlashcard = useCallback(
    (word: string, progress: CardProgress | undefined) =>
      updateFlashcards((fc) => {
        const cards = { ...fc.cards };
        if (progress) cards[word] = progress;
        else delete cards[word];
        return { ...fc, cards };
      }),
    [updateFlashcards],
  );

  const recordFlashGame = useCallback(
    (game: 'match' | 'speed', score: number) =>
      updateFlashcards((fc) => ({
        ...fc,
        days: markDay(fc.days),
        ...(game === 'match'
          ? { matchBestMs: fc.matchBestMs === undefined ? score : Math.min(fc.matchBestMs, score) }
          : { speedBest: Math.max(fc.speedBest ?? 0, score) }),
      })),
    [updateFlashcards],
  );

  const appendChat = useCallback(
    (lessonId: string, msg: ChatMessage) => {
      updateLesson(lessonId, (lp) => ({ ...lp, chat: [...lp.chat, msg] }));
    },
    [updateLesson],
  );

  const clearChat = useCallback(
    (lessonId: string) => {
      updateLesson(lessonId, (lp) => ({ ...lp, chat: [] }));
    },
    [updateLesson],
  );

  const appendGeneralChat = useCallback((msg: ChatMessage) => {
    setState((s) => ({ ...s, generalChat: [...s.generalChat, msg] }));
  }, []);

  const clearGeneralChat = useCallback(() => {
    setState((s) => ({ ...s, generalChat: [] }));
  }, []);

  const addNote = useCallback(
    (lessonId: string, note: string) => {
      updateLesson(lessonId, (lp) => ({ ...lp, notes: [...lp.notes, note] }));
    },
    [updateLesson],
  );

  const removeNote = useCallback(
    (lessonId: string, index: number) => {
      updateLesson(lessonId, (lp) => ({
        ...lp,
        notes: lp.notes.filter((_, i) => i !== index),
      }));
    },
    [updateLesson],
  );

  const dueReview = useCallback(() => dueItems(state.review), [state.review]);

  const api = useMemo<ProgressApi>(
    () => ({
      state,
      ready,
      visitLesson,
      markBlockSeen,
      setCompleted,
      recordCheck,
      recordCodeRun,
      useHint,
      revealSolution,
      recordComplexityCheck,
      answerReview,
      recordBankAnswer,
      recordBankSet,
      recordPracticeTest,
      queueForReview,
      gradeFlashcard,
      setFlashcard,
      recordFlashGame,
      appendChat,
      clearChat,
      appendGeneralChat,
      clearGeneralChat,
      addNote,
      removeNote,
      dueReview,
    }),
    [
      state,
      ready,
      visitLesson,
      markBlockSeen,
      setCompleted,
      recordCheck,
      recordCodeRun,
      useHint,
      revealSolution,
      recordComplexityCheck,
      answerReview,
      recordBankAnswer,
      recordBankSet,
      recordPracticeTest,
      queueForReview,
      gradeFlashcard,
      setFlashcard,
      recordFlashGame,
      appendChat,
      clearChat,
      appendGeneralChat,
      clearGeneralChat,
      addNote,
      removeNote,
      dueReview,
    ],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>');
  return ctx;
}

export function useLessonProgress(lessonId: string): LessonProgress {
  const { state } = useProgress();
  return state.lessons[lessonId] ?? emptyLessonProgress(lessonId);
}
