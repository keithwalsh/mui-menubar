import '@testing-library/jest-dom'

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

export {} 