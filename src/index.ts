/**
 * @fileoverview Entry point for the MenuBar component. Exports the main component
 * and its associated types for external use.
 */

// Export the MenuStrip component
export { default as MenuBar } from "./components/MenuBar";

// Export types using 'export type'
export type { MenuConfig, MenuItems, MenuItemAction, MenuItemDivider, MenuItemSubmenu } from "./components";
