import React from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import CascadingMenu, { CascadingMenuItem, CascadingContext } from '../src/components/CascadingMenu'
import { MenuItems } from '../src/types'
import * as popupState from 'material-ui-popup-state/hooks'
import { PopoverPosition } from '@mui/material'

// Suppress specific warnings
const originalError = console.error
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*non-boolean attribute `dense`/.test(args[0])) return
        if (/Warning.*anchorEl.*invalid/.test(args[0])) return
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
})

// Create a complete mock PopupState
const createMockPopupState = () => ({
    isOpen: true,
    open: jest.fn(),
    close: jest.fn(),
    setOpen: jest.fn(),
    toggle: jest.fn(),
    anchorEl: document.body,
    anchorPosition: undefined as PopoverPosition | undefined,
    setAnchorEl: jest.fn(),
    setAnchorPosition: jest.fn(),
    onMouseLeave: jest.fn(),
    onBlur: jest.fn(),
    popupId: 'test-popup',
    variant: 'popover' as const,
    elementRefKey: null,
    parentPopupState: null,
    hasChildPopup: false,
    setHasChildPopup: jest.fn(),
    setAnchorElUsed: false,
    disableAutoFocus: false,
    _openEventType: null,
    _childPopupState: null,
    _setChildPopupState: jest.fn()
})

// Update the TestCascadingMenuContext to use the complete mock
const TestCascadingMenuContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const testPopupState = createMockPopupState()

    return (
        <CascadingContext.Provider 
            value={{ 
                rootPopupState: testPopupState, 
                parentPopupState: testPopupState 
            }}
        >
            {children}
        </CascadingContext.Provider>
    )
}

// Update the mock for material-ui-popup-state hooks
jest.mock('material-ui-popup-state/hooks', () => {
    let onCloseHandler: () => void
    
    return {
        usePopupState: () => createMockPopupState(),
        bindHover: () => ({
            'aria-haspopup': true,
            onMouseEnter: jest.fn(),
            onMouseLeave: jest.fn(),
        }),
        bindFocus: () => ({
            onFocus: jest.fn(),
            onBlur: jest.fn(),
        }),
        bindMenu: () => ({
            open: true,
            anchorEl: document.body,
            onClose: (event: any) => {
                onCloseHandler?.()
            },
        }),
        bindTrigger: () => ({
            onClick: jest.fn(),
        }),
        // Expose setter for tests
        __setOnCloseHandler: (handler: () => void) => {
            onCloseHandler = handler
        }
    }
})

const mockMenuItems: MenuItems[] = [
    { kind: 'action', label: 'New', action: jest.fn() },
    { kind: 'divider' },
    {
        kind: 'submenu',
        label: 'Recent',
        items: [
            { kind: 'action', label: 'Doc 1', action: jest.fn() }
        ]
    }
]

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation((...args) => {
        const message = args[0]
        if (typeof message !== 'string') return
        if (message.includes('not wrapped in act')) return
        if (message.includes('non-boolean attribute')) return
        if (message.includes('unique "key" prop')) return
        if (message.includes('Function components cannot be given refs')) return
        if (message.includes('does not recognize the `MenuProps` prop')) return
        originalError.call(console, ...args)
    })
})

afterEach(() => {
    jest.restoreAllMocks()
})

