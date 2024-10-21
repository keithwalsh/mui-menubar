/**
 * @fileoverview Renders cascading menus with hover functionality using material-ui-popup-state.
 */

import React, { useContext, useMemo } from "react";
import HoverMenuImport from "material-ui-popup-state/HoverMenu";
import { MenuItems, MenuItemSubmenu, CascadingMenuProps } from "./types";
import { MenuItem, Divider, ListItemText, ListItemIcon, MenuList, Typography } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { usePopupState, bindHover, bindFocus, bindMenu, PopupState } from "material-ui-popup-state/hooks";
import { SxProps, Theme } from "@mui/material/styles";
import { ColorTheme, TransitionDuration } from "./types";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";

// Cast HoverMenu to any to bypass type checking
const HoverMenu = HoverMenuImport as any;

const iconSx: SxProps<Theme> = { mb: 0.2, fontSize: "small" };

interface CascadingContextType {
    parentPopupState: PopupState | null;
    rootPopupState: PopupState | null;
}

const CascadingContext = React.createContext<CascadingContextType>({
    parentPopupState: null,
    rootPopupState: null,
});

const CascadingMenuItem: React.FC<MenuItems> = (item) => {
    const { rootPopupState } = useContext(CascadingContext);
    if (!rootPopupState) throw new Error("must be used inside a CascadingMenu");

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLLIElement>) => {
            rootPopupState.close(event);
            if (item.kind === "action") item.action();
        },
        [rootPopupState, item]
    );

    if (item.kind === "divider") {
        return <Divider />;
    }

    return (
        <MenuList dense sx={{ px: 0, py: 0.5 }}>
            <MenuItem dense onClick={handleClick} disabled={item.disabled} selected={item.selected}>
                {item.icon && (
                    <ListItemIcon>
                        {React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement<SvgIconProps>, { sx: iconSx }) : item.icon}
                    </ListItemIcon>
                )}
                <ListItemText>{item.label}</ListItemText>
                {item.kind === "action" && item.shortcut && (
                    <Typography variant="body2" sx={{ ml: 4, color: "text.secondary" }}>
                        {item.shortcut}
                    </Typography>
                )}
            </MenuItem>
        </MenuList>
    );
};

const CascadingSubmenu: React.FC<
    MenuItemSubmenu & {
        popupId: string;
        colorTheme?: ColorTheme;
        disableRipple?: boolean;
        transitionDuration?: TransitionDuration;
        dense?: boolean;
        disablePadding?: boolean;
    }
> = ({ label, items, icon, popupId, colorTheme, disableRipple, transitionDuration }) => {
    const { parentPopupState } = useContext(CascadingContext);
    const popupState = usePopupState({
        popupId,
        variant: "popover",
        parentPopupState,
    });
    return (
        <React.Fragment>
            <MenuList sx={{ px: 0, py: 0.5 }}>
                <MenuItem dense {...bindHover(popupState)} {...bindFocus(popupState)}>
                    {icon && (
                        <ListItemIcon>
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

const CascadingMenu: React.FC<CascadingMenuProps> = ({ menuItems, popupState, colorTheme, disableRipple, transitionDuration, isSubmenu = false, ...props }) => {
    const { rootPopupState } = useContext(CascadingContext);
    const context = useMemo(
        () => ({
            rootPopupState: rootPopupState || popupState,
            parentPopupState: popupState,
        }),
        [rootPopupState, popupState]
    );

    const paperSx: SxProps<Theme> = useMemo(
        () => ({
            backgroundColor: isSubmenu ? "background.paper" : "transparent",
            ...(isSubmenu && {
                "& .MuiPaper-root": {
                    backgroundColor: "background.paper",
                },
            }),
        }),
        [isSubmenu]
    );

    return (
        <CascadingContext.Provider value={context}>
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
                    transitionDuration: transitionDuration,
                }}
            >
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
                        />
                    ) : (
                        <CascadingMenuItem key={`item-${index}`} {...item} />
                    )
                )}
            </StyledMenu>
        </CascadingContext.Provider>
    );
};

export default CascadingMenu;
