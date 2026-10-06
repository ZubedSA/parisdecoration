"use client";

import { useEffect } from "react";

/**
 * ClientErrorHandler
 * Intercepts unhandled DOM event rejections (e.g., image loading errors or
 * websocket connection resets) to prevent Next.js development overlay
 * from displaying "[object Event]" runtime error modals.
 */
export function ClientErrorHandler() {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // If rejection reason is a raw Event object or lacking a proper error message
      if (
        event.reason instanceof Event ||
        (event.reason &&
          typeof event.reason === "object" &&
          !("message" in event.reason) &&
          !("stack" in event.reason))
      ) {
        event.preventDefault();
      }
    };

    const handleError = (event: ErrorEvent) => {
      // If error event is a generic DOM Event (from <img>, <script>, WebSocket, etc.)
      if (!event.error && (event.target instanceof HTMLElement || event instanceof Event)) {
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError, true);

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleError, true);
    };
  }, []);

  return null;
}
