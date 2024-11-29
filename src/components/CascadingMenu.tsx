/**
 * @fileoverview Renders cascading menus with hover functionality using material-ui-popup-state.
 */

import React, { useContext, useMemo } from "react";
import HoverMenuImport from "material-ui-popup-state/HoverMenu";
import { MenuItems, MenuItemSubmenu, CascadingMenuProps, CascadingContextType, ColorTheme, TransitionDuration } from "../types";
import { MenuItem, Divider, ListItemText, ListItemIcon, MenuList, Typography, Box, ClickAwayListener, Popover } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { usePopupState, bindHover, bindFocus, bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import { SxProps, Theme } from "@mui/material/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";

// Cast HoverMenu to any to bypass type checking
const HoverMenu = HoverMenuImport as any;

const iconSx: SxProps<Theme> = { mb: 0.2, fontSize: "small" };

const CascadingContext = React.createContext<CascadingContextType>({
    parentPopupState: null,
    rootPopupState: null,
});

const CascadingMenuItem: React.FC<MenuItems> = (item) => {
    const { rootPopupState } = useContext(CascadingContext);
    if (!rootPopupState) throw new Error("must be used inside a CascadingMenu");

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
        return <Box sx={{ minWidth: 200 }}>{item.component}</Box>;
    }

    if (item.kind === "action") {
        return (
            <MenuItem dense onClick={handleClick} disabled={item.disabled} selected={item.selected}>
                {item.icon && (
                    <ListItemIcon>
                        {React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement<SvgIconProps>, { sx: iconSx }) : item.icon}
                    </ListItemIcon>
                )}
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
        return (
            <MenuItem dense disabled={item.disabled} selected={item.selected}>
                {item.icon && (
                    <ListItemIcon sx={{ minWidth: '24px', mr: 1 }}>
                        {React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement<SvgIconProps>, { sx: iconSx }) : item.icon}
                    </ListItemIcon>
                )}
                <ListItemText primary={item.label} sx={{ m: 0 }} />
                <ChevronRight sx={{ ml: 'auto' }} />
            </MenuItem>
        );
    }

    return null; // TypeScript exhaustiveness check
};

const CascadingSubmenu: React.FC<
    MenuItemSubmenu & {
        popupId: string;
        colorTheme?: ColorTheme;
        disableRipple?: boolean;
        transitionDuration?: TransitionDuration;
        dense?: boolean;
        disablePadding?: boolean;
        useHover?: boolean;
    }
> = ({ label, items, icon, popupId, colorTheme, disableRipple, transitionDuration, useHover = true }) => {
    const { parentPopupState } = useContext(CascadingContext);
    const popupState = usePopupState({
        popupId,
        variant: "popover",
        parentPopupState,
    });

    // Use bindHover if useHover is true, otherwise use bindTrigger
    const bindMenu = useHover ? bindHover : bindTrigger;

    return (
        <React.Fragment>
            <MenuList sx={{ px: 0, py: 0.5 }}>
                <MenuItem dense {...bindMenu(popupState)} {...bindFocus(popupState)}>
                    {icon && (
                        <ListItemIcon sx={{ mr: -4.5 }}>
                            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<SvgIconProps>, { sx: iconSx }) : icon}
                        </ListItemIcon>
                    )}
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
                colorTheme={colorTheme}
                disableRipple={disableRipple}
                transitionDuration={transitionDuration}
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

const CascadingMenu: React.FC<CascadingMenuProps> = ({ 
    menuItems, 
    popupState, 
    colorTheme, 
    disableRipple, 
    transitionDuration = 0,
    isSubmenu = false,
    useHover = true,
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
        }),
        []
    )

    const handleClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            popupState.close()
        }
    }

    const menuContent = (
        <CascadingContext.Provider value={context}>
            <MenuList>
                {menuItems.map((item: MenuItems, index: number) =>
                    item.kind === "submenu" ? (
                        <CascadingSubmenu
                            dense
                            disablePadding
                            key={`submenu-${index}`}
                            {...item}
                            popupId={`submenu-${index}`}
                            colorTheme={colorTheme}
                            disableRipple={disableRipple}
                            transitionDuration={transitionDuration}
                            useHover={useHover}
                        />
                    ) : (
                        <CascadingMenuItem key={`item-${index}`} {...item} />
                    )
                )}
            </MenuList>
        </CascadingContext.Provider>
    )

    return isSubmenu ? (
        <StyledMenu
            dense
            {...props}
            {...bindMenu(popupState)}
            PaperProps={{
                ...props.PaperProps,
                sx: paperSx,
                component: MenuItem,
            }}
            TransitionProps={{
                ...props.TransitionProps,
                timeout: typeof transitionDuration === 'number' ? transitionDuration : 0
            }}
        >
            {menuContent}
        </StyledMenu>
    ) : (
        <Popover
            {...props}
            open={popupState.isOpen}
            anchorEl={popupState.anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            PaperProps={{
                sx: paperSx
            }}
            TransitionProps={{
                timeout: typeof transitionDuration === 'number' ? transitionDuration : 0
            }}
        >
            {menuContent}
        </Popover>
    )
}

export default CascadingMenu;