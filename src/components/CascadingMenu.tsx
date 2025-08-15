/**
 * @fileoverview Renders cascading menus with hover functionality using material-ui-popup-state.
 */

import React, { useContext, useMemo } from "react";
import HoverMenuImport from "material-ui-popup-state/HoverMenu";
import { MenuItems, MenuItemSubmenu, CascadingMenuProps } from "../types";
import { MenuItem, MenuList, Popover, ListItemText } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { usePopupState, bindHover, bindFocus, bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import { SxProps, Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { CascadingContext, renderListItemIcon } from "./CascadingShared";
import { CascadingMenuItem } from "./CascadingMenuItem";

// Cast HoverMenu to any to bypass type checking
const HoverMenu = HoverMenuImport as any;

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
    onRootClose,
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
            if (!isSubmenu) onRootClose?.()
        }
    }

    const menuContent = (
        <CascadingContext.Provider value={context}>
            <MenuList dense>
                {menuItems.map((item: MenuItems, index: number) => {
                    const baseId = (item as any).id ?? (item as any).label ?? index;
                    if (item.kind === "submenu") {
                        return (
                            <CascadingSubmenu
                                disablePadding
                                key={`submenu-${baseId}`}
                                {...item}
                                popupId={`submenu-${baseId}`}
                                disableRipple={disableRipple}
                                useHover={useHover}
                            />
                        )
                    }
                    return (
                        <CascadingMenuItem
                            key={`item-${baseId}`}
                            {...item}
                            disableRipple={disableRipple}
                        />
                    )
                })}
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

export { CascadingMenuItem } from "./CascadingMenuItem";
export { CascadingContext } from "./CascadingShared";

export default CascadingMenu;