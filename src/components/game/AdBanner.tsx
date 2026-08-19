import { useEffect, useRef, useState } from "react";

export const AD_KEY = "a53450a30b0a0ef2ea0b7aa56cb7dbeb";
export const AD_CONTAINER_ID = `container-${AD_KEY}`;
export const AD_SCRIPT_SRC = `https://pl30923982.effectivecpmnetwork.com/${AD_KEY}/invoke.js`;

/**
 * Renders the live ad banner inside an isolated iframe. The network script
 * targets a single fixed container id and caches itself, so injecting it into
 * the main document only worked once per session. Each banner now gets its own
 * document, which makes the ad render reliably on every screen (including
 * gameplay), always in the same spot.
 */
export function AdBanner({ height = 110 }: { height?: number }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const doc = el.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(
      `<!doctype html><html><head><meta charset="utf-8">` +
        `<meta name="viewport" content="width=device-width,initial-scale=1">` +
        `<style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}` +
        `body{display:flex;align-items:center;justify-content:center}</style></head>` +
        `<body><div id="${AD_CONTAINER_ID}"></div>` +
        `<script async data-cfasync="false" src="${AD_SCRIPT_SRC}?cb=${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}"><\/script></body></html>`,
    );
    doc.close();
    setReady(true);
  }, []);

  return (
    <iframe
      ref={frame}
      title="إعلان"
      scrolling="no"
      style={{ height }}
      className={`mx-auto w-full max-w-3xl border-0 bg-transparent transition-opacity ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
