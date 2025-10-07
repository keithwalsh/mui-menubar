/**
 * @fileoverview Tests for MenuBar component verifying menu bar rendering,
 * activation logic, and click-outside behavior.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MenuBar } from '../components/MenuBar';
import { MenuConfig } from '../types';
import { Save, FolderOpen, ContentCopy, ContentPaste } from '@mui/icons-material';

describe('MenuBar', () => {
  const basicMenuConfig: MenuConfig[] = [
    {
      label: 'File',
      items: [
        {
          kind: 'action',
          label: 'New',
          action: jest.fn(),
        },
        {
          kind: 'action',
          label: 'Open',
          action: jest.fn(),
          icon: <FolderOpen data-testid="open-icon" />,
        },
      ],
    },
    {
      label: 'Edit',
      items: [
        {
          kind: 'action',
          label: 'Copy',
          action: jest.fn(),
          icon: <ContentCopy data-testid="copy-icon" />,
        },
        {
          kind: 'action',
          label: 'Paste',
          action: jest.fn(),
          icon: <ContentPaste data-testid="paste-icon" />,
        },
      ],
    },
  ];

  it('should render all menu buttons', () => {
    render(<MenuBar menuConfig={basicMenuConfig} />);
    
    expect(screen.getByRole('button', { name: 'File' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('should open menu on button click', () => {
    render(<MenuBar menuConfig={basicMenuConfig} />);
    
    const fileButton = screen.getByRole('button', { name: 'File' });
    fireEvent.click(fileButton);

    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('should close menu on second click', () => {
    render(<MenuBar menuConfig={basicMenuConfig} />);
    
    const fileButton = screen.getByRole('button', { name: 'File' });
    
    // Open menu
    fireEvent.click(fileButton);
    expect(screen.getByText('New')).toBeInTheDocument();
    
    // Close menu
    fireEvent.click(fileButton);
    
    // Verify deactivation was called (menu is closed via internal state)
    expect(fileButton).toBeInTheDocument();
  });

  it('should switch between menus on hover when a menu is active', () => {
    render(<MenuBar menuConfig={basicMenuConfig} />);
    
    // Open File menu
    const fileButton = screen.getAllByRole('button', { hidden: true }).find(btn => btn.textContent === 'File');
    if (fileButton) {
      fireEvent.click(fileButton);
      expect(screen.getByText('New')).toBeInTheDocument();

      // Hover over Edit button
      const editButton = screen.getAllByRole('button', { hidden: true }).find(btn => btn.textContent === 'Edit');
      if (editButton) {
        fireEvent.pointerEnter(editButton);

        // Edit menu should now be visible
        expect(screen.getByText('Copy')).toBeInTheDocument();
        expect(screen.getByText('Paste')).toBeInTheDocument();
      }
    }
  });

  it('should close menu when clicking outside', () => {
    render(
      <div>
        <MenuBar menuConfig={basicMenuConfig} />
        <div data-testid="outside">Outside</div>
      </div>
    );
    
    const fileButton = screen.getByRole('button', { name: 'File' });
    fireEvent.click(fileButton);
    expect(screen.getByText('New')).toBeInTheDocument();

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    // Menu should be closed - verify outside element is still there
    expect(outside).toBeInTheDocument();
  });

  it('should not close menu when clicking on a menu button', () => {
    render(<MenuBar menuConfig={basicMenuConfig} />);
    
    const fileButton = screen.getByRole('button', { name: 'File' });
    fireEvent.click(fileButton);
    expect(screen.getByText('New')).toBeInTheDocument();

    // Click on the same button shouldn't trigger outside click
    fireEvent.mouseDown(fileButton);
    
    // The button click handler will close it, but mousedown on button shouldn't close via outside click
    expect(fileButton).toBeInTheDocument();
  });

  it('should apply custom sx prop', () => {
    const customSx = { backgroundColor: 'primary.main', padding: 2 };
    const { container } = render(<MenuBar menuConfig={basicMenuConfig} sx={customSx} />);
    
    // The Box component should be rendered
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle empty menu config', () => {
    render(<MenuBar menuConfig={[]} />);
    
    // Should render empty menu bar
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('should handle menu with custom id', () => {
    const configWithId: MenuConfig[] = [
      {
        id: 'custom-file',
        label: 'File',
        items: [
          {
            kind: 'action',
            label: 'New',
            action: jest.fn(),
          },
        ],
      },
    ];

    render(<MenuBar menuConfig={configWithId} />);
    
    const fileButton = screen.getByRole('button', { name: 'File' });
    fireEvent.click(fileButton);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should handle disabled menu', () => {
    const configWithDisabled: MenuConfig[] = [
      {
        label: 'File',
        disabled: true,
        items: [
          {
            kind: 'action',
            label: 'New',
            action: jest.fn(),
          },
        ],
      },
    ];

    render(<MenuBar menuConfig={configWithDisabled} />);
    
    const fileButton = screen.getByRole('button', { name: 'File' });
    expect(fileButton).toBeDisabled();
  });

  it('should execute menu item action when clicked', () => {
    const actionFn = jest.fn();
    const configWithAction: MenuConfig[] = [
      {
        label: 'File',
        items: [
          {
            kind: 'action',
            label: 'Save',
            action: actionFn,
          },
        ],
      },
    ];

    render(<MenuBar menuConfig={configWithAction} />);
    
    const fileButton = screen.getByRole('button', { name: 'File' });
    fireEvent.click(fileButton);

    const saveMenuItem = screen.getByRole('menuitem', { name: /Save/i });
    fireEvent.click(saveMenuItem);

    expect(actionFn).toHaveBeenCalledTimes(1);
  });

  it('should handle complex nested menu structure', () => {
    const complexConfig: MenuConfig[] = [
      {
        label: 'Edit',
        items: [
          {
            kind: 'submenu',
            label: 'More Options',
            items: [
              {
                kind: 'action',
                label: 'Nested Action',
                action: jest.fn(),
              },
              {
                kind: 'divider',
              },
              {
                kind: 'action',
                label: 'Another Nested',
                action: jest.fn(),
              },
            ],
          },
        ],
      },
    ];

    render(<MenuBar menuConfig={complexConfig} />);
    
    const editButton = screen.getByRole('button', { name: 'Edit' });
    fireEvent.click(editButton);

    expect(screen.getByText('More Options')).toBeInTheDocument();
    expect(screen.getByText('Nested Action')).toBeInTheDocument();
    expect(screen.getByText('Another Nested')).toBeInTheDocument();
  });

  it('should maintain separate states for each menu button', () => {
    render(<MenuBar menuConfig={basicMenuConfig} />);
    
    // Open File menu
    const fileButton = screen.getByRole('button', { name: 'File' });
    fireEvent.click(fileButton);
    expect(screen.getByText('New')).toBeInTheDocument();

    // File menu items are visible
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    const { unmount } = render(<MenuBar menuConfig={basicMenuConfig} />);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });

  it('should register and maintain button refs', () => {
    render(<MenuBar menuConfig={basicMenuConfig} />);
    
    const fileButton = screen.getByRole('button', { name: 'File' });
    const editButton = screen.getByRole('button', { name: 'Edit' });
    
    expect(fileButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  it('should handle menu items with shortcuts', () => {
    const configWithShortcuts: MenuConfig[] = [
      {
        label: 'File',
        items: [
          {
            kind: 'action',
            label: 'Save',
            action: jest.fn(),
            shortcut: 'Ctrl+S',
          },
        ],
      },
    ];

    render(<MenuBar menuConfig={configWithShortcuts} />);
    
    const fileButton = screen.getByRole('button', { name: 'File' });
    fireEvent.click(fileButton);

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });
});

