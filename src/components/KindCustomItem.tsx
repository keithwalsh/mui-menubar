/**
 * @fileoverview Renders a custom-kind cascading menu item that displays a
 * caller-provided React node and suppresses hover background styles.
 */

import React from "react";
import { Box, MenuItem } from "@mui/material";
import { MenuItemCustom } from "../types";

export const KindCustomItem: React.FC<MenuItemCustom & { disableRipple?: boolean }> = ({ disableRipple, ...item }) => {
    return (
        <MenuItem
            disableRipple={disableRipple}
            sx={{
                px: 1.5,
                '&:hover': {
                    backgroundColor: 'transparent'
                }
            }}
        >
            <Box sx={{ minWidth: 200 }}>{item.component}</Box>
        </MenuItem>
    );
};

export default KindCustomItem;


