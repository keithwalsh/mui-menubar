/**
 * @fileoverview Renders cascading menus with hover functionality using material-ui-popup-state.
 */

import React, { useContext, useMemo } from "react";
import HoverMenuImport from "material-ui-popup-state/HoverMenu";
import { MenuItems, MenuItemSubmenu, CascadingMenuProps, CascadingContextType, TransitionDuration } from "../types";
import { MenuItem, Divider, ListItemText, ListItemIcon, MenuList, Typography, Box, ClickAwayListener, Popover } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { usePopupState, bindHover, bindFocus, bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import { SxProps, Theme } from "@mui/material/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import { SubmenuRenderer } from "./SubmenuRenderer";

// Cast HoverMenu to any to bypass type checking
const HoverMenu = HoverMenuImport as any;

const iconSx: SxProps<Theme> = { mb: 0.2, fontSize: "small" };

export const CascadingContext = React.createContext<CascadingContextType>({
    parentPopupState: null,
    rootPopupState: null,
});

// Helper function to render ListItemIcon
export function renderListItemIcon(icon: React.ReactNode, sx?: SxProps<Theme>) {
    return (
        <ListItemIcon sx={sx}>
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<SvgIconProps>, { sx: iconSx }) : icon}
        </ListItemIcon>
    )
}

export const CascadingMenuItem: React.FC<MenuItems & { disableRipple?: boolean }> = ({ disableRipple, ...item }) => {
    const { rootPopupState, parentPopupState } = useContext(CascadingContext);
    if (!rootPopupState) throw new Error("must be used inside a CascadingMenu");
    if (!parentPopupState) throw new Error("must have a parent popup state for submenu");

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLLIElement>) => {
            if (item.kind === "custom") return; // Don't close menu for custom components
            rootPopupState.close(event);
            if (item.kind === "action") item.action();
        },
        [rootPopupState, item]
    );

    if (item.kind === "divider") {
        return <Divider />;
    }

    if (item.kind === "custom") {
        return (
            <MenuItem 
                disableRipple={disableRipple}
                sx={{ 
                    '&:hover': { 
                        backgroundColor: 'transparent' 
                    } 
                }}
            >
                <Box sx={{ minWidth: 200 }}>{item.component}</Box>
            </MenuItem>
        );
    }

    if (item.kind === "action") {
        return (
            <MenuItem 
                onClick={handleClick} 
                disabled={item.disabled} 
                selected={item.selected}
                disableRipple={disableRipple}
            >
                {item.icon && renderListItemIcon(item.icon)}
                <ListItemText>{item.label}</ListItemText>
                {item.shortcut && (
                    <Typography variant="body2" sx={{ ml: 4, color: "text.secondary" }}>
                        {item.shortcut}
                    </Typography>
                )}
            </MenuItem>
        );
    }

    // Must be submenu at this point
    if (item.kind === "submenu") {
        return <SubmenuRenderer 
            item={item} 
            disableRipple={disableRipple} 
            parentPopupState={parentPopupState}
        />;
    }

    return null; // TypeScript exhaustiveness check
};

const CascadingSubmenu: React.FC<
    MenuItemSubmenu & {
        popupId: string;
        disableRipple?: boolean;
        disablePadding?: boolean;
        useHover?: boolean;
    }
> = ({ label, items, icon, popupId, disableRipple, useHover = true }) => {
    const { parentPopupState } = useContext(CascadingContext);
    const popupState = usePopupState({
        popupId,
        variant: "popover",
        parentPopupState,
    });

    // Use bindHover if useHover is true, otherwise use bindTrigger
    const bindMenuProps = useHover ? bindHover : bindTrigger;

    return (
        <React.Fragment>
            <MenuList dense sx={{ px: 0, py: 0.5 }}>
                <MenuItem 
                    {...bindMenuProps(popupState)} 
                    {...bindFocus(popupState)}
                    disableRipple={disableRipple}
                >
                    {icon && renderListItemIcon(icon, { mr: -4.5 })}
                    <ListItemText inset sx={{ px: 0 }}>
                        {label}
                    </ListItemText>
                    <ChevronRight sx={{ ml: 4 }} />
                </MenuItem>
            </MenuList>
            <CascadingMenu
                menuItems={items}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                popupState={popupState}
                disableRipple={disableRipple}
                isSubmenu={true}
                useHover={useHover}
            />
        </React.Fragment>
    );
};

// Create a styled version of Menu with custom styles
const StyledMenu = styled(HoverMenu)(() => ({
    "& .MuiList-padding": {
        paddingTop: 1,
        paddingBottom: 1,
    },
}));

export const CascadingMenu: React.FC<CascadingMenuProps> = ({ 
    menuItems, 
    popupState, 
    disableRipple, 
    isSubmenu = false,
    useHover = true,
    PopoverProps = {},
    ...props 
}) => {
    const { rootPopupState } = useContext(CascadingContext)
    const context = useMemo(
        () => ({
            rootPopupState: rootPopupState || popupState,
            parentPopupState: popupState,
        }),
        [rootPopupState, popupState]
    )

    const paperSx: SxProps<Theme> = useMemo(
        () => ({
            backgroundColor: "background.paper",
            "& .MuiPaper-root": {
                backgroundColor: "background.paper",
            },
            ...PopoverProps?.PaperProps?.sx
        }),
        [PopoverProps?.PaperProps?.sx]
    )

    const handleClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            popupState.close()
        }
    }

    const menuContent = (
        <CascadingContext.Provider value={context}>
            <MenuList dense>
                {menuItems.map((item: MenuItems, index: number) =>
                    item.kind === "submenu" ? (
                        <CascadingSubmenu
                            disablePadding
                            key={`submenu-${index}`}
                            {...item}
                            popupId={`submenu-${index}`}
                            disableRipple={disableRipple}
                            useHover={useHover}
                        />
                    ) : (
                        <CascadingMenuItem 
                            key={`item-${index}`} 
                            {...item} 
                            disableRipple={disableRipple}
                        />
                    )
                )}
            </MenuList>
        </CascadingContext.Provider>
    )

    return isSubmenu ? (
        <StyledMenu
            {...props}
            {...bindMenu(popupState)}
            PaperProps={{
                ...PopoverProps?.PaperProps,
                sx: paperSx,
                component: MenuItem,
            }}
            TransitionProps={{
                ...props.TransitionProps,
                timeout: 0
            }}
        >
            {menuContent}
        </StyledMenu>
    ) : (
        <Popover
            {...props}
            {...PopoverProps}
            open={popupState.isOpen}
            anchorEl={popupState.anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                ...PopoverProps?.anchorOrigin
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                ...PopoverProps?.transformOrigin
            }}
            PaperProps={{
                ...PopoverProps?.PaperProps,
                sx: paperSx
            }}
            TransitionProps={{
                timeout: 0,
                ...PopoverProps?.TransitionProps
            }}
        >
            {menuContent}
        </Popover>
    )
}

export default CascadingMenu;