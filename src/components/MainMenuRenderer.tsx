/**
 * @fileoverview Renders the main menu items for the MenuBar component.
 */

import React from "react";
import { Button, Toolbar } from "@mui/material";
import { usePopupState, bindTrigger, bindPopover } from "material-ui-popup-state/hooks";
import CascadingMenu from "./CascadingMenu";
import { MenuConfig, MainMenuRendererProps } from "../types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export const MainMenuRenderer: React.FC<MainMenuRendererProps> = ({ menuConfig, disableRipple }) => {
    return (
        <Toolbar data-testid="menu-toolbar">
            {menuConfig.map((menu, index) => {
                const menuId = menu.id ?? menu.label;
                const popupState = usePopupState({
                    variant: "popover" as const,
                    popupId: `menu-${menuId}`,
                });

                return (
                    <React.Fragment key={menuId}>
                        <Button
                            {...bindTrigger(popupState)}
                            color="inherit"
                            sx={{
                                textTransform: "none",
                                backgroundColor: popupState.isOpen ? 'action.selected' : 'transparent',
                                '&:hover': {
                                    backgroundColor: popupState.isOpen ? 'action.selected' : 'action.hover',
                                },
                                '& .MuiButton-endIcon': {
                                    marginLeft: '2px'
                                },
                                px: 1,
                                py: 0.25
                            }}
                            disabled={menu.disabled}
                            disableRipple={disableRipple}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            {menu.label}
                        </Button>
                        <CascadingMenu
                            {...bindPopover(popupState)}
                            menuItems={menu.items}
                            popupState={popupState}
                            disableRipple={disableRipple}
                            useHover={true}
                        />
                    </React.Fragment>
                );
            })}
        </Toolbar>
    );
}; 