"use client";

import { useEffect, useState } from "react";

const cookieNoticeStorageKey = "prompt-library-cookie-notice";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(cookieNoticeStorageKey) !== "accepted");
  }, []);

  function acceptCookies() {
    window.localStorage.setItem(cookieNoticeStorageKey, "accepted");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="cookie-banner" aria-label="Cookie notice">
      <p>We use essential cookies and local storage to keep the site working.</p>
      <button type="button" onClick={acceptCookies}>
        OK
      </button>
    </aside>
  );
}
