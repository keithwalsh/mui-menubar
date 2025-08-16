/**
 * @fileoverview Global test setup and configuration for Jest DOM and suppressing warnings
 */

import '@testing-library/jest-dom'

// Mock react-hotkeys-hook with a functional keybinding for tests
jest.mock('react-hotkeys-hook', () => {
    function parseShortcut(shortcut: string) {
        const parts = shortcut.toLowerCase().split('+').map(p => p.trim());
        const key = parts[parts.length - 1];
        const modifiers = new Set(parts.slice(0, -1));
        return { key, modifiers };
    }

    function matches(event: KeyboardEvent, shortcut: string) {
        const { key, modifiers } = parseShortcut(shortcut);
        const keyMatch = (event.key || '').toLowerCase() === key;
        const ctrlMatch = modifiers.has('ctrl') ? !!event.ctrlKey : !event.ctrlKey;
        const metaMatch = modifiers.has('meta') ? !!event.metaKey : !event.metaKey;
        const altMatch = modifiers.has('alt') ? !!event.altKey : !event.altKey;
        const shiftMatch = modifiers.has('shift') ? !!event.shiftKey : !event.shiftKey;
        return keyMatch && ctrlMatch && metaMatch && altMatch && shiftMatch;
    }

    function useHotkeys(shortcut: string, handler: (e: KeyboardEvent) => void) {
        const listener = (e: KeyboardEvent) => {
            if (matches(e, shortcut)) {
                handler(e);
                if (typeof (e as any).preventDefault === 'function') {
                    (e as any).preventDefault();
                }
            }
        };
        document.addEventListener('keydown', listener);
    }

    return { useHotkeys };
});

// Store original console methods
const originalConsole = {
    error: console.error,
    warn: console.warn
}

beforeAll(() => {
    // Override both console.error and console.warn
    const createSuppressedLogger = (originalFn: typeof console.error) => {
        return (...args: any[]) => {
            const msg = args[0]
            if (typeof msg !== 'string') {
                originalFn.apply(console, args)
                return
            }

            const suppressPatterns = [
                /non-boolean attribute `dense`/i,
                /anchorEl.*invalid/i,
                /not wrapped in act/i,
                /unique "key" prop/i,
                /\[material-ui-popup-state\]/i,
                /eventOrAnchorEl should be defined/i,
                /React does not recognize the `MenuProps` prop/i
            ]

            if (suppressPatterns.some(pattern => pattern.test(msg))) {
                return
            }

            originalFn.apply(console, args)
        }
    }

    console.error = createSuppressedLogger(originalConsole.error)
    console.warn = createSuppressedLogger(originalConsole.warn)
})

afterAll(() => {
    // Restore original console methods
    console.error = originalConsole.error
    console.warn = originalConsole.warn
})

// Clean up menus after each test
afterEach(() => {
    const menus = document.querySelectorAll('[role="menu"]')
    menus.forEach(menu => menu.remove())
}) 