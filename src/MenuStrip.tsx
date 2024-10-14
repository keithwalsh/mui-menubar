import React, { useState, useCallback, memo } from "react";
import { AppBar, Button, Menu, MenuItem, SxProps, Theme, Toolbar, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { KeyboardArrowDown } from "@mui/icons-material";

/**
 * Defines the possible kinds of menu items.
 */
export type MenuItemKind = "action" | "divider";

/**
 * Base interface for menu items.
 * - `kind` is optional and defaults to 'item' if not provided.
 */
export interface MenuItemBaseDefinition {
    kind?: MenuItemKind;
}

/**
 * Interface for regular action menu items.
 * - Extends MenuItemBaseDefinition.
 * - `kind` is either 'action' or undefined.
 * - Includes label, optional action, and optional icon.
 */
export interface MenuItemActionDefinition extends MenuItemBaseDefinition {
    kind?: "action"; // Explicitly 'action' or undefined
    label: string;
    action?: () => void;
    icon?: React.ComponentType<SvgIconProps>;
}

/**
 * Interface for divider menu items.
 * - `kind` is strictly 'divider'.
 */
export interface MenuItemDividerDefinition extends MenuItemBaseDefinition {
    kind: "divider";
}

/**
 * Why Use Separate Interfaces?
 * - Distinct Types: By having separate interfaces for actionable items and dividers, TypeScript can enforce strict type checking, ensuring that each menu item is used correctly based on its type.
 * - Preventing Errors: For example, a divider cannot accidentally be assigned properties like label or action, which are irrelevant to its purpose. TypeScript will flag such mismatches during development.
 */

/**
 * Union type for any menu item configuration.
 */
export type MenuItemDefinitionUnion = MenuItemActionDefinition | MenuItemDividerDefinition;

/**
 * Interface for top-level menu configurations.
 * - Each menu has a label and an array of menu items.
 */
export interface MenuTopLevelDefinition {
    label: string;
    items: MenuItemDefinitionUnion[];
}

interface MenuStripProps {
    config: MenuTopLevelDefinition[];
    darkMode?: boolean;
    sx?: SxProps<Theme>;
}

const MenuStrip: React.FC<MenuStripProps> = ({ config, darkMode = false, sx }) => {
    /**
     * Track only the currently open menu to reduce state complexity and improve performance.
     * https://mui.com/material-ui/api/menu/#:~:text=anchorEl
     */
    const [openMenu, setOpenMenu] = useState<{ index: number; anchorEl: HTMLElement } | null>(null);

    /**
     * Handles the opening of a menu by setting the currently open menu's index and anchor element.
     * @param mouseEvent - The mouse event that triggered the menu opening.
     * @param menuIndex - The index of the menu to open.
     */
    const handleClick = useCallback((mouseEvent: React.MouseEvent<HTMLButtonElement>, menuIndex: number) => {
        setOpenMenu({ index: menuIndex, anchorEl: mouseEvent.currentTarget });
    }, []);

    /**
     * Handles the closing of the currently open menu.
     */
    const handleClose = useCallback(() => {
        setOpenMenu(null);
    }, []);

    /**
     * Handles keyboard interactions for accessibility.
     * @param keyBoardEvent - The keyboard event.
     * @param menuIndex - The index of the menu.
     */
    const handleKeyDown = useCallback((keyBoardEvent: React.KeyboardEvent<HTMLButtonElement>, menuIndex: number) => {
        if (["Enter", " ", "ArrowDown"].includes(keyBoardEvent.key)) {
            keyBoardEvent.preventDefault();
            setOpenMenu({ index: menuIndex, anchorEl: keyBoardEvent.currentTarget });
        }
    }, []);

    /**
     * Type guard to determine if a menu item is a divider.
     * @param menuItem - The menu item to check.
     * @returns True if the item is a divider, false otherwise.
     */
    const isDivider = (menuItem: MenuItemDefinitionUnion): menuItem is MenuItemDividerDefinition => {
        return menuItem.kind === "divider";
    };

    /**
     * Memoized component for rendering individual menu items or dividers.
     * @param menuItem - The menu item to check.
     * @param closeMenu - Function to close the parent menu.
     * @param menuItemIndex - The index of the menu item within its menu.
     * @param menuTopLevelIndex - The index of the parent menu.
     * @returns A JSX element representing the menu item or divider.
     */
    const MenuItemComponent: React.FC<{
        menuItem: MenuItemDefinitionUnion;
        closeMenu: () => void;
        menuItemIndex: number;
        menuTopLevelIndex: number;
    }> = memo(({ menuItem, closeMenu, menuItemIndex, menuTopLevelIndex }) => {
        if (isDivider(menuItem)) {
            return <Divider key={`menu-${menuTopLevelIndex}-divider-${menuItemIndex}`} sx={{ my: 0.5 }} />;
        }

        const menuItemAction = menuItem as MenuItemActionDefinition;

        return (
            <MenuItem
                role="menuitem"
                dense
                onClick={() => {
                    if (menuItemAction.action) menuItemAction.action();
                    closeMenu();
                }}
                key={`menu-${menuTopLevelIndex}-item-${menuItemIndex}`}
            >
                {menuItemAction.icon && (
                    <ListItemIcon sx={{ marginRight: -0.75 }}>
                        <menuItemAction.icon fontSize="small" sx={{ marginLeft: 0 }} />
                    </ListItemIcon>
                )}
                <ListItemText primary={menuItemAction.label} />
            </MenuItem>
        );
    });

    /**
     * Renders a top-level menu with its corresponding items.
     * @param menuTopLevel - The top-level menu to check.
     * @param menuTopLevelIndex - The index of the top-level menu.
     * @returns A JSX fragment containing the menu button and its dropdown.
     */
    const renderMenu = (menuTopLevel: MenuTopLevelDefinition, menuTopLevelIndex: number) => {
        const isOpen = openMenu?.index === menuTopLevelIndex;
        return (
            <React.Fragment key={`menu-${menuTopLevelIndex}-${menuTopLevel.label}`}>
                <Button
                    endIcon={<KeyboardArrowDown sx={{ marginLeft: -0.8 }} />}
                    aria-controls={isOpen ? `menu-${menuTopLevelIndex}` : undefined}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={(event) => handleClick(event, menuTopLevelIndex)}
                    onKeyDown={(event) => handleKeyDown(event, menuTopLevelIndex)}
                    color="inherit"
                    sx={{ textTransform: "none" }}
                >
                    {menuTopLevel.label}
                </Button>
                <Menu
                    id={`menu-${menuTopLevelIndex}`}
                    anchorEl={isOpen ? openMenu.anchorEl : null}
                    keepMounted
                    open={isOpen}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": `menu-button-${menuTopLevelIndex}`,
                        role: "menu",
                    }}
                >
                    {menuTopLevel.items.map((menuItem, menuItemIndex) => (
                        <MenuItemComponent
                            key={`menu-${menuTopLevelIndex}-item-${menuItemIndex}`}
                            menuItem={menuItem}
                            closeMenu={handleClose}
                            menuItemIndex={menuItemIndex}
                            menuTopLevelIndex={menuTopLevelIndex}
                        />
                    ))}
                </Menu>
            </React.Fragment>
        );
    };

    /**
     * Handle cases where the config might be empty.
     */
    if (config.length === 0) {
        return null; // Or render a placeholder if desired
    }

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
                {config.map((menuTopLevel, menuTopLevelIndex) => renderMenu(menuTopLevel, menuTopLevelIndex))}
            </Toolbar>
        </AppBar>
    );
};

export default MenuStrip;
