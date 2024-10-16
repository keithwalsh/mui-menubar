/**
 * @fileoverview Defines types and interfaces used throughout the MenuBar
 * component and its subcomponents.
 */

import { SxProps, Theme } from "@mui/material";
import { AppBarProps } from "@mui/material";

/** Represents the different types of menu items available in the MenuBar. */
export type MenuBarItemKind = "action" | "divider" | "submenu";

/** Defines the color theme options for the MenuBar component. */
export type ColorTheme = "light" | "dark";

/** The length of the transition in ms, or 'auto'. */
export type TransitionDuration = "auto" | number | { appear?: number; enter?: number; exit?: number };

/** Base interface for all menu item types. */
export interface MenuBarBase {
    kind: MenuBarItemKind;
}

/** Interface for action menu items that can be clicked. */
export interface MenuBarAction extends MenuBarBase {
    kind: "action";
    label: string;
    disabled?: boolean;
    selected?: boolean;
    action: () => void;
    icon?: React.ReactNode;
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
    disabled?: boolean;
    selected?: boolean;
    items: MenuBarItem[];
    icon?: React.ReactNode;
}

/** Union type for all possible menu item types. */
export type MenuBarItem = MenuBarAction | MenuBarDivider | MenuBarSubmenu;

/** Interface for top-level menu configuration. */
export interface MenuConfig {
    label: string;
    disabled?: boolean;
    selected?: boolean;
    items: MenuBarItem[];
}

/** Props interface for rendering menu items. */
export interface RenderMenuItemsProps {
    menuItems: MenuBarItem[];
    colorTheme?: ColorTheme;
    handleClose: () => void;
    disableRipple?: boolean;
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
    disableRipple?: boolean;
    transitionDuration?: TransitionDuration;
}

/** Props interface for rendering nested menu items. */
export interface RenderNestedMenuItemProps {
    subMenuItem: MenuBarSubmenu;
    colorTheme?: ColorTheme;
    handleClose: () => void;
    transitionDuration?: TransitionDuration;
    disableRipple?: boolean;
}

export interface OpenMenuState {
    menuIndex: number;
    menuAnchor: HTMLElement;
}

/** Props interface for the MenuBar component. */
export interface MenuBarProps {
    config: MenuConfig[];
    colorTheme?: ColorTheme;
    color?: AppBarProps["color"];
    sx?: SxProps<Theme>;
    transitionDuration?: TransitionDuration;
    disableRipple?: boolean;
}
