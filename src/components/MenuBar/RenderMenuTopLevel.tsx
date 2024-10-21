/**
 * @fileoverview Renders the top-level menu buttons and their associated
 * dropdown menus for the MenuBar component using Popper for better positioning control.
 */

import React, { useState, useEffect } from "react";
import { Button, Popper, Paper, ClickAwayListener, styled } from "@mui/material";
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        if (isOpen && openMenu?.menuAnchor) {
            setAnchorEl(openMenu.menuAnchor);
        } else {
            setAnchorEl(null);
        }
    }, [isOpen, openMenu]);

    return (
        <React.Fragment key={`menu-${menuTopLevelIndex}-${menuTopLevel.label}`}>
            <StyledButton
                ref={(node) => {
                    if (node && isOpen) {
                        setAnchorEl(node);
                    }
                }}
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
            <Popper id={`menu-${menuTopLevelIndex}`} open={isOpen} anchorEl={anchorEl} placement="bottom-start" transition disablePortal>
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={() => handleClose()}>
                        <Paper
                            {...TransitionProps}
                            sx={{
                                transformOrigin: "0 0 0",
                                visibility: isOpen ? "visible" : "hidden",
                            }}
                        >
                            <RenderMenuItems menuItems={menuTopLevel.items} handleClose={handleClose} colorTheme={colorTheme} disableRipple={disableRipple} />
                        </Paper>
                    </ClickAwayListener>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default RenderMenuTopLevel;
