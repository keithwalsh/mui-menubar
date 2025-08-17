/**
 * @fileoverview Dedicated component for rendering submenu popups using HoverMenu.
 * Handles the popup behaviour and styling for nested menu items.
 */

import React, { useContext, useMemo } from "react";
import HoverMenuImport from "material-ui-popup-state/HoverMenu";
import { MenuList, MenuItem } from "@mui/material";
import { bindMenu } from "material-ui-popup-state/hooks";
import { styled } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/material/styles";
import { PopupState } from "material-ui-popup-state/hooks";
import { MenuItems } from "../types";
import { CascadingContext } from "./CascadingShared";
import { CascadingMenuItem } from "./CascadingMenuItem";
import { CascadingSubmenu } from "./KindSubmenuItem";

// Cast HoverMenu to any to bypass type checking
const HoverMenu = HoverMenuImport as any;

// Create a styled version of Menu with custom styles
const StyledMenu = styled(HoverMenu)(() => ({
    "& .MuiList-padding": {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
}));

export interface SubMenuProps {
    menuItems: MenuItems[];
    popupState: PopupState;
    disableRipple?: boolean;
    useHover?: boolean;
    anchorOrigin?: {
        vertical: "top" | "center" | "bottom";
        horizontal: "left" | "center" | "right";
    };
    transformOrigin?: {
        vertical: "top" | "center" | "bottom";
        horizontal: "left" | "center" | "right";
    };
    PaperProps?: {
        className?: string;
        sx?: SxProps<Theme>;
        [key: string]: any;
    };
    TransitionProps?: any;
    slotProps?: {
        transition?: any;
        [key: string]: any;
    }
    [key: string]: any;
}

const SubMenuComponent: React.FC<SubMenuProps> = ({ 
    menuItems, 
    popupState, 
    disableRipple, 
    useHover = true,
    PaperProps = {},
    TransitionProps,
    slotProps,
    ...props 
}) => {
    const { rootPopupState } = useContext(CascadingContext);
    const mergedTransitionSlotProps = {
        ...(TransitionProps ?? {}),
        ...(slotProps?.transition ?? {}),
        timeout: 0
    };
    const incomingSlotProps = {
        ...(slotProps ?? {}),
        transition: mergedTransitionSlotProps
    };
    
    const context = useMemo(
        () => ({
            rootPopupState: rootPopupState || popupState,
            parentPopupState: popupState,
        }),
        [rootPopupState, popupState]
    );

    const paperSx: SxProps<Theme> = useMemo(
        () => ({
            backgroundColor: "background.paper",
            "& .MuiPaper-root": {
                backgroundColor: "background.paper",
            },
            ...(PaperProps?.sx ?? {})
        }),
        [PaperProps?.sx]
    );

    const menuContent = (
        <CascadingContext.Provider value={context}>
            <MenuList dense sx={{ m: 0, p: 0 }}>
                {menuItems.map((item: MenuItems, index: number) => {
                    const baseId = (item as any).id ?? (item as any).label ?? index;
                    if (item.kind === "submenu") {
                        return (
                            <CascadingSubmenu
                                key={`submenu-${baseId}`}
                                {...item}
                                popupId={`submenu-${baseId}`}
                                disableRipple={disableRipple}
                                useHover={useHover}
                            />
                        );
                    }
                    return (
                        <CascadingMenuItem
                            key={`item-${baseId}`}
                            {...item}
                            disableRipple={disableRipple}
                        />
                    );
                })}
            </MenuList>
        </CascadingContext.Provider>
    );

    return (
        <StyledMenu
            {...props}
            {...bindMenu(popupState)}
            autoFocus={props?.autoFocus ?? false}
            disableAutoFocusItem={props?.disableAutoFocusItem ?? true}
            transitionDuration={0}
            PaperProps={{
                ...(PaperProps ?? {}),
                sx: paperSx,
            }}
            slotProps={incomingSlotProps}
        >
            {menuContent}
        </StyledMenu>
    );
};

export const SubMenu = React.memo(SubMenuComponent);

export default SubMenu;
