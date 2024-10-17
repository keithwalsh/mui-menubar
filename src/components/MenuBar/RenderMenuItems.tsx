/**
 * @fileoverview Populates dropdown menu content, recursively rendering nested
 * submenus using RenderNestedMenuItem.
 */

import React, { memo } from "react";
import { MenuItem, Divider, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { MenuBarItem, MenuBarAction, RenderMenuItemsProps } from "./types";
import { isDivider } from "./utils";
import RenderNestedMenuItem from "./RenderNestedMenuItem";

const RenderMenuItems: React.FC<RenderMenuItemsProps> = memo(({ menuItems, handleClose, colorTheme = "light" }) => {
    const renderMenuItem = (menuItem: MenuBarItem, index: number) => {
        if (isDivider(menuItem)) {
            return <Divider key={`divider-${index}`} />;
        }

        if (menuItem.kind === "submenu") {
            return <RenderNestedMenuItem key={`submenu-${index}`} subMenuItem={menuItem} handleClose={handleClose} colorTheme={colorTheme} />;
        }

        const { label, icon: Icon, shortcut, action, disabled } = menuItem as MenuBarAction;

        return (
            <MenuItem
                dense
                key={`item-${index}`}
                onClick={() => {
                    action?.();
                    handleClose();
                }}
                disabled={disabled}
            >
                {Icon && (
                    <ListItemIcon>
                        <Icon fontSize="small" sx={{ mb: 0.2 }} />
                    </ListItemIcon>
                )}
                <ListItemText primary={label} />
                {shortcut && (
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                        {shortcut}
                    </Typography>
                )}
            </MenuItem>
        );
    };

    return <>{menuItems.map(renderMenuItem)}</>;
});

export default RenderMenuItems;
