import { adsConfig, isAdEnabled, type AdPlacement } from "@/game/ads";
import { AdBanner } from "./AdBanner";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
  /** Compact banner used on gameplay and transition screens. */
  compact?: boolean;
}

/**
 * Live advertising area. Present on every screen, but always outside the
 * decision area so it never interrupts a choice.
 */
export function AdSlot({ placement, className = "", compact = false }: AdSlotProps) {
  if (!isAdEnabled(placement)) return null;
  const slot = adsConfig.slots[placement];

  return (
    <aside
      aria-label="مساحة إعلانية"
      data-ad-slot={slot.id}
      className={`mx-auto flex w-full max-w-3xl items-center justify-center ${
        compact ? "py-1" : "py-2"
      } ${className}`}
    >
      <AdBanner height={compact ? 90 : 110} />
    </aside>
  );
}
