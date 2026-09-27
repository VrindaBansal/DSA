'use client';

import React from 'react';
import type { CardQuestion } from '@/lib/types';
import { McqCard } from './McqCard';
import { ShortCard } from './ShortCard';
import { MultiCard } from './MultiCard';
import { NumericCard } from './NumericCard';
import { BlanksCard } from './BlanksCard';

/**
 * One entry point for every question kind that is answered in a card
 * (everything but code exercises). Short answers count as correct only on a
 * full "correct" verdict — partial does not count as knowing it (spec §5.2).
 */
export function QuestionCard({
  q,
  onAnswered,
  priorAnswer,
  hideFeedback,
}: {
  q: CardQuestion;
  onAnswered?: (correct: boolean, answerText: string) => void;
  /** MCQ only: re-show a previously chosen option. */
  priorAnswer?: string;
  /** Timed sections: record the answer but reveal nothing until the end. */
  hideFeedback?: boolean;
}) {
  switch (q.kind) {
    case 'mcq':
      return <McqCard q={q} onAnswered={onAnswered} priorAnswer={priorAnswer} hideFeedback={hideFeedback} />;
    case 'short':
      return (
        <ShortCard
          q={q}
          onGraded={(verdict, answer) => onAnswered?.(verdict === 'correct', answer)}
        />
      );
    case 'multi':
      return <MultiCard q={q} onAnswered={onAnswered} hideFeedback={hideFeedback} />;
    case 'numeric':
      return <NumericCard q={q} onAnswered={onAnswered} hideFeedback={hideFeedback} />;
    case 'blanks':
      return <BlanksCard q={q} onAnswered={onAnswered} hideFeedback={hideFeedback} />;
  }
}
