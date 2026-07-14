'use client';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print rounded border-[1.5px] border-ink bg-panel px-3.5 py-1.5 font-mono text-[11.5px] hover:bg-active-wash"
    >
      ⎙ print
    </button>
  );
}
