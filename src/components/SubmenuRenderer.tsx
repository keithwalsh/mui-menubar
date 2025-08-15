/**
 * @fileoverview Renders submenu items for the CascadingMenu component.
 */

import { MenuItem, ListItemText } from "@mui/material";
import { bindHover, bindFocus } from 'material-ui-popup-state/hooks';
import ChevronRight from "@mui/icons-material/ChevronRight";
import { SubmenuRendererProps } from "../types";
import { renderListItemIcon } from "./CascadingShared";

export function SubmenuRenderer({ item, parentPopupState, disableRipple, disableGutters }: SubmenuRendererProps) {
    return (
        <MenuItem
            disabled={item.disabled}
            disableRipple={disableRipple}
            disableGutters={disableGutters}
            {...bindHover(parentPopupState)}
            {...bindFocus(parentPopupState)}
        >
            {item.icon && renderListItemIcon(item.icon, { minWidth: '24px', mr: 1 })}
            <ListItemText primary={item.label} sx={{ m: 0 }} />
            <ChevronRight sx={{ ml: 'auto' }} />
        </MenuItem>
    );
};