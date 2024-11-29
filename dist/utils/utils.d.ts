/**
 * @fileoverview Utility functions for the MenuBar component. Includes hooks for
 * handling menu hotkeys and type guards for menu item types.
 */
import { MenuConfig, MenuItemDivider, MenuItems } from "../types/types";
/**
 * Custom hook to set up hotkeys for menu items with shortcuts.
 * Uses the useHotkeys hook from react-hotkeys-hook for keyboard shortcut handling.
 * @see {@link https://react-hotkeys-hook.vercel.app/docs/api/use-hotkeys|useHotkeys API}
 * @param {MenuConfig[]} config - An array of menu configurations.
 * @returns {void}
 */
export declare const useMenuHotkeys: (config: MenuConfig[]) => void;
/**
 * Type guard to check if a MenuItem is a divider.
 * @param {MenuItem} menuItem - The menu item to check.
 * @returns {boolean} True if the item is a divider, false otherwise.
 */
export declare const isDivider: (menuItem: MenuItems) => menuItem is MenuItemDivider;
