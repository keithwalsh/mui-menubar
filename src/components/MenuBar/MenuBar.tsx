/**
 * @fileoverview Main component for rendering a customizable menu bar with
 * nested submenus and various item types using material-ui-popup-state.
 */

import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { usePopupState, bindHover, bindFocus } from "material-ui-popup-state/hooks";
import { MenuBarProps } from "./types";
import { DEFAULT_MENU_BAR_PROPS } from "./defaults";
import CascadingMenu from "./CascadingMenu";

const useStyles = makeStyles(() => ({
    button: {
        textTransform: "none",
    },
}));

const MenuBar: React.FC<MenuBarProps> = ({
    config = [],
    colorTheme = DEFAULT_MENU_BAR_PROPS.colorTheme,
    color = DEFAULT_MENU_BAR_PROPS.color,
    sx,
    transitionDuration = DEFAULT_MENU_BAR_PROPS.transitionDuration,
    disableRipple = DEFAULT_MENU_BAR_PROPS.disableRipple,
}) => {
    const classes = useStyles();

    if (config.length === 0) {
        return (
            <AppBar position="static" elevation={0} color={color} sx={sx}>
                <Toolbar variant="dense" disableGutters={true} />
            </AppBar>
        );
    }

    return (
        <AppBar position="static" elevation={0} color={color} sx={sx}>
            <Toolbar variant="dense" disableGutters={true}>
                {config.map((menuTopLevel, index) => {
                    const popupState = usePopupState({
                        popupId: `menu-${index}`,
                        variant: "popover",
                    });
                    return (
                        <React.Fragment key={`menu-${index}-${menuTopLevel.label}`}>
                            <Button
                                {...bindHover(popupState)}
                                {...bindFocus(popupState)}
                                color="inherit"
                                className={classes.button}
                                disabled={menuTopLevel.disabled}
                                disableRipple={disableRipple}
                            >
                                {menuTopLevel.label}
                            </Button>
                            <CascadingMenu
                                menuItems={menuTopLevel.items}
                                popupState={popupState}
                                colorTheme={colorTheme}
                                transitionDuration={transitionDuration}
                                disableRipple={disableRipple}
                            />
                        </React.Fragment>
                    );
                })}
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;
