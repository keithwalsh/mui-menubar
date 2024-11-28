import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @fileoverview Implements the main MenuBar component, rendering a customizable
 * menu bar using Material-UI components and popup state management.
 */
import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { usePopupState, bindHover, bindTrigger } from "material-ui-popup-state/hooks";
import CascadingMenu from "./CascadingMenu";
import { DEFAULT_MENU_BAR_PROPS, DEFAULT_MENU_CONFIG } from "./defaults";
import { useMenuHotkeys } from "./utils";
export const MenuBar = ({ config = DEFAULT_MENU_CONFIG, colorTheme = DEFAULT_MENU_BAR_PROPS.colorTheme, color = DEFAULT_MENU_BAR_PROPS.color, sx, disableRipple = DEFAULT_MENU_BAR_PROPS.disableRipple, transitionDuration = DEFAULT_MENU_BAR_PROPS.transitionDuration, }) => {
    const useHover = true;
    const menuConfig = Array.isArray(config) ? config : [config];
    // Set up hotkeys for the menu items
    useMenuHotkeys(menuConfig);
    if (menuConfig.length === 0) {
        return (_jsx(AppBar, { position: "static", elevation: 0, color: color, sx: sx, children: _jsx(Toolbar, { variant: "dense", disableGutters: true }) }));
    }
    return (_jsx(AppBar, { position: "static", elevation: 0, color: color, sx: sx, children: _jsx(Toolbar, { variant: "dense", disableGutters: true, children: menuConfig.map((menu, index) => {
                const popupState = usePopupState({
                    variant: "popover",
                    popupId: `menu-${index}`,
                });
                const bindMenu = useHover ? bindHover : bindTrigger;
                return (_jsxs(React.Fragment, { children: [_jsx(Button, Object.assign({}, bindMenu(popupState), { onClick: () => {
                                if (!useHover) {
                                    popupState.toggle();
                                }
                            }, color: "inherit", sx: { textTransform: "none" }, disabled: menu.disabled, disableRipple: disableRipple, children: menu.label })), _jsx(CascadingMenu, { menuItems: menu.items, popupState: popupState, colorTheme: colorTheme, disableRipple: disableRipple, transitionDuration: transitionDuration })] }, index));
            }) }) }));
};
export default MenuBar;
