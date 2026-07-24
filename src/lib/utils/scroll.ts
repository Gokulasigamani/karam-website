/**
 * Scrolls an element into view, clearing the sticky header.
 *
 * The tween is driven by `requestAnimationFrame` rather than the browser's
 * native `behavior: "smooth"`, which some platforms turn into an instant jump
 * (notably when the OS has animation effects switched off). This always
 * animates. It bails out the moment the user scrolls, taps or presses a key, so
 * it never fights them for control.
 *
 * Returns false when the target is not on this page, which lets callers fall
 * back to normal navigation.
 */

const MIN_DURATION = 450;
const MAX_DURATION = 1100;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function scrollToId(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;

  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 0) + 16;

  const start = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const end = Math.max(0, Math.min(target.getBoundingClientRect().top + start - offset, maxScroll));

  tweenTo(end);
  return true;
}

/** Same tween, back to the top of the document. */
export function scrollToTop(): void {
  tweenTo(0);
}

function tweenTo(end: number): void {
  const start = window.scrollY;
  const distance = end - start;

  if (Math.abs(distance) < 2) return;

  // Reduced motion shortens the tween rather than removing it
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = prefersReducedMotion
    ? 260
    : Math.min(MAX_DURATION, Math.max(MIN_DURATION, Math.abs(distance) * 0.55));

  let cancelled = false;
  let startTime: number | null = null;

  const cancel = () => {
    cancelled = true;
    detach();
  };

  const detach = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };

  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });
  window.addEventListener("keydown", cancel, { once: true });

  const step = (now: number) => {
    if (cancelled) return;
    if (startTime === null) startTime = now;

    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      detach();
    }
  };

  requestAnimationFrame(step);
}
