/**
 * @fileoverview Exports the MenuBar component, which renders a configurable
 * menu bar using Material-UI components. Handles state management for menu
 * interactions and integrates with keyboard navigation utilities.
 */

import React, { useState, useCallback } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { MenuBarProps } from "./types";
import RenderMenuTopLevel from "./RenderMenuTopLevel";
import { useMenuHotkeys } from "./utils";

const MenuBar: React.FC<MenuBarProps> = ({ config = [], colorTheme = "light", color = "transparent", sx }) => {
    /** Sets up keyboard shortcuts. */
    useMenuHotkeys(config);
    /** Tracks the currently open menu and its anchor element. */
    const [openMenu, setOpenMenu] = useState<{ menuIndex: number; menuAnchor: HTMLElement } | null>(null);

    /** Opens the menu at the specified index when clicked. */
    const handleClick = useCallback((mouseEvent: React.MouseEvent<HTMLButtonElement>, menuIndex: number) => {
        setOpenMenu({ menuIndex: menuIndex, menuAnchor: mouseEvent.currentTarget });
    }, []);

    /** Sets openMenu to null, preventing submenus from rendering. */
    const handleClose = useCallback(() => {
        setOpenMenu(null);
    }, []);

    /** Prevents default for Enter/Space/ArrowDown, then sets open menu state with current index and target. */
    const handleKeyDown = useCallback((keyBoardEvent: React.KeyboardEvent<HTMLButtonElement>, menuIndex: number) => {
        if (["Enter", " ", "ArrowDown"].includes(keyBoardEvent.key)) {
            keyBoardEvent.preventDefault();
            setOpenMenu({ menuIndex: menuIndex, menuAnchor: keyBoardEvent.currentTarget });
        }
    }, []);

    /** Prevents rendering an empty menu bar when no configuration is provided. */
    if (config.length === 0) {
        return null;
    }

    /**
     * Processes the config array to ensure each menu item has a transitionDuration.
     * If not specified, it defaults to 0.
     */
    const processedConfig = config.map((menuItem) => ({
        ...menuItem,
        transitionDuration: menuItem.transitionDuration ?? 0,
    }));

    return (
        <AppBar position="static" elevation={0} color={color}>
            <Toolbar variant="dense" disableGutters={true}>
                {processedConfig.map((menuTopLevel, index) => (
                    <RenderMenuTopLevel
                        key={`menu-${index}-${menuTopLevel.label}`}
                        menuTopLevel={menuTopLevel}
                        menuTopLevelIndex={index}
                        openMenu={openMenu}
                        handleClick={handleClick}
                        handleKeyDown={handleKeyDown}
                        handleClose={handleClose}
                        colorTheme={colorTheme}
                    />
                ))}
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;
