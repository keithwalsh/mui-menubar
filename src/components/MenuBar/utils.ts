/**
 * @fileoverview Utility functions for the MenuBar component. Includes hooks for
 * handling menu hotkeys and type guards for menu item types.
 */

import { useHotkeys } from "react-hotkeys-hook";
import { MenuConfig, MenuItemDivider, MenuItemAction, MenuItems } from "./types";

/**
 * Type guard to check if a MenuItem is an action item with both a shortcut and an action.
 * @param {MenuItem} item - The menu item to check.
 * @returns {boolean} True if the item is an action item with both a shortcut and an action, false otherwise.
 */
function hasShortcutAndAction(item: MenuItems): item is MenuItemAction & { shortcut: string } {
    return item.kind === "action" && "action" in item && typeof item.action === "function" && "shortcut" in item && typeof item.shortcut === "string";
}

/**
 * Custom hook to set up hotkeys for menu items with shortcuts.
 * Uses the useHotkeys hook from react-hotkeys-hook for keyboard shortcut handling.
 * @see {@link https://react-hotkeys-hook.vercel.app/docs/api/use-hotkeys|useHotkeys API}
 * @param {MenuConfig[]} config - An array of menu configurations.
 * @returns {void}
 */
export const useMenuHotkeys = (config: MenuConfig[]) => {
    config.forEach((menu) => {
        menu.items.forEach((item) => {
            if (hasShortcutAndAction(item)) {
                useHotkeys(
                    item.shortcut,
                    (event) => {
                        event.preventDefault();
                        item.action();
                    },
                    [item.shortcut]
                );
            }
        });
    });
};

/**
 * Type guard to check if a MenuItem is a divider.
 * @param {MenuItem} menuItem - The menu item to check.
 * @returns {boolean} True if the item is a divider, false otherwise.
 */
export const isDivider = (menuItem: MenuItems): menuItem is MenuItemDivider => {
    return menuItem.kind === "divider";
};
