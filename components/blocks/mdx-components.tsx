import React from 'react';
import {
  Concept,
  Intuition,
  RealWorld,
  Gotcha,
  Aside,
  LeetCode,
} from './static';
import { CodeWalk, type WalkLine } from './CodeWalk';
import { CheckBlock } from './Check';
import { TradeoffTableBlock } from './TradeoffTable';
import { CheatsheetBlock } from './Cheatsheet';
import { VisualBlock } from './VisualBlock';
import { ExerciseBlock } from './Exercise';
import { ProblemSetBlock } from './ProblemSet';

const flat = (c: React.ReactNode): string =>
  React.Children.toArray(c)
    .map((x) => (typeof x === 'string' || typeof x === 'number' ? String(x) : ''))
    .join('');

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * The authoring primitives (spec §5.1), bound to a lesson. Blocks get stable
 * document-order ids (rendered server-side in tree order) so scroll tracking
 * and tutor context can name where I am.
 */
export function makeMdxComponents(lessonId: string) {
  let n = 0;
  const bid = (kind: string, label?: string) =>
    `${String(++n).padStart(2, '0')}:${kind}${label ? `:${label}` : ''}`;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return {
    Concept: ({ children }: any) => (
      <Concept lessonId={lessonId} blockId={bid('concept')}>
        {children}
      </Concept>
    ),
    Intuition: ({ children }: any) => (
      <Intuition lessonId={lessonId} blockId={bid('intuition')}>
        {children}
      </Intuition>
    ),
    RealWorld: ({ source, children }: any) => (
      <RealWorld
        lessonId={lessonId}
        blockId={bid('realworld', source)}
        source={source}
      >
        {children}
      </RealWorld>
    ),
    Gotcha: ({ children }: any) => (
      <Gotcha lessonId={lessonId} blockId={bid('gotcha')}>
        {children}
      </Gotcha>
    ),
    Aside: ({ title, children }: any) => (
      <Aside lessonId={lessonId} blockId={bid('aside', title)} title={title}>
        {children}
      </Aside>
    ),
    Visual: ({ id }: any) => (
      <VisualBlock lessonId={lessonId} blockId={bid('visual', id)} id={id} />
    ),
    Check: ({ id }: any) => (
      <CheckBlock lessonId={lessonId} blockId={bid('check', id)} id={id} />
    ),
    CodeWalk: ({ title, lines }: { title?: string; lines: WalkLine[] }) => (
      <CodeWalk
        lessonId={lessonId}
        blockId={bid('codewalk', title)}
        title={title}
        lines={lines}
      />
    ),
    TradeoffTable: ({ id }: any) => (
      <TradeoffTableBlock
        lessonId={lessonId}
        blockId={bid('tradeoffs', id)}
        id={id}
      />
    ),
    Cheatsheet: ({ children }: any) => (
      <CheatsheetBlock lessonId={lessonId} blockId={bid('cheatsheet')}>
        {children}
      </CheatsheetBlock>
    ),
    Exercise: ({ id }: any) => (
      <ExerciseBlock lessonId={lessonId} blockId={bid('exercise', id)} id={id} />
    ),
    ProblemSet: ({ id }: any) => (
      <ProblemSetBlock
        lessonId={lessonId}
        blockId={bid('problemset', id)}
        id={id}
      />
    ),
    LeetCode,

    // prose element overrides
    h2: ({ children }: any) => (
      <h2 id={slugify(flat(children))}>
        <span className="anchor-hash">#</span>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 id={slugify(flat(children))}>
        <span className="anchor-hash">##</span>
        {children}
      </h3>
    ),
    table: (p: any) => (
      <div className="overflow-x-auto">
        <table {...p} />
      </div>
    ),
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
