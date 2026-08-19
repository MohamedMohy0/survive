import { useEffect, useState } from "react";
import { AdSlot } from "@/components/game/AdSlot";

export function LoadingScreen({
  line,
  title,
  onDone,
}: {
  line: string;
  title: string;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const a = setTimeout(() => setPhase(1), 1200);
    const b = setTimeout(onDone, 3400);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [onDone]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-7 px-6 text-center">
      <p className="animate-line-in text-base tracking-[0.3em] text-muted-foreground sm:text-lg">
        {line}
      </p>
      {phase > 0 && (
        <h1 className="title-display animate-line-in text-5xl text-primary sm:text-6xl">{title}</h1>
      )}
      <div className="h-px w-48 overflow-hidden bg-border">
        <div className="h-full w-full origin-right animate-[line-in_2.4s_linear] bg-primary" />
      </div>

      <AdSlot placement="transition" className="mt-6" />
    </div>
  );
}
