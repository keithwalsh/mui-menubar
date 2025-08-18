/**
 * @fileoverview Renders an action-kind cascading menu item with icon, label,
 * shortcut, and click handling that closes the root popup before invoking the
 * provided action.
 */

import React, { useContext } from "react";
import { MenuItem, ListItemText, Typography, alpha } from "@mui/material";
import { MenuItemAction } from "../types";
import { CascadingContext, renderListItemIcon } from "./CascadingShared";

export const KindActionItem: React.FC<MenuItemAction & { disableRipple?: boolean }> = ({ disableRipple, ...item }) => {
    const { rootPopupState } = useContext(CascadingContext);

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLLIElement>) => {
            rootPopupState?.close(event);
            item.action();
        },
        [rootPopupState, item]
    );

    return (
        <MenuItem
            sx={{ m: 0.5 }}
            onClick={handleClick}
            disabled={item.disabled}
            selected={item.selected}
            disableRipple={disableRipple}
        >
            {item.icon && renderListItemIcon(item.icon)}
            <ListItemText><Typography variant="body2" sx={{ color: "text.secondary" }}>{item.label}</Typography></ListItemText>
            {item.shortcut && (
                <Typography variant="body2" sx={{ ml: 4, color: (theme) => alpha(theme.palette.text.secondary, 0.45), fontSize: '0.86rem' }}>
                    {item.shortcut}
                </Typography>
            )}
        </MenuItem>
    );
};

export default KindActionItem;


