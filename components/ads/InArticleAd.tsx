"use client";

import Script from "next/script";
import { useRef } from "react";

const ADSENSE_CLIENT = "ca-pub-7218285443802148";
const IN_ARTICLE_SLOT = "5021891765";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, never>>;
  }
}

export default function InArticleAd() {
  const requested = useRef(false);

  function requestAd() {
    if (requested.current) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      requested.current = true;
    } catch (error) {
      console.error("AdSense in-article ad failed to initialize", error);
    }
  }

  return (
    <aside aria-label="Advertisement" className="my-7 w-full overflow-hidden text-center">
      <Script
        id="whichaiuse-adsense"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
        onReady={() => {
          window.requestAnimationFrame(requestAd);
        }}
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={IN_ARTICLE_SLOT}
      />
    </aside>
  );
}
