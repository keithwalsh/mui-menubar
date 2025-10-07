/**
 * @fileoverview Type definitions for menu configuration supporting actions,
 * dividers, and nested submenus with Material-UI integration.
 */

import { ReactNode } from 'react';

export type MenuItemKind = "action" | "divider" | "submenu";

interface MenuItemBaseConfig {
    label: string;
    id?: string;
    disabled?: boolean;
    selected?: boolean;
    icon?: ReactNode;
}

export interface MenuItemActionConfig extends MenuItemBaseConfig {
    kind: "action";
    action: () => void;
    shortcut?: string;
}

export interface MenuItemDividerConfig {
    kind: "divider";
}

export interface MenuItemSubmenuConfig extends MenuItemBaseConfig {
    kind: "submenu";
    items: MenuItemConfig[];
}

export type MenuItemConfig = MenuItemActionConfig | MenuItemDividerConfig | MenuItemSubmenuConfig;

export interface MenuConfig {
    id?: string;
    label: string;
    disabled?: boolean;
    items: MenuItemConfig[];
}

