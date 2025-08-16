/**
 * @fileoverview Renders a divider-kind cascading menu item as a list Divider.
 */

import React from "react";
import { Divider } from "@mui/material";
import { MenuItemDivider } from "../types";

export const KindDividerItem: React.FC<MenuItemDivider> = () => {
    return <Divider sx={{ mx: 0 }} component="li"/>;
};

export default KindDividerItem;


