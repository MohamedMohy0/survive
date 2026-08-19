import { useEffect, useRef, useState } from "react";

export const AD_KEY = "a53450a30b0a0ef2ea0b7aa56cb7dbeb";
export const AD_CONTAINER_ID = `container-${AD_KEY}`;
export const AD_SCRIPT_SRC = `https://pl30923982.effectivecpmnetwork.com/${AD_KEY}/invoke.js`;

let bannerClaimed = false;

/**
 * Renders the live ad network banner. Only the first mounted instance on the
 * page claims the (single) container id required by the network script.
 */
export function AdBanner() {
  const [claimed, setClaimed] = useState(false);
  const owns = useRef(false);

  useEffect(() => {
    if (bannerClaimed && !owns.current) return;
    bannerClaimed = true;
    owns.current = true;
    setClaimed(true);

    if (!document.querySelector(`script[src="${AD_SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = AD_SCRIPT_SRC;
      script.setAttribute("data-cfasync", "false");
      document.body.appendChild(script);
    }

    return () => {
      bannerClaimed = false;
      owns.current = false;
    };
  }, []);

  if (!claimed) return null;
  return <div id={AD_CONTAINER_ID} className="mx-auto w-full" />;
}
