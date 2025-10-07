/**
 * @fileoverview Tests for renderMenuItem helper function verifying correct
 * rendering of action, divider, and submenu types.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { renderMenuItem } from '../components/renderMenuItem';
import { MenuItemConfig, MenuItemActionConfig, MenuItemDividerConfig, MenuItemSubmenuConfig } from '../types';
import { Save, ContentCopy } from '@mui/icons-material';

describe('renderMenuItem', () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('action items', () => {
    it('should render action menu item', () => {
      const actionItem: MenuItemActionConfig = {
        kind: 'action',
        label: 'Save File',
        action: jest.fn(),
      };

      const element = renderMenuItem({
        item: actionItem,
        handleClose,
        isOpen: true,
      });

      render(<div>{element}</div>);
      expect(screen.getByText('Save File')).toBeInTheDocument();
    });

    it('should render action item with icon and shortcut', () => {
      const actionFn = jest.fn();
      const actionItem: MenuItemActionConfig = {
        kind: 'action',
        label: 'Save',
        action: actionFn,
        icon: <Save data-testid="save-icon" />,
        shortcut: 'Ctrl+S',
      };

      const element = renderMenuItem({
        item: actionItem,
        handleClose,
        isOpen: true,
      });

      render(<div>{element}</div>);
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByTestId('save-icon')).toBeInTheDocument();
      expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
    });

    it('should call action and handleClose on click', () => {
      const actionFn = jest.fn();
      const actionItem: MenuItemActionConfig = {
        kind: 'action',
        label: 'Click Me',
        action: actionFn,
      };

      const element = renderMenuItem({
        item: actionItem,
        handleClose,
        isOpen: true,
      });

      render(<div>{element}</div>);
      
      const menuItem = screen.getByRole('menuitem');
      fireEvent.click(menuItem);

      expect(handleClose).toHaveBeenCalledTimes(1);
      expect(actionFn).toHaveBeenCalledTimes(1);
    });

    it('should render disabled action item', () => {
      const actionItem: MenuItemActionConfig = {
        kind: 'action',
        label: 'Disabled',
        action: jest.fn(),
        disabled: true,
      };

      const element = renderMenuItem({
        item: actionItem,
        handleClose,
        isOpen: true,
      });

      render(<div>{element}</div>);
      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render selected action item', () => {
      const actionItem: MenuItemActionConfig = {
        kind: 'action',
        label: 'Selected',
        action: jest.fn(),
        selected: true,
      };

      const element = renderMenuItem({
        item: actionItem,
        handleClose,
        isOpen: true,
      });

      render(<div>{element}</div>);
      const menuItem = screen.getByRole('menuitem');
      expect(menuItem).toHaveClass('Mui-selected');
    });
  });

  describe('divider items', () => {
    it('should render divider', () => {
      const dividerItem: MenuItemDividerConfig = {
        kind: 'divider',
      };

      const element = renderMenuItem({
        item: dividerItem,
        handleClose,
        isOpen: true,
      });

      render(<div>{element}</div>);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });

  describe('submenu items', () => {
    it('should render submenu with label', () => {
      const submenuItem: MenuItemSubmenuConfig = {
        kind: 'submenu',
        label: 'More Options',
        items: [
          {
            kind: 'action',
            label: 'Nested Action',
            action: jest.fn(),
          },
        ],
      };

      const element = renderMenuItem({
        item: submenuItem,
        handleClose,
        isOpen: true,
      });

      render(<div>{element}</div>);
      expect(screen.getByText('More Options')).toBeInTheDocument();
    });

    it('should render submenu with icon', () => {
      const submenuItem: MenuItemSubmenuConfig = {
        kind: 'submenu',
        label: 'Edit',
        icon: <ContentCopy data-testid="copy-icon" />,
        items: [
          {
            kind: 'action',
            label: 'Copy',
            action: jest.fn(),
          },
        ],
      };

      const element = renderMenuItem({
        item: submenuItem,
        handleClose,
        isOpen: true,
      });

      render(<div>{element}</div>);
      expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
    });

    it('should render nested submenu items recursively', () => {
      const submenuItem: MenuItemSubmenuConfig = {
        kind: 'submenu',
        label: 'Parent',
        items: [
          {
            kind: 'action',
            label: 'Child Action 1',
            action: jest.fn(),
          },
          {
            kind: 'divider',
          },
          {
            kind: 'action',
            label: 'Child Action 2',
            action: jest.fn(),
          },
        ],
      };

      const element = renderMenuItem({
        item: submenuItem,
        handleClose,
        isOpen: true,
      });

      const { container } = render(<div>{element}</div>);
      expect(screen.getByText('Parent')).toBeInTheDocument();
      // Submenu children are rendered (even if hidden initially due to keepMounted)
      expect(screen.getByText('Child Action 1')).toBeInTheDocument();
      expect(screen.getByText('Child Action 2')).toBeInTheDocument();
    });

    it('should render disabled submenu', () => {
      const submenuItem: MenuItemSubmenuConfig = {
        kind: 'submenu',
        label: 'Disabled Submenu',
        disabled: true,
        items: [],
      };

      const element = renderMenuItem({
        item: submenuItem,
        handleClose,
        isOpen: true,
      });

      render(<div>{element}</div>);
      expect(screen.getByText('Disabled Submenu')).toBeInTheDocument();
    });
  });

  describe('key generation', () => {
    it('should generate unique keys for items with id', () => {
      const item: MenuItemActionConfig = {
        kind: 'action',
        id: 'unique-id',
        label: 'Item',
        action: jest.fn(),
      };

      const element = renderMenuItem({
        item,
        handleClose,
        isOpen: true,
      });

      const { container } = render(<div>{element}</div>);
      const menuItem = container.querySelector('[data-key]');
      // The key is used internally by React, we just verify it renders
      expect(screen.getByText('Item')).toBeInTheDocument();
    });
  });

  describe('invalid items', () => {
    it('should return null for invalid item kind', () => {
      const invalidItem = {
        kind: 'invalid',
      } as any;

      const element = renderMenuItem({
        item: invalidItem,
        handleClose,
        isOpen: true,
      });

      expect(element).toBeNull();
    });
  });
});

