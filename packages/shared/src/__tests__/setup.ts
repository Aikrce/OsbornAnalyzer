/**
 * Vitest setup file for @osborn/shared package
 * This file is executed before all tests
 */

// import { beforeEach, afterEach, vi } from "vitest";

// Mock console methods to reduce noise during testing
const originalConsole = { ...console };

// beforeEach(() => {
//   // Mock console.warn and console.error to avoid noise in test output
//   vi.spyOn(console, "warn").mockImplementation(() => {});
//   vi.spyOn(console, "error").mockImplementation(() => {});
// });

// afterEach(() => {
//   // Restore console methods
//   console.warn = originalConsole.warn;
//   console.error = originalConsole.error;
  
//   // Clear all mocks
//   vi.clearAllMocks();
// });

// Mock DOM APIs if needed
// Object.defineProperty(window, "matchMedia", {
//   writable: true,
//   value: vi.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: vi.fn(),
//     removeListener: vi.fn(),
//     addEventListener: vi.fn(),
//     removeEventListener: vi.fn(),
//     dispatchEvent: vi.fn(),
//   })),
// });

// Mock localStorage
// Object.defineProperty(window, "localStorage", {
//   value: {
//     getItem: vi.fn(() => null),
//     setItem: vi.fn(() => null),
//     removeItem: vi.fn(() => null),
//     clear: vi.fn(() => null),
//   },
//   writable: true,
// });

export {};
