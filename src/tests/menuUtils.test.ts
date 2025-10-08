/**
 * @fileoverview Tests for menu utility functions including key generation,
 * ID resolution, and theme color utilities.
 */

import { createTheme, Theme } from '@mui/material';
import { getMenuItemIconColor, getMenuItemLabelColor, getMenuItemShortcutColor, generateMenuItemKey, MENU_ITEM_ICON_ALPHA, MENU_ITEM_LABEL_ALPHA, MENU_ITEM_SHORTCUT_ALPHA, NESTED_MENU_SX, POINTER_EVENTS_AUTO_STYLE, resolveMenuId } from '../utils/menuUtils';
import { MenuItemActionConfig, MenuItemDividerConfig } from '../types';

describe('menuUtils', () => {
  describe('generateMenuItemKey', () => {
    it('should return id when present', () => {
      const item: MenuItemActionConfig = {
        kind: 'action',
        id: 'test-id',
        label: 'Test Label',
        action: jest.fn(),
      };
      expect(generateMenuItemKey(item)).toBe('test-id');
    });

    it('should return label when id is not present', () => {
      const item: MenuItemActionConfig = {
        kind: 'action',
        label: 'Test Label',
        action: jest.fn(),
      };
      expect(generateMenuItemKey(item)).toBe('Test Label');
    });

    it('should return a number when neither id nor label is present (divider)', () => {
      const item: MenuItemDividerConfig = {
        kind: 'divider',
      };
      const key = generateMenuItemKey(item);
      expect(typeof key).toBe('number');
    });

    it('should prioritize id over label', () => {
      const item: MenuItemActionConfig = {
        kind: 'action',
        id: 'priority-id',
        label: 'Priority Label',
        action: jest.fn(),
      };
      expect(generateMenuItemKey(item)).toBe('priority-id');
    });
  });

  describe('resolveMenuId', () => {
    it('should return id when present', () => {
      const menu = {
        id: 'menu-id',
        label: 'Menu Label',
      };
      expect(resolveMenuId(menu)).toBe('menu-id');
    });

    it('should return label when id is not present', () => {
      const menu = {
        label: 'Menu Label',
      };
      expect(resolveMenuId(menu)).toBe('Menu Label');
    });

    it('should prioritize id over label', () => {
      const menu = {
        id: 'priority-id',
        label: 'Priority Label',
      };
      expect(resolveMenuId(menu)).toBe('priority-id');
    });
  });

  describe('theme color utilities', () => {
    let theme: Theme;

    beforeEach(() => {
      theme = createTheme({
        palette: {
          text: {
            primary: '#000000',
            secondary: '#666666',
          },
        },
      });
    });

    it('should return correct icon color', () => {
      expect(getMenuItemIconColor(theme)).toBe(theme.palette.text.primary);
    });

    it('should return correct label color', () => {
      expect(getMenuItemLabelColor(theme)).toBe(theme.palette.text.secondary);
    });

    it('should return correct shortcut color', () => {
      expect(getMenuItemShortcutColor(theme)).toBe(theme.palette.text.secondary);
    });
  });

  describe('constants', () => {
    it('should have correct NESTED_MENU_SX structure', () => {
      expect(NESTED_MENU_SX).toHaveProperty('pointerEvents', 'none');
      expect(NESTED_MENU_SX).toHaveProperty('m', 0);
      expect(NESTED_MENU_SX).toHaveProperty('p', 0);
      // Check for nested .MuiList-root styling using bracket notation
      expect((NESTED_MENU_SX as any)['& .MuiList-root']).toBeDefined();
    });

    it('should have correct POINTER_EVENTS_AUTO_STYLE', () => {
      expect(POINTER_EVENTS_AUTO_STYLE).toEqual({ pointerEvents: 'auto' });
    });

    it('should have correct alpha values', () => {
      expect(MENU_ITEM_ICON_ALPHA).toBe(0.7);
      expect(MENU_ITEM_LABEL_ALPHA).toBe(0.9);
      expect(MENU_ITEM_SHORTCUT_ALPHA).toBe(0.6);
    });
  });
});

