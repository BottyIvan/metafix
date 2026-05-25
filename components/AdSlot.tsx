"use client";

import { useEffect, useRef, useState } from "react";
import {
  consentStorageKey,
  consentUpdatedEvent,
} from "@/components/ConsentBanner";
import type { AdSlotProps } from "@/types/ads";

const trackingEnabled = process.env.NEXT_PUBLIC_ENABLE_TRACKING === "true";
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export function AdSlot({ adName, slot, className }: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const readConsent = () => {
      const saved = window.localStorage.getItem(consentStorageKey);
      setHasConsent(saved === "accepted");
    };

    const onConsentUpdated = () => readConsent();

    readConsent();
    window.addEventListener(consentUpdatedEvent, onConsentUpdated);

    return () => {
      window.removeEventListener(consentUpdatedEvent, onConsentUpdated);
    };
  }, []);

  useEffect(() => {
    if (!trackingEnabled || !adsenseClientId || !slot || !hasConsent) {
      return;
    }

    const el = adRef.current;
    if (!el || el.dataset.loaded === "true") {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      el.dataset.loaded = "true";
    } catch {
      // Avoid breaking rendering if ad blockers prevent script execution.
    }
  }, [hasConsent, slot]);

  const containerClass = className
    ? `my-8 rounded-xl border border-border bg-surface/50 p-4 ${className}`
    : "my-8 rounded-xl border border-border bg-surface/50 p-4";

  if (!trackingEnabled || !adsenseClientId || !slot || !hasConsent) {
    return (
      <aside
        aria-label="Advertisement"
        data-ad-slot-name={adName}
        className={containerClass}
      >
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Advertisement
        </p>
        <div className="flex min-h-45 items-center justify-center rounded-lg border border-dashed border-border px-3 text-center text-sm text-muted">
          Slot &quot;{adName}&quot; is ready. Ads activate only after consent,
          with tracking enabled and Ads IDs configured.
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      data-ad-slot-name={adName}
      className={containerClass}
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        Advertisement
      </p>
      <ins
        ref={adRef}
        className="adsbygoogle block min-h-45 w-full"
        style={{ display: "block" }}
        data-ad-client={adsenseClientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}