/**
 * @fileoverview Defines types and interfaces used throughout the MenuBar
 * component and its subcomponents, including new types for material-ui-popup-state.
 */

import { SxProps, Theme, PopoverProps } from "@mui/material";
import { AppBarProps } from "@mui/material";
import React from "react";
import { PopupState } from "material-ui-popup-state/hooks";

export type TransitionDuration = "auto" | number | { appear?: number; enter?: number; exit?: number };

export type MenuItemKind = "action" | "divider" | "submenu" | "custom";

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

export interface MenuItemCustom extends MenuItemBase {
    kind: "custom";
    component: React.ReactNode;
}

export type MenuItems = MenuItemAction | MenuItemDivider | MenuItemSubmenu | MenuItemCustom;

export interface MenuConfig {
    label: string;
    disabled?: boolean;
    items: MenuItems[];
}

export interface MenuBarProps {
    config?: MenuConfig[];
    color?: AppBarProps["color"];
    sx?: SxProps<Theme>;
    disableRipple?: boolean;
}

export interface CascadingMenuProps {
    menuItems: MenuItems[];
    popupState: PopupState;
    disableRipple?: boolean;
    isSubmenu?: boolean;
    useHover?: boolean;
    PopoverProps?: {
        PaperProps?: {
            className?: string;
            [key: string]: any;
        };
        anchorOrigin?: {
            vertical: "top" | "center" | "bottom";
            horizontal: "left" | "center" | "right";
        };
        transformOrigin?: {
            vertical: "top" | "center" | "bottom";
            horizontal: "left" | "center" | "right";
        };
        TransitionProps?: any;
        [key: string]: any;
    };
    [key: string]: any;
}

export interface CascadingContextType {
    parentPopupState: PopupState | null;
    rootPopupState: PopupState | null;
}

export interface SubmenuRendererProps {
    item: MenuItemSubmenu;
    disableRipple?: boolean;
    parentPopupState: PopupState;
}

export interface MainMenuRendererProps {
    menuConfig: MenuConfig[];
    disableRipple?: boolean;
}