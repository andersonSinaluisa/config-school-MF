import '@testing-library/jest-dom';

// If components use matchMedia or other browser APIs, provide safe defaults.
if (typeof window !== 'undefined' && !('matchMedia' in window)) {
  // @ts-expect-error - defining minimal mock for tests
  window.matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
}

