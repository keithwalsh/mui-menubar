/**
 * @fileoverview Defines types and interfaces used throughout the MenuBar
 * component and its subcomponents, including new types for material-ui-popup-state.
 */

import { SxProps, Theme } from "@mui/material";
import { AppBarProps } from "@mui/material";
import { PopupState } from "material-ui-popup-state/hooks";
import { MenuProps } from "@mui/material/Menu";

/** Represents the different types of menu items available in the MenuBar. */
export type MenuBarItemKind = "action" | "divider" | "submenu" | "component";

/** Defines the color theme options for the MenuBar component. */
export type ColorTheme = "light" | "dark";

/** The length of the transition in ms, or 'auto'. */
export type TransitionDuration = "auto" | number | { appear?: number; enter?: number; exit?: number };

/** Base interface for all menu item types. */
export interface MenuBarBase {
    kind: MenuBarItemKind;
    label?: string;
    disabled?: boolean;
}

/** Interface for action menu items that can be clicked. */
export interface MenuBarAction extends MenuBarBase {
    kind: "action";
    label: string;
    onClick: () => void;
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
    items: MenuBarItem[];
    icon?: React.ReactNode;
}

/** Interface for component menu items that render custom React components. */
export interface MenuBarComponent extends MenuBarBase {
    kind: "component";
    component: React.ReactNode;
}

/** Union type for all possible menu item types. */
export type MenuBarItem = MenuBarAction | MenuBarDivider | MenuBarSubmenu | MenuBarComponent;

/** Interface for top-level menu configuration. */
export interface MenuConfig {
    label: string;
    disabled?: boolean;
    items: MenuBarItem[];
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

/** Props interface for the RenderMenuTopLevel component. */
export interface RenderMenuTopLevelProps {
    menuTopLevel: MenuConfig;
    menuTopLevelIndex: number;
    openMenu?: {
        menuIndex: number;
        menuAnchor: HTMLElement | null;
    };
    handleClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLElement>, index: number) => void;
    handleClose: () => void;
    colorTheme?: ColorTheme;
    disableRipple?: boolean;
    transitionDuration?: TransitionDuration;
}

/** Props interface for the CascadingMenu component. */
export interface CascadingMenuProps extends Omit<MenuProps, "open"> {
    menuItems: MenuBarItem[];
    popupState: PopupState;
    colorTheme?: ColorTheme;
    disableRipple?: boolean;
    isSubmenu?: boolean;
}

/** Props interface for the CascadingSubmenu component. */
export interface CascadingSubmenuProps {
    item: MenuBarSubmenu;
    popupId: string;
    colorTheme?: ColorTheme;
    disableRipple?: boolean;
}

/** Props interface for the CascadingMenuItem component. */
export interface CascadingMenuItemProps {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}
