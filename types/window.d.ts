export {};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    dataLayer?: object[];
    gtag?: (...args: unknown[]) => void;
    Cookiebot?: {
      consent?: {
        marketing?: boolean;
      };
    };
  }
}
