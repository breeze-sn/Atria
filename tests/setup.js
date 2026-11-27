import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom does not implement matchMedia. GSAP's matchMedia and ScrollTrigger
// register media-query listeners at import time, so provide a browser-shaped
// stub for tests while keeping the real browser implementation untouched.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => {
    const listeners = new Set();

    const mediaQueryList = {
      matches: false,
      media: query,
      onchange: null,
      addListener(listener) {
        if (listener) listeners.add(listener);
      },
      removeListener(listener) {
        listeners.delete(listener);
      },
      addEventListener(type, listener) {
        if (type === 'change' && listener) listeners.add(listener);
      },
      removeEventListener(type, listener) {
        if (type === 'change') listeners.delete(listener);
      },
      dispatchEvent(event) {
        listeners.forEach((listener) => listener.call(mediaQueryList, event));
        mediaQueryList.onchange?.call(mediaQueryList, event);
        return true;
      },
    };

    return mediaQueryList;
  };
}

afterEach(() => {
  cleanup();
});
