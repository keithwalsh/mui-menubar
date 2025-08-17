/**
 * @fileoverview Test suite for the MenuBar component, covering rendering,
 * interaction, submenu behavior, disabled states, custom styles, icons,
 * ripple effect, and edge cases. Uses React Testing Library and Jest.
 */

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MenuBar } from '../src/components/MenuBar'
import { MenuConfig, MenuItemAction, MenuItemSubmenu } from '../src/types'
import DeleteIcon from '@mui/icons-material/Delete'
import { act } from '@testing-library/react'
import HistoryIcon from '@mui/icons-material/History'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import { cleanup } from '@testing-library/react'

const user = userEvent.setup()

const mockMenuConfig: MenuConfig[] = [
  {
    label: 'File',
    items: [
      {
        kind: 'action',
        label: 'New',
        shortcut: 'Ctrl+N',
        action: jest.fn()
      } as MenuItemAction,
      {
        kind: 'action',
        label: 'Open',
        action: jest.fn()
      } as MenuItemAction,
      {
        kind: 'submenu',
        label: 'Recent',
        icon: <HistoryIcon />,
        items: [
          { kind: 'action', label: 'Doc 1', action: jest.fn() },
          { kind: 'action', label: 'Doc 2', action: jest.fn() }
        ]
      } as MenuItemSubmenu,
      { kind: 'divider' },
      {
        kind: 'action',
        label: 'Exit',
        action: jest.fn()
      } as MenuItemAction
    ]
  },
  {
    label: 'Edit',
    items: [
      {
        kind: 'action',
        label: 'Cut',
        icon: <ContentCutIcon />,
        disabled: true,
        action: jest.fn()
      } as MenuItemAction,
      {
        kind: 'action',
        label: 'Delete',
        icon: <DeleteIcon />,
        action: jest.fn()
      } as MenuItemAction
    ]
  }
]

// Ensure cleanup after each test
afterEach(() => {
  cleanup()
})

describe('MenuBar', () => {
  beforeEach(async () => {
    cleanup()
    await act(async () => {
      render(<MenuBar config={mockMenuConfig} />)
    })
  })

  it('renders menu items correctly', () => {
    const fileButtons = screen.getAllByText('File')
    expect(fileButtons[0]).toBeInTheDocument()
    const editButtons = screen.getAllByText('Edit')
    expect(editButtons[0]).toBeInTheDocument()
  })

  it('renders with custom color', () => {
    const { container } = render(<MenuBar config={mockMenuConfig} color="secondary" />)
    const menuBar = container.querySelector('[data-testid="menu-bar-root"]')
    expect(menuBar).toHaveClass('MuiAppBar-colorSecondary')
  })

  it('applies custom styles via sx prop', () => {
    const { container } = render(
      <MenuBar 
        config={mockMenuConfig} 
        sx={{ backgroundColor: 'rgb(0, 0, 255)' }} 
      />
    )
    const menuBar = container.querySelector('[data-testid="menu-bar-root"]')
    expect(menuBar).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' })
  })

  it('opens submenu on click', async () => {
    const fileMenuButtons = screen.getAllByRole('button', { name: /file/i })
    await user.click(fileMenuButtons[0]) // Use the first button if multiple are found
    
    expect(await screen.findByRole('menuitem', { name: /new/i })).toBeInTheDocument()
    expect(await screen.findByRole('menuitem', { name: /open/i })).toBeInTheDocument()
  })

  it('calls action handler when menu item is clicked', async () => {
    const fileMenu = screen.getByRole('button', { name: /file/i })
    await user.click(fileMenu)
    
    const newMenuItem = await screen.findByRole('menuitem', { name: /new/i })
    await user.click(newMenuItem)
    
    const newMenuItemConfig = mockMenuConfig[0].items[0] as MenuItemAction
    expect(newMenuItemConfig.action).toHaveBeenCalled()
  })

  it('displays shortcuts when specified', async () => {
    await user.click(screen.getByRole('button', { name: /file/i }))
    
    // Look for the shortcut text within the menu item
    const menuItem = await screen.findByRole('menuitem', { name: /new/i })
    expect(menuItem).toHaveTextContent('Ctrl+N')
  })

  it('renders submenu items and allows interaction', async () => {
    await user.click(screen.getByRole('button', { name: /file/i }))
    
    const recentMenu = await screen.findByRole('menuitem', { name: /recent/i })
    await user.hover(recentMenu)
    
    // Verify submenu items
    expect(await screen.findByRole('menuitem', { name: /doc 1/i })).toBeInTheDocument()
    expect(await screen.findByRole('menuitem', { name: /doc 2/i })).toBeInTheDocument()
  })

  it('renders custom components', async () => {
    render(<MenuBar config={mockMenuConfig} />)
    await user.click(screen.getAllByRole('button', { name: /edit/i })[0])
    
    const menuItems = await screen.findAllByRole('menuitem')
    expect(menuItems.length).toBeGreaterThan(0)
  })

  it('respects disabled state of menu items', async () => {
    await user.click(screen.getByRole('button', { name: /edit/i }))
    
    const cutMenuItem = await screen.findByRole('menuitem', { name: /cut/i })
    expect(cutMenuItem).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders icons in menu items', async () => {
    await user.click(screen.getByRole('button', { name: /edit/i }))
    
    const deleteMenuItem = await screen.findByRole('menuitem', { name: /delete/i })
    within(deleteMenuItem).getByTestId('DeleteIcon')
  })

  it('renders dividers correctly', async () => {
    await user.click(screen.getByText('File'))
    const divider = screen.getByTestId('menu-divider')
    
    expect(divider).toBeInTheDocument()
  })

  it('handles empty config gracefully', () => {
    render(<MenuBar config={[]} />)
    const toolbar = screen.getByRole('toolbar')
    expect(toolbar).toBeInTheDocument()
  })

  it('can disable ripple effect', async () => {
    const { container } = render(<MenuBar config={mockMenuConfig} disableRipple />)
    const fileMenu = container.querySelector('button')
    expect(fileMenu).not.toBeNull()
    
    const rippleElement = fileMenu?.querySelector('.MuiTouchRipple-root')
    expect(rippleElement).toBeNull()
  })

  it('renders submenu with icon', async () => {
    const submenuConfig: MenuConfig[] = [{
      label: 'File',
      items: [{
        kind: 'submenu',
        label: 'Recent',
        icon: <DeleteIcon />,
        items: [
          { kind: 'action', label: 'Doc 1', action: jest.fn() }
        ]
      }]
    }]
    
    const { container } = render(<MenuBar config={submenuConfig} />)
    const fileButton = container.querySelector('button')
    expect(fileButton).not.toBeNull()
    await user.click(fileButton!)
    
    const submenuItem = await screen.findByText('Recent')
    expect(submenuItem).toBeInTheDocument()
    expect(await screen.findByTestId('DeleteIcon')).toBeInTheDocument()
  })


})

