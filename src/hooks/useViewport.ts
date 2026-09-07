import { useEffect, useRef } from "react";

export function useViewport() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const sync = () => {
      const element = ref.current;
      if (!element || viewport.scale !== 1) return;
      // Follow the visible area when a phone keyboard covers the layout viewport.
      element.style.setProperty("--viewport-height", `${viewport.height}px`);
      element.style.setProperty("--viewport-top", `${viewport.offsetTop}px`);
      element.dataset.keyboardOpen = String(window.innerHeight - viewport.height > 150);
    };

    sync();
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
    };
  }, []);

  return ref;
}
