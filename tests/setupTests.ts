/**
 * @fileoverview Global test setup and configuration for Jest DOM and suppressing warnings
 */

import '@testing-library/jest-dom'
import { expect } from '@jest/globals'

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R
            toHaveAttribute(attr: string, value?: string): R
            toHaveClass(...classNames: string[]): R
            toHaveStyle(style: Record<string, any>): R
            toHaveTextContent(text: string | RegExp): R
            toBeVisible(): R
            toBeDisabled(): R
        }
    }
}

// Extend expect interface
interface CustomMatchers<R = unknown> {
    toBeInTheDocument(): R
    toHaveAttribute(attr: string, value?: string): R
    toHaveClass(...classNames: string[]): R
    toHaveStyle(style: Record<string, any>): R
    toHaveTextContent(text: string | RegExp): R
    toBeVisible(): R
    toBeDisabled(): R
}

declare global {
    namespace jest {
        interface Expect extends CustomMatchers {}
        interface Matchers<R> extends CustomMatchers<R> {}
        interface InverseAsymmetricMatchers extends CustomMatchers {}
    }
}

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