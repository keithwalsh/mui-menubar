import React, { useState, useCallback, memo } from "react";
import { AppBar, Button, Menu, MenuItem, SxProps, Theme, Toolbar, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";

/**
 * Defines the possible kinds of menu items.
 */
export type MenuItemKind = "action" | "divider" | "submenu";

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
 * Interface for submenu menu items.
 * - `submenu` is strictly 'submenu'.
 */
export interface MenuItemSubmenuDefinition extends MenuItemBaseDefinition {
    kind: "submenu";
    label: string;
    items: MenuItemDefinitionUnion[];
    icon?: React.ComponentType<SvgIconProps>;
}
/**
 * Why Use Separate Interfaces?
 * - Distinct Types: By having separate interfaces for actions, submenus and dividers, TypeScript can enforce strict type checking, ensuring that each menu item is used correctly based on its type.
 * - Preventing Errors: For example, a divider cannot accidentally be assigned properties like label or action, which are irrelevant to its purpose. TypeScript will flag such mismatches during development.
 */

/**
 * Union type for any menu item configuration.
 */
export type MenuItemDefinitionUnion = MenuItemActionDefinition | MenuItemDividerDefinition | MenuItemSubmenuDefinition;

/**
 * Interface for the menu strip configuration.
 */
export interface MenuConfig {
    label: string;
    items: MenuItemDefinitionUnion[];
}

interface MenuStripProps {
    config: MenuConfig[];
    darkMode?: boolean;
    sx?: SxProps<Theme>;
}

/**
 * Type guard to determine if a menu item is a divider.
 * @param menuItem - The menu item to check.
 * @returns True if the item is a divider, false otherwise.
 */
const isDivider = (menuItem: MenuItemDefinitionUnion): menuItem is MenuItemDividerDefinition => {
    return menuItem.kind === "divider";
};

/**
 * Renders menu items, including nested submenus.
 * This component is responsible for rendering different types of menu items (actions, dividers, and submenus)
 * and handling their respective click events.
 *
 * @param menuItems - An array of menu item definitions (actions, dividers, or submenus).
 * @param closeMenu - A function to close the parent menu when an item is clicked.
 * @param darkMode - A boolean indicating whether dark mode is enabled, affecting the styling.
 * @returns A React fragment containing the rendered menu items.
 */
const RenderMenuItems: React.FC<{
    menuItems: MenuItemDefinitionUnion[];
    closeMenu: () => void;
    darkMode: boolean;
}> = memo(({ menuItems, closeMenu, darkMode }) => {
    const renderMenuItem = (menuItem: MenuItemDefinitionUnion, index: number) => {
        if (isDivider(menuItem)) {
            return <Divider key={`divider-${index}`} />;
        }

        if (menuItem.kind === "submenu") {
            return <RenderNestedMenuItem key={`submenu-${index}`} subMenuItem={menuItem} parentCloseMenu={closeMenu} darkMode={darkMode} />;
        }

        const actionItem = menuItem as MenuItemActionDefinition;
        return (
            <MenuItem
                key={`item-${index}`}
                onClick={() => {
                    if (actionItem.action) actionItem.action();
                    closeMenu();
                }}
            >
                {actionItem.icon && (
                    <ListItemIcon>
                        <actionItem.icon fontSize="small" />
                    </ListItemIcon>
                )}
                <ListItemText primary={actionItem.label} />
            </MenuItem>
        );
    };

    return <>{menuItems.map(renderMenuItem)}</>;
});

/**
 * Renders a nested submenu item within a parent menu.
 * @param subMenuItem - The submenu item definition, containing label, icon, and nested menu items.
 * @param parentCloseMenu - A function to close the parent menu when a nested item is clicked.
 * @param darkMode - A boolean indicating whether dark mode is enabled, affecting the styling.
 * @returns A React fragment containing the submenu trigger and its expandable menu items.
 */
const RenderNestedMenuItem: React.FC<{
    subMenuItem: MenuItemSubmenuDefinition;
    parentCloseMenu: () => void;
    darkMode: boolean;
}> = memo(({ subMenuItem, parentCloseMenu, darkMode }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = useCallback(() => {
        handleClose();
        parentCloseMenu();
    }, [parentCloseMenu]);

    return (
        <>
            <MenuItem onClick={handleClick}>
                {subMenuItem.icon && (
                    <ListItemIcon>
                        <subMenuItem.icon fontSize="small" />
                    </ListItemIcon>
                )}
                <ListItemText primary={subMenuItem.label} />
                <KeyboardArrowRight />
            </MenuItem>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <RenderMenuItems menuItems={subMenuItem.items} closeMenu={handleItemClick} darkMode={darkMode} />
            </Menu>
        </>
    );
});

/**
 * Memoized component for rendering individual menu items or dividers.
 * @param config - The menu item to check.
 * @param darkMode - Function to close the parent menu.
 * @param sx - The index of the menu item within its menu.
 * @returns A JSX element representing the menu item or divider.
 */
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
     * Renders a top-level menu with its corresponding items.
     * @param menuTopLevel - The top-level menu configuration.
     * @param menuTopLevelIndex - The index of the top-level menu.
     * @returns A JSX fragment containing the menu button and its dropdown.
     */
    const renderMenuTopLevel = useCallback(
        (menuTopLevel: MenuConfig, menuTopLevelIndex: number) => {
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
                        open={isOpen}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": `menu-button-${menuTopLevelIndex}`,
                            role: "menu",
                        }}
                    >
                        <RenderMenuItems menuItems={menuTopLevel.items} closeMenu={handleClose} darkMode={darkMode} />
                    </Menu>
                </React.Fragment>
            );
        },
        [openMenu, handleClick, handleKeyDown, handleClose, darkMode]
    );

    if (config.length === 0) {
        return null;
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
                {config.map(renderMenuTopLevel)}
            </Toolbar>
        </AppBar>
    );
};

export default MenuStrip;
