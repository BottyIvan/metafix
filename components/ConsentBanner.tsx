"use client";

import Link from "next/link";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { ConsentChoice } from "@/types/consent";

const CONSENT_KEY = "metafix_consent_v2";
const CONSENT_EVENT = "metafix-consent-updated";
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

function pushConsentUpdate(choice: ConsentChoice) {
  const granted = choice === "accepted";
  const w = window;

  w.dataLayer = w.dataLayer || [];

  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    });
    w.gtag("set", "ads_data_redaction", granted ? false : true);
  } else {
    w.dataLayer.push({
      event: "consent_update_fallback",
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    });
  }

  window.dispatchEvent(
    new CustomEvent(CONSENT_EVENT, {
      detail: { choice, granted },
    }),
  );
}

export function loadAdsenseScript() {
  if (!adsenseClientId) {
    return;
  }

  const existing = document.querySelector(
    'script[data-metafix="adsense"]',
  ) as HTMLScriptElement | null;

  if (existing) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.dataset.metafix = "adsense";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
  document.head.appendChild(script);
}

export function applyConsentChoice(choice: ConsentChoice) {
  window.localStorage.setItem(CONSENT_KEY, choice);
  pushConsentUpdate(choice);

  if (choice === "accepted") {
    loadAdsenseScript();
  }
}

export function ConsentBanner() {
  const consent = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener(CONSENT_EVENT, onStoreChange);
      window.addEventListener("storage", onStoreChange);

      return () => {
        window.removeEventListener(CONSENT_EVENT, onStoreChange);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    () => {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (stored === "accepted" || stored === "rejected") {
        return stored;
      }

      return "pending";
    },
    () => "pending",
  );

  useEffect(() => {
    if (consent !== "accepted" && consent !== "rejected") {
      return;
    }

    applyConsentChoice(consent);
  }, [consent]);

  const saveChoice = useCallback((choice: ConsentChoice) => {
    applyConsentChoice(choice);
  }, []);

  if (consent !== "pending") {
    return null;
  }

  return (
    <aside className="fixed inset-x-4 bottom-4 z-100 rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-104">
      <p className="text-sm font-semibold text-foreground">Cookie preferences</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        We use Google Tag Manager and ads tools only after your consent. You can
        review details in our <Link href="/legal/cookies" className="underline underline-offset-4 text-foreground">Cookie Policy</Link>.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => saveChoice("rejected")}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => saveChoice("accepted")}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Accept all
        </button>
      </div>
    </aside>
  );
}

export const consentStorageKey = CONSENT_KEY;
export const consentUpdatedEvent = CONSENT_EVENT;