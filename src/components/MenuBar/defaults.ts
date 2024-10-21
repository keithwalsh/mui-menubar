/**
 * @fileoverview Default configurations for the MenuBar component and its
 * subcomponents.
 */

import { MenuConfig, MenuBarProps } from "./types";

/** Default values for MenuConfig */
export const DEFAULT_MENU_CONFIG: Required<MenuConfig> = {
    label: "",
    disabled: false,
    items: [],
};

/** Default values for MenuBar props */
export const DEFAULT_MENU_BAR_PROPS: Required<Omit<MenuBarProps, "config" | "sx">> = {
    colorTheme: "light",
    color: "transparent" as const,
    transitionDuration: 0,
    disableRipple: true,
};
