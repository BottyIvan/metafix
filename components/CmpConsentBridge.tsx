"use client";

import { useEffect } from "react";
import { applyConsentChoice } from "@/components/ConsentBanner";
import type { CmpConsentBridgeProps } from "@/types/cmp";

export function CmpConsentBridge({ provider }: CmpConsentBridgeProps) {
  useEffect(() => {
    if (provider !== "cookiebot") {
      return;
    }

    const w = window;

    const syncFromCookiebot = () => {
      const marketingGranted = Boolean(w.Cookiebot?.consent?.marketing);
      applyConsentChoice(marketingGranted ? "accepted" : "rejected");
    };

    const cookiebotEvents = [
      "CookiebotOnConsentReady",
      "CookiebotOnAccept",
      "CookiebotOnDecline",
    ] as const;

    cookiebotEvents.forEach((eventName) => {
      window.addEventListener(eventName, syncFromCookiebot);
    });

    let attempts = 0;
    const id = window.setInterval(() => {
      attempts += 1;

      if (w.Cookiebot?.consent || attempts > 20) {
        syncFromCookiebot();
        window.clearInterval(id);
      }
    }, 300);

    return () => {
      cookiebotEvents.forEach((eventName) => {
        window.removeEventListener(eventName, syncFromCookiebot);
      });
      window.clearInterval(id);
    };
  }, [provider]);

  return null;
}