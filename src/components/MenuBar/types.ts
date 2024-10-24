/**
 * @fileoverview Defines types and interfaces used throughout the MenuBar
 * component and its subcomponents, including new types for material-ui-popup-state.
 */

import { SxProps, Theme } from "@mui/material";
import { AppBarProps } from "@mui/material";
import React from "react";
import { PopupState } from "material-ui-popup-state/hooks";

export type ColorTheme = "light" | "dark";

export type TransitionDuration = "auto" | number | { appear?: number; enter?: number; exit?: number };

export type MenuItemKind = "action" | "divider" | "submenu";

interface MenuItemBase {
    kind: MenuItemKind;
    label?: string;
    disabled?: boolean;
    selected?: boolean;
    transitionDuration?: TransitionDuration;
}

export interface MenuItemAction extends MenuItemBase {
    kind: "action";
    label: string;
    action: () => void;
    icon?: React.ReactNode;
    shortcut?: string;
}

export interface MenuItemDivider extends MenuItemBase {
    kind: "divider";
}

export interface MenuItemSubmenu extends MenuItemBase {
    kind: "submenu";
    label: string;
    items: MenuItems[];
    icon?: React.ReactNode;
}

export type MenuItems = MenuItemAction | MenuItemDivider | MenuItemSubmenu;

export interface MenuConfig {
    label: string;
    disabled?: boolean;
    items: MenuItems[];
}

export interface MenuBarProps {
    config?: MenuConfig[];
    colorTheme?: ColorTheme;
    color?: AppBarProps["color"];
    sx?: SxProps<Theme>;
    disableRipple?: boolean;
    transitionDuration?: TransitionDuration;
}

export interface CascadingMenuProps {
    menuItems: MenuItems[];
    popupState: PopupState;
    colorTheme?: ColorTheme;
    disableRipple?: boolean;
    transitionDuration?: TransitionDuration;
    isSubmenu?: boolean;
    variant?: "menu" | "popover";
    anchorOrigin?: {
        vertical: "top" | "center" | "bottom";
        horizontal: "left" | "center" | "right";
    };
    transformOrigin?: {
        vertical: "top" | "center" | "bottom";
        horizontal: "left" | "center" | "right";
    };
    PaperProps?: any;
    TransitionProps?: any;
    useHover?: boolean;
}

export interface CascadingContextType {
    parentPopupState: PopupState | null;
    rootPopupState: PopupState | null;
}
