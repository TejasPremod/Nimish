import { useEffect } from "react";

/**
 * Custom hook to lock body scroll when an overlay (modal, sidebar, menu) is active.
 * Uses a data attribute on document.body to support multiple nested overlays.
 */
export const useBodyScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (!lock) return;

    const currentLocks = parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10);
    const newLocks = currentLocks + 1;
    document.body.setAttribute("data-scroll-locks", newLocks.toString());

    if (newLocks === 1) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      const currentLocks = parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10);
      const newLocks = Math.max(0, currentLocks - 1);
      if (newLocks === 0) {
        document.body.removeAttribute("data-scroll-locks");
        document.body.style.overflow = "";
      } else {
        document.body.setAttribute("data-scroll-locks", newLocks.toString());
      }
    };
  }, [lock]);
};
