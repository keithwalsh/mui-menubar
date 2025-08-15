/**
 * @fileoverview Renders a single non-submenu item in the cascading menu.
 */

import React, { useContext } from "react";
import { Box, MenuItem, Divider, ListItemText, Typography } from "@mui/material";
import { MenuItems } from "../types";
import { CascadingContext, renderListItemIcon } from "./CascadingShared";

export const CascadingMenuItem: React.FC<MenuItems & { disableRipple?: boolean }> = ({ disableRipple, ...item }) => {
    const { rootPopupState, parentPopupState } = useContext(CascadingContext);
    if (!rootPopupState) throw new Error("must be used inside a CascadingMenu");
    if (!parentPopupState) throw new Error("must have a parent popup state for submenu");

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLLIElement>) => {
            if (item.kind === "custom") return;
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

    return null;
};


