/**
 * @fileoverview Implements the main MenuBar component, rendering a customizable
 * menu bar using Material-UI components and popup state management.
 */

import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { usePopupState, bindHover, bindTrigger } from "material-ui-popup-state/hooks";
import CascadingMenu from "./CascadingMenu";
import { MenuBarProps, MenuConfig } from "../types";
import { DEFAULT_MENU_BAR_PROPS, DEFAULT_MENU_CONFIG } from "../defaults";
import { useMenuHotkeys } from "../utils";

export const MenuBar: React.FC<MenuBarProps> = ({
    config = DEFAULT_MENU_CONFIG,
    colorTheme = DEFAULT_MENU_BAR_PROPS.colorTheme,
    color = DEFAULT_MENU_BAR_PROPS.color,
    sx,
    disableRipple = DEFAULT_MENU_BAR_PROPS.disableRipple,
    transitionDuration = DEFAULT_MENU_BAR_PROPS.transitionDuration,
}) => {
    const useHover = true;
    const menuConfig = Array.isArray(config) ? config : [config];

    // Set up hotkeys for the menu items
    useMenuHotkeys(menuConfig);

    if (menuConfig.length === 0) {
        return (
            <AppBar position="static" elevation={0} color={color} sx={sx}>
                <Toolbar variant="dense" disableGutters={true} />
            </AppBar>
        );
    }

    return (
        <AppBar position="static" elevation={0} color={color} sx={sx}>
            <Toolbar variant="dense" disableGutters={true}>
                {menuConfig.map((menu: MenuConfig, index: number) => {
                    const popupState = usePopupState({
                        variant: "popover",
                        popupId: `menu-${index}`,
                    });

                    const bindMenu = useHover ? bindHover : bindTrigger;

                    return (
                        <React.Fragment key={index}>
                            <Button
                                {...bindMenu(popupState)}
                                onClick={() => {
                                    if (!useHover) {
                                        popupState.toggle();
                                    }
                                }}
                                color="inherit"
                                sx={{ textTransform: "none" }}
                                disabled={menu.disabled}
                                disableRipple={disableRipple}
                            >
                                {menu.label}
                            </Button>
                            <CascadingMenu
                                menuItems={menu.items}
                                popupState={popupState}
                                colorTheme={colorTheme}
                                disableRipple={disableRipple}
                                transitionDuration={transitionDuration}
                            />
                        </React.Fragment>
                    );
                })}
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;
