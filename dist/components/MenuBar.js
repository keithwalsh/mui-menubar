import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @fileoverview Implements the main MenuBar component, rendering a customizable
 * menu bar using Material-UI components and popup state management.
 */
import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { usePopupState, bindTrigger, bindPopover } from "material-ui-popup-state/hooks";
import CascadingMenu from "./CascadingMenu";
import { DEFAULT_MENU_BAR_PROPS, DEFAULT_MENU_CONFIG } from "../defaults";
import { useMenuHotkeys } from "../utils";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export const MenuBar = ({ config = DEFAULT_MENU_CONFIG, colorTheme = DEFAULT_MENU_BAR_PROPS.colorTheme, color = DEFAULT_MENU_BAR_PROPS.color, sx, disableRipple = DEFAULT_MENU_BAR_PROPS.disableRipple, transitionDuration = DEFAULT_MENU_BAR_PROPS.transitionDuration, }) => {
    const menuConfig = Array.isArray(config) ? config : [config];
    // Set up hotkeys for the menu items
    useMenuHotkeys(menuConfig);
    if (menuConfig.length === 0) {
        return (_jsx(AppBar, { position: "static", elevation: 0, color: color, sx: sx, children: _jsx(Toolbar, { variant: "dense", disableGutters: true }) }));
    }
    return (_jsx(AppBar, { position: "static", elevation: 0, color: color, sx: Object.assign({ px: 0, minHeight: 0, '& .MuiToolbar-root': {
                minHeight: 0
            } }, sx), children: _jsx(Toolbar, { variant: "dense", disableGutters: true, children: menuConfig.map((menu, index) => {
                const popupState = usePopupState({
                    variant: "popover",
                    popupId: `menu-${index}`,
                });
                return (_jsxs(React.Fragment, { children: [_jsx(Button, Object.assign({}, bindTrigger(popupState), { color: "inherit", sx: {
                                textTransform: "none",
                                backgroundColor: popupState.isOpen ? 'action.selected' : 'transparent',
                                '&:hover': {
                                    backgroundColor: popupState.isOpen ? 'action.selected' : 'action.hover',
                                },
                                '& .MuiButton-endIcon': {
                                    marginLeft: '2px'
                                },
                                px: 1,
                                py: 0.25
                            }, disabled: menu.disabled, disableRipple: disableRipple, endIcon: _jsx(KeyboardArrowDownIcon, {}), children: menu.label })), _jsx(CascadingMenu, Object.assign({}, bindPopover(popupState), { menuItems: menu.items, popupState: popupState, colorTheme: colorTheme, disableRipple: disableRipple, transitionDuration: transitionDuration, useHover: true }))] }, index));
            }) }) }));
};
export default MenuBar;
