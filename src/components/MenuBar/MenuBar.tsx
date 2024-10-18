/**
 * @fileoverview Main component for rendering a customizable menu bar with
 * nested submenus and various item types.
 */

import React, { useState, useCallback, useMemo } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { MenuBarProps, OpenMenuState } from "./types";
import { useMenuHotkeys } from "./utils";
import RenderMenuTopLevel from "./RenderMenuTopLevel";
import { DEFAULT_MENU_CONFIG } from "./defaults";

const MenuBar: React.FC<MenuBarProps> = ({ config = [], colorTheme = "light", color = "transparent", sx, transitionDuration = 0, disableRipple = true }) => {
    /** Sets up keyboard shortcuts. */
    useMenuHotkeys(config);
    /** Tracks the currently open menu and its anchor element. */
    const [openMenu, setOpenMenu] = useState<OpenMenuState | null>(null);

    /** Opens the menu at the specified index when clicked. */
    const handleClick = useCallback(
        (mouseEvent: React.MouseEvent<HTMLButtonElement>, menuIndex: number) => {
            setOpenMenu({ menuIndex: menuIndex, menuAnchor: mouseEvent.currentTarget });
        },
        [setOpenMenu]
    );

    /** Sets openMenu to null, preventing submenus from rendering. */
    const handleClose = useCallback(() => {
        setOpenMenu(null);
    }, [setOpenMenu]);

    /** Prevents default for Enter/Space/ArrowDown, then sets open menu state with current index and target. */
    const handleKeyDown = useCallback(
        (keyBoardEvent: React.KeyboardEvent<HTMLButtonElement>, menuIndex: number) => {
            if (["Enter", " ", "ArrowDown"].includes(keyBoardEvent.key)) {
                keyBoardEvent.preventDefault();
                setOpenMenu({ menuIndex: menuIndex, menuAnchor: keyBoardEvent.currentTarget });
            }
        },
        [setOpenMenu]
    );

    /** Prevents rendering an empty menu bar when no configuration is provided. */
    if (config.length === 0) {
        return null;
    }

    /**
     * Processes the config array to ensure each menu item has a transitionDuration.
     * If not specified, it defaults to 0.
     */
    const processedConfig = useMemo(
        () =>
            config.map((menuItem) => ({
                ...DEFAULT_MENU_CONFIG,
                ...menuItem,
                transitionDuration: transitionDuration ?? 0,
            })),
        [config]
    );

    return (
        <AppBar position="static" elevation={0} color={color} sx={sx}>
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
                        transitionDuration={transitionDuration}
                        disableRipple={disableRipple}
                    />
                ))}
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;
