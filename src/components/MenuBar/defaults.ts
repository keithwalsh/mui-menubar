/**
 * @fileoverview Default configurations for the MenuBar component and its
 * subcomponents.
 */

import { MenuConfig, RenderMenuTopLevelProps } from "./types";

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
