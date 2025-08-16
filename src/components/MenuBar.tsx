/**
 * @fileoverview Implements the main MenuBar component, rendering a customizable
 * menu bar using Material-UI components and popup state management.
 */

import React from "react";
import { AppBar, Toolbar, Divider } from "@mui/material";
import { MenuBarProps } from "../types";
import { useMenuHotkeys } from "../utils";
import { MainMenuRenderer } from "./MainMenuRenderer";

export const MenuBar: React.FC<MenuBarProps> = ({ config, color = "transparent", sx, disableRipple }) => {
    const menuConfig = config;

    // Set up hotkeys for the menu items
    useMenuHotkeys(menuConfig);

    if (menuConfig.length === 0) {
        return (
            <AppBar position="static" elevation={0} color={color} sx={sx}>
                <Toolbar variant="dense" disableGutters={true} role="toolbar" />
            </AppBar>
        );
    }

    return (
        <AppBar
            position="static"
            elevation={0}
            data-testid="menu-bar-root"
            color={color}
            sx={{
                px: 0,
                minHeight: 0,
                ...sx,
            }}
        >
            <Toolbar variant="dense" disableGutters={true} sx={{ px: 0 }}>
                <MainMenuRenderer menuConfig={menuConfig} disableRipple={disableRipple} />
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;
