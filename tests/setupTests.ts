/**
 * @fileoverview Global test setup and configuration for Jest DOM and suppressing warnings
 */

import '@testing-library/jest-dom'

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