/**
 * @fileoverview Renders the main menu items for the MenuBar component. Wraps
 * children in MenuButtonGroup so that MenuButton props are minimised.
 */

import React from "react";
import { Box, dividerClasses } from "@mui/material";
import { MenuConfig, MainMenuRendererProps } from "../types";
import MenuButton from "./MenuButton";
import { MenuButtonGroup } from "./MenuButtonGroup";


export const MainMenuRenderer: React.FC<MainMenuRendererProps> = ({ menuConfig, disableRipple }) => {
    return (
        <MenuButtonGroup>
            <Box 
                data-testid="menu-toolbar"
                sx={{ display: 'flex' }}
            >
                {menuConfig.map((menu: MenuConfig) => {
                    const key = menu.id ?? menu.label;
                    return (
                        <MenuButton
                            key={key}
                            menu={menu}
                            disableRipple={disableRipple}
                        />
                    );
                })}
            </Box>
        </MenuButtonGroup>
    );
};