describe('Submenu functionality', () => {
  it('handles submenu item selection', async () => {
    const submenuAction = jest.fn()
    const submenuConfig: MenuConfig[] = [{
      label: 'File',
      items: [{
        kind: 'submenu',
        label: 'Recent',
        items: [
          { kind: 'action', label: 'Doc 1', action: submenuAction }
        ]
      }]
    }]
    
    render(<MenuBar config={submenuConfig} />)
    
    // Click the File menu button
    await user.click(screen.getByRole('button', { name: /file/i }))
    
    // Wait for and hover the Recent menu item
    const recentMenuItem = await screen.findByText('Recent')
    await user.hover(recentMenuItem)
    
    // Wait for and click Doc 1
    const doc1MenuItem = await screen.findByText('Doc 1')
    await act(async () => {
      await user.click(doc1MenuItem)
    })
    
    expect(submenuAction).toHaveBeenCalledTimes(1)
  })

  // Add a simpler test for submenu rendering
  it('renders submenu items when parent menu is clicked', async () => {
    render(<MenuBar config={mockMenuConfig} />)
    await user.click(screen.getByText('File'))
    
    // Find and click the Recent menu item by text instead of role
    const recentMenuItem = await screen.findByText('Recent')
    await user.hover(recentMenuItem)
    
    // Verify submenu items are visible
    expect(await screen.findByText('Doc 1')).toBeInTheDocument()
    expect(await screen.findByText('Doc 2')).toBeInTheDocument()
  })
})

describe('MenuBar edge cases', () => {
  it('handles empty config gracefully', () => {
    render(<MenuBar config={[]} />)
    const toolbar = screen.getByRole('toolbar')
    expect(toolbar).toBeInTheDocument()
  })

  it('handles disabled menu items in config', () => {
    const disabledConfig: MenuConfig[] = [{
      label: 'File',
      disabled: true,
      items: [
        { kind: 'action', label: 'New', action: jest.fn() }
      ]
    }]
    
    render(<MenuBar config={disabledConfig} />)
    
    // Update the query to find the button even when it's in an aria-hidden container
    const menuButton = screen.getByText('File').closest('button')
    expect(menuButton).not.toBeNull()
    
    // Check for disabled attribute
    expect(menuButton).toHaveAttribute('disabled')
    
    // Check for disabled styling class
    expect(menuButton).toHaveClass('Mui-disabled')
  })
})
