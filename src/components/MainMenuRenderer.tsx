/**
 * @fileoverview Renders the main menu items for the MenuBar component.
 */

import React from "react";
import { Box } from "@mui/material";
import { MenuConfig, MainMenuRendererProps } from "../types";
import MenuButton from "./MenuButton";


export const MainMenuRenderer: React.FC<MainMenuRendererProps> = ({ menuConfig, disableRipple }) => {
    return (
        <Box data-testid="menu-toolbar">
            {menuConfig.map((menu: MenuConfig) => (
                <MenuButton key={menu.id ?? menu.label} menu={menu} disableRipple={disableRipple} />
            ))}
        </Box>
    );
}; 