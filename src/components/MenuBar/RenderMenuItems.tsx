/**
 * @fileoverview Populates dropdown menu content, recursively rendering nested
 * submenus using RenderNestedMenuItem.
 */

import React, { memo } from "react";
import { MenuItem, Divider, ListItemIcon, ListItemText, Typography, SxProps, Theme } from "@mui/material";
import { MenuBarItem, MenuBarAction, MenuBarSubmenu, MenuBarComponent } from "./types";
import { isDivider } from "./utils";
import RenderNestedMenuItem from "./RenderNestedMenuItem";
import { DEFAULT_RENDER_MENU_ITEMS_PROPS } from "./defaults";

interface RenderMenuItemsProps {
    menuItems: MenuBarItem[];
    handleClose: () => void;
    colorTheme?: string;
    disableRipple?: boolean;
}

const RenderMenuItems: React.FC<RenderMenuItemsProps> = memo(
    ({ menuItems, handleClose, colorTheme = DEFAULT_RENDER_MENU_ITEMS_PROPS.colorTheme, disableRipple = DEFAULT_RENDER_MENU_ITEMS_PROPS.disableRipple }) => {
        const renderMenuItem = (menuItem: MenuBarItem, index: number) => {
            if (isDivider(menuItem)) {
                return <Divider key={`divider-${index}`} />;
            }

            if (menuItem.kind === "submenu") {
                return renderSubmenuItem(menuItem, index);
            }

            if (menuItem.kind === "component") {
                return renderComponentItem(menuItem, index);
            }

            return renderActionItem(menuItem, index);
        };

        const renderSubmenuItem = (menuItem: MenuBarSubmenu, index: number) => (
            <RenderNestedMenuItem
                key={`submenu-${index}`}
                subMenuItem={menuItem}
                handleClose={handleClose}
                colorTheme={colorTheme}
                disableRipple={disableRipple}
            />
        );

        const renderComponentItem = (menuItem: MenuBarComponent, index: number) => (
            <MenuItem key={`component-${index}`} dense disabled={menuItem.disabled}>
                {menuItem.component}
            </MenuItem>
        );

        const renderActionItem = (menuItem: MenuBarAction, index: number) => {
            const { label, icon, shortcut, onClick, disabled } = menuItem;
            const iconSx: SxProps<Theme> = { mb: 0.2, fontSize: "small" };

            return (
                <MenuItem
                    dense
                    key={`item-${index}`}
                    onClick={() => {
                        onClick?.();
                        handleClose();
                    }}
                    disabled={disabled}
                    disableRipple={disableRipple}
                >
                    {renderIcon(icon, iconSx)}
                    <ListItemText primary={label} />
                    {renderShortcut(shortcut)}
                </MenuItem>
            );
        };

        const renderIcon = (icon: React.ReactNode, iconSx: SxProps<Theme>) => {
            if (!icon) return null;
            return (
                <ListItemIcon>
                    {React.isValidElement(icon) ? (
                        React.cloneElement(icon as React.ReactElement<{ sx?: SxProps<Theme> }>, { sx: iconSx })
                    ) : (
                        <span style={{ marginBottom: 2 }}>{icon}</span>
                    )}
                </ListItemIcon>
            );
        };

        const renderShortcut = (shortcut: string | undefined) => {
            if (!shortcut) return null;
            return (
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                    {shortcut}
                </Typography>
            );
        };

        return <>{menuItems.map(renderMenuItem)}</>;
    }
);

export default RenderMenuItems;
