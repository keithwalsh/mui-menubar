/**
 * @fileoverview Renders the top-level menu buttons and their associated
 * dropdown menus for the MenuBar component.
 */

import React from "react";
import { Button, Menu } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { RenderMenuTopLevelProps } from "./types";
import RenderMenuItems from "./RenderMenuItems";

const RenderMenuTopLevel: React.FC<RenderMenuTopLevelProps> = ({
    menuTopLevel,
    menuTopLevelIndex,
    openMenu,
    handleClick,
    handleKeyDown,
    handleClose,
    colorTheme,
}) => {
    const isOpen = openMenu?.menuIndex === menuTopLevelIndex;

    return (
        <React.Fragment key={`menu-${menuTopLevelIndex}-${menuTopLevel.label}`}>
            <Button
                endIcon={<KeyboardArrowDown sx={{ marginLeft: -0.8 }} />}
                aria-controls={isOpen ? `menu-${menuTopLevelIndex}` : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={(event) => handleClick(event, menuTopLevelIndex)}
                onKeyDown={(event) => handleKeyDown(event, menuTopLevelIndex)}
                color="inherit"
                sx={{ textTransform: "none" }}
            >
                {menuTopLevel.label}
            </Button>
            <Menu
                id={`menu-${menuTopLevelIndex}`}
                anchorEl={isOpen ? openMenu.menuAnchor : null}
                open={isOpen}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": `menu-button-${menuTopLevelIndex}`,
                    role: "menu",
                }}
            >
                <RenderMenuItems menuItems={menuTopLevel.items} handleClose={handleClose} colorTheme={colorTheme} />
            </Menu>
        </React.Fragment>
    );
};

export default RenderMenuTopLevel;
