"use client";

import { useEffect, useRef, useState } from "react";

const reducedMotion = "(prefers-reduced-motion: reduce)";

/** The semantic value updates immediately; only the visual number interpolates. */
export function AnimatedAmount({
  value,
  format,
}: {
  value: number;
  format: (value: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    if (window.matchMedia(reducedMotion).matches) {
      current.current = value;
      setDisplay(value);
      return;
    }
    const from = current.current;
    const start = performance.now();
    let frame = 0;
    const update = (now: number) => {
      const progress = Math.min((now - start) / 480, 1);
      current.current = from + (value - from) * (1 - Math.pow(1 - progress, 3));
      setDisplay(current.current);
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <>
      <span aria-hidden="true">{format(display)}</span>
      <span className="sr-only">{format(value)}</span>
    </>
  );
}

/** Progressive enhancement: content is visible before JS and under reduced motion. */
export function useScrollReveals() {
  useEffect(() => {
    const preference = window.matchMedia(reducedMotion);
    let observer: IntersectionObserver | undefined;
    const elements = [
      ...document.querySelectorAll<HTMLElement>(
        ".section-heading, .feature-card, .section-intro, .calculator-card, .learn-card, .faq-section > div, .closing",
      ),
    ];
    const revealAll = () => {
      observer?.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
    const setup = () => {
      revealAll();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.remove("reveal-pending");
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.08 },
      );
      for (const element of elements) {
        element.classList.add("reveal-surface");
        if (element.getBoundingClientRect().top < window.innerHeight) continue;
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      revealAll();
      preference.removeEventListener("change", setup);
    };
  }, []);
}

export function usePreviewTilt() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--shine-x", "50%");
      element.style.setProperty("--shine-y", "50%");
    };
    const move = (event: PointerEvent) => {
      if (!preference.matches) return;
      const bounds = element.getBoundingClientRect();
      const x = Math.max(
        -0.5,
        Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5),
      );
      const y = Math.max(
        -0.5,
        Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5),
      );
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty("--tilt-x", `${-y * 12}deg`);
        element.style.setProperty("--tilt-y", `${x * 16}deg`);
        element.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
        element.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`);
      });
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    preference.addEventListener("change", reset);
    return () => {
      reset();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      preference.removeEventListener("change", reset);
    };
  }, []);
  return ref;
}
