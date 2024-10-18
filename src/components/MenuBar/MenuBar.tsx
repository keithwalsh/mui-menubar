/**
 * @fileoverview Main component for rendering a customizable menu bar with
 * nested submenus and various item types.
 */

import React, { useState, useCallback, useMemo } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { MenuBarProps, OpenMenuState } from "./types";
import { useMenuHotkeys } from "./utils";
import RenderMenuTopLevel from "./RenderMenuTopLevel";
import { DEFAULT_MENU_CONFIG, DEFAULT_MENU_BAR_PROPS } from "./defaults";

const MenuBar: React.FC<MenuBarProps> = ({
    config = [],
    colorTheme = DEFAULT_MENU_BAR_PROPS.colorTheme,
    color = DEFAULT_MENU_BAR_PROPS.color,
    sx,
    transitionDuration = DEFAULT_MENU_BAR_PROPS.transitionDuration,
    disableRipple = DEFAULT_MENU_BAR_PROPS.disableRipple,
}) => {
    // Sets up keyboard shortcuts.
    useMenuHotkeys(config);
    // Tracks the currently open menu and its anchor element.
    const [openMenu, setOpenMenu] = useState<OpenMenuState | null>(null);

    // Opens the menu at the specified index when clicked.
    const handleClick = useCallback(
        (mouseEvent: React.MouseEvent<HTMLButtonElement>, menuIndex: number) => {
            setOpenMenu({ menuIndex: menuIndex, menuAnchor: mouseEvent.currentTarget });
        },
        [setOpenMenu]
    );

    // Closes the open menu. Sets openMenu to null, preventing submenus from rendering.
    const handleClose = useCallback(() => {
        setOpenMenu(null);
    }, [setOpenMenu]);

    // Handles keyboard events for opening the menu.
    const handleKeyDown = useCallback(
        (keyBoardEvent: React.KeyboardEvent<HTMLButtonElement>, menuIndex: number) => {
            if (["Enter", " ", "ArrowDown"].includes(keyBoardEvent.key)) {
                keyBoardEvent.preventDefault();
                setOpenMenu({ menuIndex: menuIndex, menuAnchor: keyBoardEvent.currentTarget });
            }
        },
        [setOpenMenu]
    );

    // If no config is provided, the menu bar will be rendered with a transparent color and no elevation.
    if (config.length === 0) {
        return (
            <AppBar position="static" elevation={0} color={color} sx={sx}>
                <Toolbar variant="dense" disableGutters={true} />
            </AppBar>
        );
    }

    // Memoize processed config with default values for each menu item
    const processedConfig = useMemo(
        () =>
            config.map((menuItem) => ({
                ...DEFAULT_MENU_CONFIG,
                ...menuItem,
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
