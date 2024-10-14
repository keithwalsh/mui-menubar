import React from "react";
import { SxProps, Theme } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
/**
 * Defines the possible kinds of menu items.
 */
export type MenuItemKind = "item" | "divider";
/**
 * Base interface for menu items.
 * - `kind` is optional and defaults to 'item' if not provided.
 */
export interface BaseMenuItemConfig {
    kind?: MenuItemKind;
}
/**
 * Interface for regular action menu items.
 * - Extends BaseMenuItemConfig.
 * - `kind` is either 'item' or undefined.
 * - Includes label, optional action, and optional icon.
 */
export interface MenuItemActionConfig extends BaseMenuItemConfig {
    kind?: "item";
    label: string;
    action?: () => void;
    icon?: React.ComponentType<SvgIconProps>;
}
/**
 * Interface for divider menu items.
 * - `kind` is strictly 'divider'.
 */
export interface DividerMenuItemConfig extends BaseMenuItemConfig {
    kind: "divider";
}
/**
 * Union type for any menu item configuration.
 */
export type MenuItemConfig = MenuItemActionConfig | DividerMenuItemConfig;
/**
 * Interface for top-level menu configurations.
 * - Each menu has a label and an array of menu items.
 */
export interface MenuConfig {
    label: string;
    items: MenuItemConfig[];
}
interface MenuStripProps {
    menuConfig: MenuConfig[];
    darkMode?: boolean;
    sx?: SxProps<Theme>;
}
declare const MenuStrip: React.FC<MenuStripProps>;
export default MenuStrip;
