import React, { useState } from "react";
import { AppBar, Button, Menu, MenuItem, SxProps, Theme, Toolbar, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { KeyboardArrowDown } from "@mui/icons-material";

/**
 * Defines the possible kinds of menu items.
 */
export type MenuItemKind = "item" | "divider";

/**
 * Base interface for menu items.
 * - `kind` is optional and defaults to 'item' if not provided.
 */
export interface BaseMenuItemConfig {
    kind?: MenuItemKind;
}

/**
 * Interface for regular action menu items.
 * - Extends BaseMenuItemConfig.
 * - `kind` is either 'item' or undefined.
 * - Includes label, optional action, and optional icon.
 */
export interface MenuItemActionConfig extends BaseMenuItemConfig {
    kind?: "item"; // Explicitly 'item' or undefined
    label: string;
    action?: () => void;
    icon?: React.ComponentType<SvgIconProps>; // Updated type
}

/**
 * Interface for divider menu items.
 * - `kind` is strictly 'divider'.
 */
export interface DividerMenuItemConfig extends BaseMenuItemConfig {
    kind: "divider";
}

/**
 * Union type for any menu item configuration.
 */
export type MenuItemConfig = MenuItemActionConfig | DividerMenuItemConfig;

/**
 * Interface for top-level menu configurations.
 * - Each menu has a label and an array of menu items.
 */
export interface MenuConfig {
    label: string;
    items: MenuItemConfig[];
}

interface MenuStripProps {
    menuConfig: MenuConfig[];
    darkMode?: boolean;
    sx?: SxProps<Theme>;
}

const MenuStrip: React.FC<MenuStripProps> = ({ menuConfig, darkMode = false, sx }) => {
    // Initialize anchor elements for each top-level menu
    const [anchorEls, setAnchorEls] = useState<(HTMLElement | null)[]>(new Array(menuConfig.length).fill(null));

    /**
     * Handles the opening of a menu by setting the corresponding anchor element.
     * @param event - The mouse event that triggered the menu opening.
     * @param index - The index of the menu to open.
     */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[index] = event.currentTarget;
        setAnchorEls(newAnchorEls);
    };

    /**
     * Handles the closing of a menu by clearing the corresponding anchor element.
     * @param index - The index of the menu to close.
     */
    const handleClose = (index: number) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[index] = null;
        setAnchorEls(newAnchorEls);
    };

    /**
     * Handles keyboard interactions for accessibility.
     * @param event - The keyboard event.
     * @param index - The index of the menu.
     */
    const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick(event as unknown as React.MouseEvent<HTMLButtonElement>, index);
        }
    };

    /**
     * Type guard to determine if a menu item is a divider.
     * @param item - The menu item to check.
     * @returns True if the item is a divider, false otherwise.
     */
    const isDivider = (item: MenuItemConfig): item is DividerMenuItemConfig => {
        return item.kind === "divider";
    };

    /**
     * Renders a single menu item or a divider based on its configuration.
     * @param item - The menu item configuration.
     * @param closeMenu - Function to close the parent menu.
     * @param itemIndex - The index of the menu item within its menu.
     * @param menuIndex - The index of the parent menu.
     * @returns A JSX element representing the menu item or divider.
     */
    const renderMenuItem = (item: MenuItemConfig, closeMenu: () => void, itemIndex: number, menuIndex: number) => {
        if (isDivider(item)) {
            return <Divider key={`menu-${menuIndex}-divider-${itemIndex}`} sx={{ my: 0.5 }} />;
        }

        // TypeScript now knows item is MenuItemActionConfig
        const actionItem = item as MenuItemActionConfig;

        return (
            <MenuItem
                dense
                onClick={() => {
                    if (actionItem.action) actionItem.action();
                    closeMenu();
                }}
                key={`menu-${menuIndex}-item-${itemIndex}`}
            >
                {actionItem.icon && (
                    <ListItemIcon sx={{ marginRight: -0.75 }}>
                        <actionItem.icon fontSize="small" sx={{ marginLeft: 0 }} />
                    </ListItemIcon>
                )}
                <ListItemText primary={actionItem.label} />
            </MenuItem>
        );
    };

    /**
     * Renders a top-level menu with its corresponding items.
     * @param menu - The top-level menu configuration.
     * @param index - The index of the top-level menu.
     * @returns A JSX fragment containing the menu button and its dropdown.
     */
    const renderMenu = (menu: MenuConfig, index: number) => (
        <React.Fragment key={`menu-${index}-${menu.label}`}>
            <Button
                endIcon={<KeyboardArrowDown sx={{ marginLeft: -0.8 }} />}
                aria-controls={`menu-${index}`}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEls[index])}
                onClick={(e) => handleClick(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                color="inherit"
                sx={{ textTransform: "none" }}
            >
                {menu.label}
            </Button>
            <Menu
                id={`menu-${index}`}
                anchorEl={anchorEls[index]}
                keepMounted
                open={Boolean(anchorEls[index])}
                onClose={() => handleClose(index)}
                MenuListProps={{
                    "aria-labelledby": `menu-button-${index}`,
                }}
            >
                {menu.items.map((item, itemIndex) => renderMenuItem(item, () => handleClose(index), itemIndex, index))}
            </Menu>
        </React.Fragment>
    );

    return (
        <AppBar
            position="static"
            sx={{
                ...sx,
                backgroundColor: "transparent",
            }}
            style={{
                color: darkMode ? "rgb(255, 255, 255)" : "rgba(0, 0, 0, 0.87)",
            }}
            elevation={0}
        >
            <Toolbar
                sx={{
                    padding: 0,
                    "&.MuiToolbar-root": {
                        minHeight: 0,
                        padding: 0,
                    },
                }}
            >
                {menuConfig.map((menu, index) => renderMenu(menu, index))}
            </Toolbar>
        </AppBar>
    );
};

export default MenuStrip;
