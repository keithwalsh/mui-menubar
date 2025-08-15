/**
 * @fileoverview Tests for the SubmenuRenderer component
 */

import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SubmenuRenderer } from '../src/components/SubmenuRenderer'
import type { PopupState } from 'material-ui-popup-state/hooks'
import { MenuItemSubmenu } from '../src/types'

// Create a complete mock PopupState
const createMockPopupState = (overrides = {}): PopupState => ({
    isOpen: false,
    open: jest.fn(),
    close: jest.fn(),
    setOpen: jest.fn(),
    toggle: jest.fn(),
    setAnchorEl: jest.fn(),
    anchorEl: undefined,
    popupId: 'test',
    variant: 'popover',
    anchorPosition: undefined,
    setAnchorElUsed: false,
    onMouseLeave: jest.fn(),
    onBlur: jest.fn(),
    disableAutoFocus: false,
    _openEventType: undefined,
    _childPopupState: null,
    _setChildPopupState: jest.fn(),
    ...overrides
})

describe('SubmenuRenderer', () => {
    it('handles submenu item click', async () => {
        const mockOpen = jest.fn()
        const mockPopupState = createMockPopupState({ open: mockOpen })

        const mockSubmenuItem: MenuItemSubmenu = {
            kind: 'submenu',
            label: 'Test Menu',
            items: [
                { kind: 'action', label: 'Sub Item', action: jest.fn() }
            ]
        }

        render(
            <SubmenuRenderer
                item={mockSubmenuItem}
                parentPopupState={mockPopupState}
            />
        )

        const menuItem = screen.getByText('Test Menu')
        await act(async () => {
            await userEvent.hover(menuItem)
            // Simulate mouse movement to trigger hover state
            const event = new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
            })
            menuItem.dispatchEvent(event)
            // Add delay to allow for hover effect
            await new Promise(resolve => setTimeout(resolve, 200))
        })

        expect(mockOpen).toHaveBeenCalled()
    })

    it('renders submenu with icon correctly', () => {
        const mockPopupState = createMockPopupState()
        const mockIcon = <div data-testid="mock-icon" />
        const mockItem: MenuItemSubmenu = {
            kind: 'submenu',
            label: 'Test Submenu',
            icon: mockIcon,
            items: []
        }

        render(
            <SubmenuRenderer
                item={mockItem}
                parentPopupState={mockPopupState}
            />
        )

        expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })

    it('handles focus events', async () => {
        const mockPopupState = createMockPopupState()
        const mockItem: MenuItemSubmenu = {
            kind: 'submenu',
            label: 'Test Submenu',
            items: []
        }

        render(
            <SubmenuRenderer
                item={mockItem}
                parentPopupState={mockPopupState}
            />
        )

        const menuItem = screen.getByText('Test Submenu')
        await act(async () => {
            fireEvent.focus(menuItem)
            fireEvent.blur(menuItem)
        })

        // Verify the menu item remains in the document after focus/blur
        expect(menuItem).toBeInTheDocument()
    })

    it('handles disabled state', () => {
        const mockPopupState = createMockPopupState()
        const mockItem: MenuItemSubmenu = {
            kind: 'submenu',
            label: 'Test Submenu',
            items: [],
            disabled: true
        }

        render(
            <SubmenuRenderer
                item={mockItem}
                parentPopupState={mockPopupState}
            />
        )

        const menuItem = screen.getByRole('menuitem')
        expect(menuItem).toHaveClass('Mui-disabled')
        expect(menuItem).toHaveAttribute('aria-disabled', 'true')
    })

    it('handles disableRipple prop', () => {
        const mockPopupState = createMockPopupState()
        const mockItem: MenuItemSubmenu = {
            kind: 'submenu',
            label: 'Test Submenu',
            items: []
        }

        render(
            <SubmenuRenderer
                item={mockItem}
                parentPopupState={mockPopupState}
                disableRipple={true}
            />
        )

        const menuItem = screen.getByRole('menuitem')
        expect(menuItem).toHaveClass('MuiMenuItem-root')
        
        // Verify ripple is disabled by checking for TouchRipple component
        const ripple = menuItem.querySelector('.MuiTouchRipple-root')
        expect(ripple).toBeNull()
    })

    it('handles disableGutters prop', () => {
        const mockPopupState = createMockPopupState()
        const mockItem: MenuItemSubmenu = {
            kind: 'submenu',
            label: 'Test Submenu',
            items: []
        }

        render(
            <SubmenuRenderer
                item={mockItem}
                parentPopupState={mockPopupState}
                disableGutters={true}
            />
        )

        const menuItem = screen.getByRole('menuitem')
        expect(menuItem).toHaveClass('MuiMenuItem-root')

        // Verify gutters are disabled by checking computed styles
        expect(menuItem).toHaveStyle({ paddingLeft: '0px', paddingRight: '0px' })
    })
}) 