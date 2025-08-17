/**
 * @fileoverview Shared utilities for cascading menu components, including the
 * React context and rendering helpers used across multiple files.
 */

import React from "react";
import { ListItemIcon } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { SvgIconProps } from "@mui/material";
import { CascadingContextType } from "../types";

const iconSx: SxProps<Theme> = { color: "text.secondary", ml: -0.5, mb: 0.2, fontSize: "small" };

export const CascadingContext = React.createContext<CascadingContextType>({
    parentPopupState: null,
    rootPopupState: null,
});

export function renderListItemIcon(icon: React.ReactNode, sx?: SxProps<Theme>) {
    return (
        <ListItemIcon sx={sx}>
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<SvgIconProps>, { sx: iconSx }) : icon}
        </ListItemIcon>
    );
}