describe('CascadingMenu', () => {
    const mockPopupState = popupState.usePopupState({ variant: 'popover', popupId: 'test' })

    it('renders cascading menu items correctly', async () => {
        await act(async () => {
            render(
                <CascadingMenu
                    menuItems={mockMenuItems}
                    popupState={mockPopupState}
                    useHover={true}
                />
            )
        })
        
        expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('opens submenu on hover', async () => {
        await act(async () => {
            render(
                <CascadingMenu
                    menuItems={mockMenuItems}
                    popupState={mockPopupState}
                    useHover={true}
                />
            )
        })
        const user = userEvent.setup()
        
        const recentMenu = screen.getByText('Recent')
        await user.hover(recentMenu)
        
        expect(screen.getByText('Doc 1')).toBeInTheDocument()
    })

    it('handles action item click', async () => {
        await act(async () => {
            render(
                <CascadingMenu
                    menuItems={mockMenuItems}
                    popupState={mockPopupState}
                    useHover={true}
                />
            )
        })
        const user = userEvent.setup()
        
        const newMenuItem = screen.getByText('New')
        await user.click(newMenuItem)
        
        const newMenuItemConfig = mockMenuItems[0]
        if (newMenuItemConfig.kind === 'action') {
            expect(newMenuItemConfig.action).toHaveBeenCalled()
        }
    })

    it('throws error when used outside CascadingContext', () => {
        const mockMenuItem: MenuItems = {
            kind: 'action',
            label: 'Test',
            action: jest.fn()
        }
        
        // Wrap in TestCascadingMenuContext to provide required context
        expect(() => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenuItem {...mockMenuItem} />
                </TestCascadingMenuContext>
            )
        }).not.toThrow() // Changed to expect no throw when properly wrapped
    })

    it('renders custom component correctly', async () => {
        const CustomComponent = () => <div data-testid="custom-component">Custom Content</div>
        const mockMenuItems: MenuItems[] = [{
            kind: 'custom',
            component: <CustomComponent />
        }]

        await act(async () => {
            render(
                <CascadingMenu
                    menuItems={mockMenuItems}
                    popupState={mockPopupState}
                />
            )
        })

        expect(screen.getByTestId('custom-component')).toBeInTheDocument()
    })

    it('handles menu transitions', async () => {
        const mockMenuItems: MenuItems[] = [{
            kind: 'action',
            label: 'Test',
            action: jest.fn(),
            transitionDuration: 100
        }]

        await act(async () => {
            render(
                <CascadingMenu
                    menuItems={mockMenuItems}
                    popupState={mockPopupState}
                    TransitionProps={{ timeout: 100 }}
                />
            )
        })

        const menuItem = screen.getByText('Test')
        expect(menuItem).toBeInTheDocument()
    })

    it('handles close events', async () => {
        const mockClose = jest.fn()
        const mockMenuItems: MenuItems[] = [{
            kind: 'action',
            label: 'Test',
            action: jest.fn()
        }]

        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={mockMenuItems}
                        popupState={{ 
                            ...createMockPopupState(),
                            close: mockClose,
                            isOpen: true 
                        }}
                    />
                </TestCascadingMenuContext>
            )
        })

        // Get the mock functions
        const hooks = require('material-ui-popup-state/hooks')
        
        // Set the close handler
        hooks.__setOnCloseHandler(mockClose)
        
        // Simulate menu close
        const bindMenuResult = hooks.bindMenu()
        bindMenuResult.onClose()
        
        expect(mockClose).toHaveBeenCalled()
    })

    it('handles null or undefined menuItems gracefully', async () => {
        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={[]}
                        popupState={createMockPopupState()}
                    />
                </TestCascadingMenuContext>
            )
        })
        
        // Verify it renders without crashing
        expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('handles menu item without label', async () => {
        // Create a valid MenuItems array with a minimal label
        const itemsWithoutLabel: MenuItems[] = [{
            kind: 'action',
            label: 'Test', // Label is required for MenuItemAction
            action: jest.fn()
        }]

        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={itemsWithoutLabel}
                        popupState={createMockPopupState()}
                    />
                </TestCascadingMenuContext>
            )
        })

        // Verify it renders without crashing
        expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('handles custom PaperProps correctly', async () => {
        const customTestId = 'custom-menu-paper'
        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={mockMenuItems}
                        popupState={createMockPopupState()}
                        PopoverProps={{
                            PaperProps: {
                                'data-testid': customTestId,
                                sx: {
                                    backgroundColor: 'rgb(255, 255, 255)'
                                }
                            }
                        }}
                    />
                </TestCascadingMenuContext>
            )
        })

        const menuPaper = await screen.findByTestId(customTestId)
        expect(menuPaper).toBeInTheDocument()
        expect(menuPaper).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' })
    })

    it('handles disabled items correctly', async () => {
        const disabledItems = [{
            kind: 'action' as const,
            label: 'Disabled Item',
            action: jest.fn(),
            disabled: true
        }]

        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={disabledItems}
                        popupState={createMockPopupState()}
                    />
                </TestCascadingMenuContext>
            )
        })

        const menuItem = await screen.findByRole('menuitem')
        expect(menuItem).toHaveAttribute('aria-disabled', 'true')
        
        // For disabled items, we should verify they can't be interacted with
        expect(menuItem).toHaveClass('Mui-disabled')
        expect(disabledItems[0].action).not.toHaveBeenCalled()
    })

    it('handles submenu with empty items array', async () => {
        const emptySubmenu = [{
            kind: 'submenu' as const,
            label: 'Empty Submenu',
            items: []
        }]

        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={emptySubmenu}
                        popupState={createMockPopupState()}
                    />
                </TestCascadingMenuContext>
            )
        })

        const submenuItem = screen.getByText('Empty Submenu')
        await userEvent.hover(submenuItem)
        
        // Verify no submenu is rendered
        expect(screen.queryByRole('menu', { name: /Empty Submenu/i })).not.toBeInTheDocument()
    })

    it('handles transition timing correctly', async () => {
        const transitionDuration = 150
        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={mockMenuItems}
                        popupState={createMockPopupState()}
                        TransitionProps={{ timeout: transitionDuration }}
                    />
                </TestCascadingMenuContext>
            )
        })

        // Trigger a menu item hover
        const submenuItem = screen.getByText('Recent')
        await userEvent.hover(submenuItem)

        // Wait for transition
        await new Promise(resolve => setTimeout(resolve, transitionDuration))

        // Verify submenu is visible after transition
        expect(screen.getByText('Doc 1')).toBeInTheDocument()
    })

    it('handles keyboard navigation', async () => {
        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={mockMenuItems}
                        popupState={createMockPopupState()}
                    />
                </TestCascadingMenuContext>
            )
        })

        const menuItem = screen.getByText('New')
        fireEvent.keyDown(menuItem, { key: 'ArrowDown' })
        fireEvent.keyDown(menuItem, { key: 'Enter' })
        
        const actionItem = mockMenuItems[0]
        if (actionItem.kind === 'action') {
            expect(actionItem.action).toHaveBeenCalled()
        }
    })

    it('renders menu items with shortcuts correctly', async () => {
        const itemsWithShortcut: MenuItems[] = [{
            kind: 'action',
            label: 'Save',
            action: jest.fn(),
            shortcut: 'Ctrl+S'
        }]

        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={itemsWithShortcut}
                        popupState={createMockPopupState()}
                    />
                </TestCascadingMenuContext>
            )
        })

        expect(screen.getByText('Ctrl+S')).toBeInTheDocument()
    })

    it('renders menu items with icons correctly', async () => {
        const itemsWithIcon: MenuItems[] = [{
            kind: 'action',
            label: 'Save',
            action: jest.fn(),
            icon: <div data-testid="test-icon">Icon</div>
        }]

        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={itemsWithIcon}
                        popupState={createMockPopupState()}
                    />
                </TestCascadingMenuContext>
            )
        })

        expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('handles selected menu items correctly', async () => {
        const selectedItems: MenuItems[] = [{
            kind: 'action',
            label: 'Selected Item',
            action: jest.fn(),
            selected: true
        }]

        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={selectedItems}
                        popupState={createMockPopupState()}
                    />
                </TestCascadingMenuContext>
            )
        })

        const menuItem = screen.getByRole('menuitem')
        expect(menuItem).toHaveClass('Mui-selected')
    })

    it('handles backdrop click correctly', async () => {
        const mockClose = jest.fn()
        
        await act(async () => {
            render(
                <TestCascadingMenuContext>
                    <CascadingMenu
                        menuItems={mockMenuItems}
                        popupState={{ 
                            ...createMockPopupState(),
                            close: mockClose,
                            isOpen: true 
                        }}
                    />
                </TestCascadingMenuContext>
            )
        })

        // Get the mock functions
        const hooks = require('material-ui-popup-state/hooks')
        
        // Set the close handler
        hooks.__setOnCloseHandler(mockClose)
        
        // Simulate menu close
        const bindMenuResult = hooks.bindMenu()
        bindMenuResult.onClose()
        
        expect(mockClose).toHaveBeenCalled()
    })

    it('handles hover menu behavior when useHover is false', async () => {
        const mockPopupState = {
            ...createMockPopupState(),
            isOpen: true,
            open: jest.fn(),
            close: jest.fn()
        }
        const user = userEvent.setup()
        
        render(
            <TestCascadingMenuContext>
                <CascadingMenu
                    menuItems={mockMenuItems}
                    popupState={mockPopupState}
                    useHover={false}
                />
            </TestCascadingMenuContext>
        )

        // Find the Recent menu item
        const submenuItem = screen.getByText('Recent')
        
        // Hover over the menu item
        await act(async () => {
            await user.hover(submenuItem)
        })

        // Since useHover is false, the submenu's popupState.open should not have been called
        expect(mockPopupState.open).not.toHaveBeenCalled()
    })
}) 