/**
 * @fileoverview Default configurations for the MenuBar component and its
 * subcomponents.
 */

import { MenuConfig, RenderMenuTopLevelProps, MenuBarProps, RenderMenuItemsProps, RenderNestedMenuItemProps } from "./types";

/** Default values for MenuConfig */
export const DEFAULT_MENU_CONFIG: Required<MenuConfig> = {
    label: "",
    disabled: false,
    selected: false,
    items: [],
};

/** Default values for RenderMenuTopLevel props */
export const DEFAULT_RENDER_MENU_TOP_LEVEL_PROPS: Partial<RenderMenuTopLevelProps> = {
    disableRipple: true,
    transitionDuration: 0,
};

/** Default values for MenuBar props */
export const DEFAULT_MENU_BAR_PROPS: Required<Omit<MenuBarProps, "config" | "sx">> = {
    colorTheme: "light",
    color: "transparent" as const,
    transitionDuration: 0,
    disableRipple: true,
};

/** Default values for RenderMenuItems props */
export const DEFAULT_RENDER_MENU_ITEMS_PROPS: Required<Pick<RenderMenuItemsProps, "colorTheme" | "disableRipple">> = {
    colorTheme: "light",
    disableRipple: true,
};

/** Default values for RenderNestedMenuItem props */
export const DEFAULT_RENDER_NESTED_MENU_ITEM_PROPS: Required<Pick<RenderNestedMenuItemProps, "colorTheme" | "transitionDuration" | "disableRipple">> = {
    colorTheme: "light",
    transitionDuration: 0,
    disableRipple: true,
};
