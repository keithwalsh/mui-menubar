/**
 * @fileoverview Implements the main MenuBar component, rendering a customizable
 * menu bar using Material-UI components and popup state management.
 */

import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { usePopupState, bindTrigger, bindPopover } from "material-ui-popup-state/hooks";
import CascadingMenu from "./CascadingMenu";
import { MenuBarProps, MenuConfig } from "../types";
import { DEFAULT_MENU_BAR_PROPS, DEFAULT_MENU_CONFIG } from "../defaults";
import { useMenuHotkeys } from "../utils";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export const MenuBar: React.FC<MenuBarProps> = ({
    config = DEFAULT_MENU_CONFIG,
    colorTheme = DEFAULT_MENU_BAR_PROPS.colorTheme,
    color = DEFAULT_MENU_BAR_PROPS.color,
    sx,
    disableRipple = DEFAULT_MENU_BAR_PROPS.disableRipple,
    transitionDuration = DEFAULT_MENU_BAR_PROPS.transitionDuration,
}) => {
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
                        variant: "popover" as const,
                        popupId: `menu-${index}`,
                    });

                    return (
                        <React.Fragment key={index}>
                            <Button
                                {...bindTrigger(popupState)}
                                color="inherit"
                                sx={{
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
                                }}
                                disabled={menu.disabled}
                                disableRipple={disableRipple}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                {menu.label}
                            </Button>
                            <CascadingMenu
                                {...bindPopover(popupState)}
                                menuItems={menu.items}
                                popupState={popupState}
                                colorTheme={colorTheme}
                                disableRipple={disableRipple}
                                transitionDuration={transitionDuration}
                                useHover={true}
                            />
                        </React.Fragment>
                    );
                })}
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;
