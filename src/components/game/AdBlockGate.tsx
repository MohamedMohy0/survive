import { useCallback, useEffect, useState, type ReactNode } from "react";

import { AD_SCRIPT_SRC } from "./AdBanner";

type Status = "checking" | "clear" | "blocked";

async function detectAdBlock(): Promise<boolean> {
  // 1) Bait element that ad blockers hide by cosmetic filtering.
  const bait = document.createElement("div");
  bait.className = "adsbox ad-banner ads ad-placement pub_300x250";
  bait.style.cssText =
    "position:absolute;left:-9999px;top:-9999px;width:10px;height:10px;pointer-events:none;";
  document.body.appendChild(bait);
  await new Promise((r) => setTimeout(r, 120));
  const hidden =
    bait.offsetParent === null ||
    bait.offsetHeight === 0 ||
    bait.clientHeight === 0 ||
    getComputedStyle(bait).display === "none" ||
    getComputedStyle(bait).visibility === "hidden";
  bait.remove();
  if (hidden) return true;

  // 2) Network request to the ad script itself.
  try {
    await fetch(AD_SCRIPT_SRC, { method: "HEAD", mode: "no-cors", cache: "no-store" });
    return false;
  } catch {
    return true;
  }
}

/**
 * Blocks the game until the visitor disables their ad blocker.
 */
export function AdBlockGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("checking");

  const run = useCallback(() => {
    setStatus("checking");
    detectAdBlock()
      .then((blocked) => setStatus(blocked ? "blocked" : "clear"))
      .catch(() => setStatus("clear"));
  }, []);

  useEffect(() => {
    run();
  }, [run]);

  if (status === "blocked") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 text-center">
        <div className="max-w-md rounded-xl border border-border/70 bg-secondary/30 p-7">
          <p className="text-xs tracking-[0.35em] text-muted-foreground">SURVIVE</p>
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            مانع الإعلانات مُفعّل
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            هذه اللعبة مجانية بفضل الإعلانات. من فضلك أوقف مانع الإعلانات
            (Ad Blocker) لهذا الموقع ثم أعد المحاولة لتتمكن من اللعب.
          </p>
          <button
            onClick={run}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            لقد أوقفته — أعد التحقق
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
