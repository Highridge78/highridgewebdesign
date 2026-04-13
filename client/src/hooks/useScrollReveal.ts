import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface ObserverCacheEntry {
  observer: IntersectionObserver;
  callbacks: Map<Element, (entry: IntersectionObserverEntry) => void>;
  elements: Set<Element>;
}

const observerCache = new Map<string, ObserverCacheEntry>();

function toObserverKey(threshold: number | number[], rootMargin: string) {
  const thresholdKey = Array.isArray(threshold)
    ? threshold.join(",")
    : String(threshold);
  return `${rootMargin}|${thresholdKey}`;
}

function getObserverEntry(
  threshold: number | number[],
  rootMargin: string
): ObserverCacheEntry {
  const key = toObserverKey(threshold, rootMargin);
  const cached = observerCache.get(key);
  if (cached) {
    return cached;
  }

  const callbacks = new Map<Element, (entry: IntersectionObserverEntry) => void>();
  const elements = new Set<Element>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        callbacks.get(entry.target)?.(entry);
      }
    },
    { threshold, rootMargin }
  );

  const created: ObserverCacheEntry = { observer, callbacks, elements };
  observerCache.set(key, created);
  return created;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const entry = getObserverEntry(threshold, rootMargin);
    let active = true;

    const stopObserving = () => {
      if (!active) return;
      active = false;
      entry.observer.unobserve(el);
      entry.callbacks.delete(el);
      entry.elements.delete(el);

      if (entry.elements.size === 0) {
        const key = toObserverKey(threshold, rootMargin);
        entry.observer.disconnect();
        observerCache.delete(key);
      }
    };

    entry.callbacks.set(el, (intersectionEntry) => {
      if (intersectionEntry.isIntersecting) {
        setIsVisible(true);
        if (once) {
          stopObserving();
        }
      } else if (!once) {
        setIsVisible(false);
      }
    });
    entry.elements.add(el);
    entry.observer.observe(el);

    return stopObserving;
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
