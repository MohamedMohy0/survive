import { adsConfig, isAdEnabled, type AdPlacement } from "@/game/ads";
import { AdBanner } from "./AdBanner";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
  /** Compact banner used on gameplay and transition screens. */
  compact?: boolean;
}

/**
 * Reserved advertising area. Present on every screen, but always outside the
 * decision area so it never interrupts a choice.
 */
export function AdSlot({ placement, className = "", compact = false }: AdSlotProps) {
  if (!isAdEnabled(placement)) return null;
  const slot = adsConfig.slots[placement];

  if (compact) {
    return (
      <aside
        aria-label="مساحة إعلانية"
        data-ad-slot={slot.id}
        className={`mx-auto flex w-full max-w-3xl items-center justify-center gap-3 rounded-md border border-dashed border-border/60 bg-secondary/25 px-4 py-2.5 text-center ${className}`}
      >
        <span className="text-[0.6rem] tracking-[0.3em] text-muted-foreground">ADVERTISEMENT</span>
        <span className="text-[0.7rem] text-muted-foreground/70">{slot.label}</span>
      </aside>
    );
  }

  return (
    <aside
      aria-label="مساحة إعلانية"
      data-ad-slot={slot.id}
      className={`mx-auto w-full max-w-3xl rounded-lg border border-dashed border-border/70 bg-secondary/30 px-4 py-6 text-center safe-bottom ${className}`}
    >
      <p className="text-xs tracking-[0.35em] text-muted-foreground">ADVERTISEMENT</p>
      <p className="mt-1.5 text-sm text-muted-foreground/70">{slot.label}</p>
    </aside>
  );
}
