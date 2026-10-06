"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollObserver
 * Automatically reveals elements with [data-reveal] attribute when scrolled into view.
 * Utilizes hardware-accelerated IntersectionObserver with smooth staggered support.
 */
export function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Brief delay to allow DOM to settle on route change
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll("[data-reveal]");

      if (!("IntersectionObserver" in window)) {
        // Fallback for browsers without IntersectionObserver
        elements.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Check if element is already within viewport
        if (rect.top <= window.innerHeight * 0.95 && rect.bottom >= 0) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
