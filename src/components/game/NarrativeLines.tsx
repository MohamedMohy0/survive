import { useEffect, useRef, useState } from "react";

interface Props {
  lines: string[];
  nodeId: string;
  motion: boolean;
  onComplete?: () => void;
}

/** Reveals cinematic lines one at a time. Tapping reveals everything at once. */
export function NarrativeLines({ lines, nodeId, motion, onComplete }: Props) {
  const [shown, setShown] = useState(motion ? 1 : lines.length);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setShown(motion ? 1 : lines.length);
  }, [nodeId, motion, lines.length]);

  useEffect(() => {
    if (shown >= lines.length) {
      onComplete?.();
      return;
    }
    timer.current = setTimeout(() => setShown((n) => n + 1), 1150);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [shown, lines.length, onComplete]);

  return (
    <div
      className="space-y-4 text-pretty"
      onClick={() => setShown(lines.length)}
      role="presentation"
    >
      {lines.slice(0, shown).map((line, i) => (
        <p
          key={`${nodeId}-${i}`}
          className="animate-line-in text-[1.05rem] leading-[2] text-foreground/95 sm:text-lg md:text-xl md:leading-[2.1]"
        >
          {line}
        </p>
      ))}
      {shown < lines.length && (
        <p className="text-xs text-muted-foreground">اضغط للمتابعة…</p>
      )}
    </div>
  );
}
