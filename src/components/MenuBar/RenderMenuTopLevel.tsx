/**
 * @fileoverview Renders the top-level menu buttons and their associated
 * dropdown menus for the MenuBar component.
 */

import React from "react";
import { Button, Menu, styled } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { RenderMenuTopLevelProps } from "./types";
import RenderMenuItems from "./RenderMenuItems";
import { DEFAULT_RENDER_MENU_TOP_LEVEL_PROPS } from "./defaults";

const StyledButton = styled(Button)(({ theme }) => ({
    "&:hover, &.Mui-selected, &.active": {
        backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focusVisible": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const RenderMenuTopLevel: React.FC<RenderMenuTopLevelProps> = ({
    menuTopLevel,
    menuTopLevelIndex,
    openMenu,
    handleClick,
    handleKeyDown,
    handleClose,
    colorTheme,
    disableRipple = DEFAULT_RENDER_MENU_TOP_LEVEL_PROPS.disableRipple,
    transitionDuration = DEFAULT_RENDER_MENU_TOP_LEVEL_PROPS.transitionDuration,
}) => {
    const isOpen = openMenu?.menuIndex === menuTopLevelIndex;

    return (
        <React.Fragment key={`menu-${menuTopLevelIndex}-${menuTopLevel.label}`}>
            <StyledButton
                endIcon={<KeyboardArrowDown sx={{ marginLeft: -0.8 }} />}
                aria-controls={isOpen ? `menu-${menuTopLevelIndex}` : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={(event) => handleClick(event, menuTopLevelIndex)}
                onKeyDown={(event) => handleKeyDown(event, menuTopLevelIndex)}
                color="inherit"
                sx={{ textTransform: "none" }}
                disabled={menuTopLevel.disabled}
                className={isOpen ? "active" : ""}
                disableFocusRipple={true}
                disableRipple={disableRipple}
            >
                {menuTopLevel.label}
            </StyledButton>
            <Menu
                id={`menu-${menuTopLevelIndex}`}
                anchorEl={isOpen ? openMenu.menuAnchor : null}
                open={isOpen}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": `menu-button-${menuTopLevelIndex}`,
                    role: "menu",
                }}
                transitionDuration={transitionDuration}
            >
                <RenderMenuItems menuItems={menuTopLevel.items} handleClose={handleClose} colorTheme={colorTheme} disableRipple={disableRipple} />
            </Menu>
        </React.Fragment>
    );
};

export default RenderMenuTopLevel;
