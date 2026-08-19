import { useEffect, useRef } from "react";

export const AD_KEY = "a53450a30b0a0ef2ea0b7aa56cb7dbeb";
export const AD_CONTAINER_ID = `container-${AD_KEY}`;
export const AD_SCRIPT_SRC = `https://pl30923982.effectivecpmnetwork.com/${AD_KEY}/invoke.js`;

/**
 * Renders the live ad banner. The network script targets a single container id,
 * so on every mount we re-create the container and re-inject the script, which
 * makes the ad render on every screen (including during gameplay).
 */
export function AdBanner() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    // Only one element on the page may hold the container id.
    document
      .querySelectorAll(`#${AD_CONTAINER_ID}`)
      .forEach((n) => n.removeAttribute("id"));
    el.id = AD_CONTAINER_ID;
    el.innerHTML = "";

    document
      .querySelectorAll(`script[src="${AD_SCRIPT_SRC}"]`)
      .forEach((n) => n.remove());

    const script = document.createElement("script");
    script.async = true;
    script.src = AD_SCRIPT_SRC;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);

    return () => {
      el.removeAttribute("id");
      script.remove();
    };
  }, []);

  return <div ref={host} className="mx-auto w-full" />;
}
