/**
 * @fileoverview Component for rendering submenu items with hover functionality
 * and chevron indicator. Extracted from the original CascadingMenu component.
 */

import React, { useContext } from "react";
import { MenuItem, MenuList, ListItemText } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { usePopupState, bindHover, bindFocus, bindTrigger } from "material-ui-popup-state/hooks";
import { MenuItemSubmenu } from "../types";
import { CascadingContext, renderListItemIcon } from "./CascadingShared";
import { SubMenu } from ".";

export interface CascadingSubmenuProps extends MenuItemSubmenu {
    popupId: string;
    disableRipple?: boolean;
    useHover?: boolean;
}

export const CascadingSubmenu: React.FC<CascadingSubmenuProps> = ({ 
    label, 
    items, 
    icon, 
    popupId, 
    disableRipple, 
    useHover = true 
}) => {
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
            <SubMenu
                menuItems={items}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                popupState={popupState}
                disableRipple={disableRipple}
                useHover={useHover}
            />
        </React.Fragment>
    );
};

export default CascadingSubmenu;
