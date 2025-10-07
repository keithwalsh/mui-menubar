/**
 * @fileoverview Shared utilities for menu component logic including key
 * generation, ID resolution, and common styling configurations.
 */

import { SxProps, Theme } from '@mui/material';
import { MenuItemConfig } from '../types';

/**
 * Generates a unique key for menu items based on id, label, or fallback.
 */
export function generateMenuItemKey(item: MenuItemConfig): string | number {
    if ('id' in item && item.id) {
        return item.id;
    }
    if ('label' in item && item.label) {
        return item.label;
    }
    return Math.random();
}

/**
 * Resolves menu identifier from id or label.
 */
export function resolveMenuId(menu: { id?: string; label: string }): string {
    return menu.id ?? menu.label;
}

/**
 * Common Menu component styling configuration for nested menus.
 */
export const NESTED_MENU_SX: SxProps<Theme> = {
    pointerEvents: 'none',
    m: 0,
    p: 0,
    '& .MuiList-root': {
        pt: 0.5,
        pb: 0.5,
        m: 0,
        p: 0,
    },
};

/**
 * Inline style for inner Box to re-enable pointer events.
 */
export const POINTER_EVENTS_AUTO_STYLE = { pointerEvents: 'auto' as const };

/**
 * Theme color utilities for consistent alpha transparency across menu items.
 */
export const getMenuItemIconColor = (theme: Theme) => theme.palette.text.primary;
export const getMenuItemLabelColor = (theme: Theme) => theme.palette.text.secondary;
export const getMenuItemShortcutColor = (theme: Theme) => theme.palette.text.secondary;

export const MENU_ITEM_ICON_ALPHA = 0.7;
export const MENU_ITEM_LABEL_ALPHA = 0.9;
export const MENU_ITEM_SHORTCUT_ALPHA = 0.6;

