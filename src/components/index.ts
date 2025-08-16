/**
 * @fileoverview Entry point for the MenuBar component. Exports the default
 * MenuBar component and associated types for easy importing and usage.
 */

export { default } from "./MenuBar";
export * from "../types";

// Export the new specialized menu components
export { RootMenu } from "./RootMenu";
export { SubMenu } from "./SubMenu";
export { CascadingSubmenu } from "./CascadingSubmenu";

// Export backward compatibility component
export { CascadingMenu } from "./CascadingMenu";
export { CascadingMenuItem } from "./CascadingMenuItem";