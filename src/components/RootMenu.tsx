/**
 * @fileoverview Dedicated component for rendering root-level menu popups using Popover.
 * Handles the main menu behavior, root close events, and positioning for top-level menus.
 */

import React, { useContext, useMemo } from "react";
import { MenuList, Popover } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { PopoverProps } from "@mui/material";
import { PopupState } from "material-ui-popup-state/hooks";
import { MenuItems } from "../types";
import { CascadingContext } from "./CascadingShared";
import { CascadingMenuItem } from "./CascadingMenuItem";
import { CascadingSubmenu } from "./CascadingSubmenu";

export interface RootMenuProps {
    menuItems: MenuItems[];
    popupState: PopupState;
    disableRipple?: boolean;
    useHover?: boolean;
    onRootClose?: () => void;
    PopoverProps?: {
        PaperProps?: {
            className?: string;
            sx?: SxProps<Theme>;
            [key: string]: any;
        };
        anchorOrigin?: {
            vertical: "top" | "center" | "bottom";
            horizontal: "left" | "center" | "right";
        };
        transformOrigin?: {
            vertical: "top" | "center" | "bottom";
            horizontal: "left" | "center" | "right";
        };
        TransitionProps?: any;
        [key: string]: any;
    };
    [key: string]: any;
}

export const RootMenu: React.FC<RootMenuProps> = ({ 
    menuItems, 
    popupState, 
    disableRipple, 
    useHover = true,
    onRootClose,
    PopoverProps = {},
    ...props 
}) => {
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
            backgroundColor: "background.paper",
            "& .MuiPaper-root": {
                backgroundColor: "background.paper",
            },
            ...PopoverProps?.PaperProps?.sx
        }),
        [PopoverProps?.PaperProps?.sx]
    );

    const handleClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            popupState.close();
            onRootClose?.();
        }
    };

    const menuContent = (
        <CascadingContext.Provider value={context}>
            <MenuList dense>
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
    );
};

export default RootMenu;
