/**
 * @fileoverview Defines types and interfaces for the MenuBar component.
 * Includes definitions for menu items, configuration, props, and rendering
 * functions. Supports various menu item types and theming options.
 */

import { SxProps, Theme } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";

/** Represents the different types of menu items available in the MenuBar. */
export type Kind = "action" | "divider" | "submenu";

/** Defines the color theme options for the MenuBar component. */
export type ColorTheme = "light" | "dark";

export type MenuBarItem = MenuBarAction | MenuBarDivider | MenuBarSubmenu;

/** Base interface for all menu item types. */
export interface MenuBarBase {
    kind: Kind;
}

/** Interface for action menu items that can be clicked. */
export interface MenuBarAction extends MenuBarBase {
    kind: "action";
    label: string;
    action: () => void;
    icon?: React.ComponentType<SvgIconProps>;
    shortcut?: string;
}

/** Interface for divider menu items used to separate groups of items. */
export interface MenuBarDivider extends MenuBarBase {
    kind: "divider";
}

/** Interface for submenu items that contain nested menu items. */
export interface MenuBarSubmenu extends MenuBarBase {
    kind: "submenu";
    label: string;
    items: MenuBarItem[];
    icon?: React.ComponentType<SvgIconProps>;
}

/** Interface for configuring a single menu in the MenuBar. */
export interface MenuConfig {
    label: string;
    items: MenuBarItem[];
}

/** Props interface for the MenuBar component. */
export interface MenuBarProps {
    config: MenuConfig[];
    colorTheme?: ColorTheme;
    sx?: SxProps<Theme>;
}

/** Props interface for rendering menu items. */
export interface RenderMenuItemsProps {
    menuItems: MenuBarItem[];
    colorTheme?: ColorTheme;
    handleClose: () => void;
}

/** Props interface for rendering top-level menu items. */
export interface RenderMenuTopLevelProps {
    menuTopLevel: MenuConfig;
    colorTheme?: ColorTheme;
    menuTopLevelIndex: number;
    openMenu: { menuIndex: number; menuAnchor: HTMLElement } | null;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>, menuIndex: number) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, menuIndex: number) => void;
    handleClose: () => void;
}

/** Props interface for rendering nested menu items. */
export interface RenderNestedMenuItemProps {
    subMenuItem: MenuBarSubmenu;
    colorTheme?: ColorTheme;
    handleClose: () => void;
}