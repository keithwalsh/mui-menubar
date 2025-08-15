/**
 * @fileoverview Encapsulates a single top-level menu button with its popup state
 * and associated cascading menu rendering.
 */

import React from "react";
import { Button } from "@mui/material";
import { usePopupState, bindTrigger, bindPopover } from "material-ui-popup-state/hooks";
import CascadingMenu from "./CascadingMenu";
import { MenuConfig } from "../types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export interface MenuButtonProps {
	menu: MenuConfig;
	disableRipple?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ menu, disableRipple }) => {
	const menuId = menu.id ?? menu.label;
	const popupState = usePopupState({
		variant: "popover" as const,
		popupId: `menu-${menuId}`,
	});

	return (
		<React.Fragment>
			<Button
				{...bindTrigger(popupState)}
				color="inherit"
				sx={{
					textTransform: "none",
					backgroundColor: popupState.isOpen ? 'action.selected' : 'transparent',
					'&:hover': {
						backgroundColor: popupState.isOpen ? 'action.selected' : 'action.hover',
					},
					'& .MuiButton-endIcon': { marginLeft: '2px' },
					px: 1,
					py: 0.25,
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
};

export default MenuButton;


