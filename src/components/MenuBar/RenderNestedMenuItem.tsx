/**
 * @fileoverview Renders a nested menu item with submenu functionality for the
 * RenderMenuItems component. Handles mouse interactions and submenu rendering.
 */

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { RenderNestedMenuItemProps } from "./types";
import RenderMenuItems from "./RenderMenuItems";

const RenderNestedMenuItem: React.FC<RenderNestedMenuItemProps> = memo(({ subMenuItem, handleClose, colorTheme = "light" }) => {
    /** Stores the reference to the anchor element for the submenu */
    const [anchorRef, setAnchorRef] = useState<null | HTMLElement>(null);
    /** Tracks whether the submenu is currently open */
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    /** useRef to hold reference to a MenuItem's DOM element */
    const menuItemRef = useRef<HTMLLIElement>(null);

    /** Opens the submenu when the mouse enters the menu item. */
    const handleMouseEnter = useCallback(() => {
        setIsSubMenuOpen(true);
    }, []);

    /** Closes the submenu when the mouse leaves the menu item. */
    const handleMouseLeave = useCallback(() => {
        setIsSubMenuOpen(false);
    }, []);

    /**
     * Updates the anchor reference for the submenu based on the open state.
     * When the submenu is open and the menu item ref is available, it sets
     * the anchor ref to the current menu item. Otherwise, it clears the anchor ref.
     */
    useEffect(() => {
        if (isSubMenuOpen && menuItemRef.current) {
            setAnchorRef(menuItemRef.current);
        } else {
            setAnchorRef(null);
        }
    }, [isSubMenuOpen]);

    /**
     * Handles the click event on a submenu item.
     * Closes the submenu and triggers the parent menu's close handler.
     */
    const handleItemClick = useCallback(() => {
        setIsSubMenuOpen(false);
        handleClose();
    }, [handleClose]);

    return (
        <>
            <MenuItem ref={menuItemRef} dense onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {subMenuItem.icon && (
                    <ListItemIcon>
                        <subMenuItem.icon fontSize="small" />
                    </ListItemIcon>
                )}
                <ListItemText primary={subMenuItem.label} />
                <KeyboardArrowRight fontSize="small" sx={{ paddingLeft: 3, marginRight: -1 }} />
            </MenuItem>
            <Menu
                anchorEl={anchorRef}
                open={isSubMenuOpen}
                onClose={() => setIsSubMenuOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                MenuListProps={{
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: handleMouseLeave,
                }}
                disableAutoFocus
                disableEnforceFocus
                sx={{
                    pointerEvents: "none",
                }}
            >
                <div style={{ pointerEvents: "auto" }}>
                    <RenderMenuItems menuItems={subMenuItem.items} handleClose={handleItemClick} colorTheme={colorTheme} />
                </div>
            </Menu>
        </>
    );
});

export default RenderNestedMenuItem;