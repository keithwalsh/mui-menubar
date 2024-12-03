/**
 * @fileoverview Renders submenu items for the CascadingMenu component.
 */

import React from "react";
import { MenuItem, ListItemText } from "@mui/material";
import { usePopupState, bindHover, bindFocus } from "material-ui-popup-state/hooks";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { MenuItemSubmenu, SubmenuRendererProps } from "../types";
import { renderListItemIcon } from "./CascadingMenu";

export const SubmenuRenderer: React.FC<SubmenuRendererProps> = ({ item, disableRipple }) => {
    const submenuPopupState = usePopupState({
        variant: "popover",
        popupId: `submenu-${item.label}`,
    });

    return (
        <MenuItem
            dense
            disabled={item.disabled}
            selected={item.selected}
            disableRipple={disableRipple}
            {...bindHover(submenuPopupState)}
            {...bindFocus(submenuPopupState)}
        >
            {item.icon && renderListItemIcon(item.icon, { minWidth: '24px', mr: 1 })}
            <ListItemText primary={item.label} sx={{ m: 0 }} />
            <ChevronRight sx={{ ml: 'auto' }} />
        </MenuItem>
    );
}; 