/**
 * @fileoverview Utility functions for the MenuBar component. Includes a
 * keyboard shortcut hook implemented with a stable effect and type guards for
 * menu item types.
 */

import { useEffect, useMemo } from "react";
import { MenuConfig, MenuItemDivider, MenuItemAction, MenuItems } from "../types/types";

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
    const shortcutToAction = useMemo(() => {
        const map = new Map<string, () => void>();
        config.forEach((menu) => {
            menu.items.forEach((item) => {
                if (hasShortcutAndAction(item)) {
                    const normalized = normalizeShortcut(item.shortcut);
                    if (normalized) {
                        map.set(normalized, item.action);
                    }
                }
            });
        });
        return map;
    }, [config]);

    useEffect(() => {
        if (shortcutToAction.size === 0) {
            return;
        }

        const handler = (event: KeyboardEvent) => {
            const pressed = eventToShortcut(event);
            if (!pressed) {
                return;
            }
            const action = shortcutToAction.get(pressed);
            if (action) {
                event.preventDefault();
                action();
            }
        };

        document.addEventListener("keydown", handler);
        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, [shortcutToAction]);
};

function normalizeShortcut(input: string): string | null {
    const trimmed = input.trim().toLowerCase().replace(/\s+/g, "");
    if (!trimmed) return null;
    const parts = trimmed.split("+");
    const canonical = new Set<string>();
    let key: string | null = null;

    parts.forEach((part) => {
        switch (part) {
            case "ctrl":
            case "control":
                canonical.add("ctrl");
                break;
            case "alt":
            case "option":
                canonical.add("alt");
                break;
            case "shift":
                canonical.add("shift");
                break;
            case "meta":
            case "cmd":
            case "command":
            case "super":
                canonical.add("meta");
                break;
            default:
                key = part;
        }
    });

    const modifiersInOrder = ["ctrl", "alt", "shift", "meta"].filter((m) => canonical.has(m));
    const keySegment = key ? key : null;
    if (!keySegment && modifiersInOrder.length === 0) return null;
    return (modifiersInOrder.length ? modifiersInOrder.join("+") + (keySegment ? "+" : "") : "") + (keySegment ? keySegment : "");
}

function eventToShortcut(event: KeyboardEvent): string | null {
    const modifiers: string[] = [];
    if (event.ctrlKey) modifiers.push("ctrl");
    if (event.altKey) modifiers.push("alt");
    if (event.shiftKey) modifiers.push("shift");
    if (event.metaKey) modifiers.push("meta");

    const key = (event.key || "").toLowerCase();
    if (!key || key === "control" || key === "shift" || key === "alt" || key === "meta") {
        return modifiers.length ? modifiers.join("+") : null;
    }
    return (modifiers.length ? modifiers.join("+") + "+" : "") + key;
}

/**
 * Type guard to check if a MenuItem is a divider.
 * @param {MenuItem} menuItem - The menu item to check.
 * @returns {boolean} True if the item is a divider, false otherwise.
 */
export const isDivider = (menuItem: MenuItems): menuItem is MenuItemDivider => {
    return menuItem.kind === "divider";
};
