/**
 * @fileoverview Encapsulates a single top-level menu button with its popup state
 * and associated cascading menu rendering.
 */

import React from "react";
import { Button } from "@mui/material";
import { usePopupState } from "material-ui-popup-state/hooks";
import CascadingMenu from "./CascadingMenu";
import { MenuConfig } from "../types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export interface MenuButtonProps {
	menu: MenuConfig;
	disableRipple?: boolean;
	isActive?: boolean;
	isOpenByGroup?: boolean;
	onActivate?: () => void;
	onHoverNavigate?: () => void;
	onRootClose?: () => void;
	onButtonRef?: (ref: HTMLButtonElement | null) => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ menu, disableRipple, isActive = false, isOpenByGroup = false, onActivate, onHoverNavigate, onRootClose, onButtonRef }) => {
	const menuId = menu.id ?? menu.label;
	const popupState = usePopupState({
		variant: "popover" as const,
		popupId: `menu-${menuId}`,
	});

	const buttonRef = React.useRef<HTMLButtonElement | null>(null);
	
	// Handle button ref callback
	const handleButtonRef = React.useCallback((ref: HTMLButtonElement | null) => {
		buttonRef.current = ref;
		onButtonRef?.(ref);
	}, [onButtonRef]);

	React.useEffect(() => {
		if (isOpenByGroup && !popupState.isOpen) {
			if (!popupState.anchorEl && buttonRef.current) {
				popupState.setAnchorEl(buttonRef.current as any);
			}
			popupState.open();
		} else if (!isOpenByGroup && popupState.isOpen && isActive) {
			popupState.close();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpenByGroup]);

	// Deactivate group when the currently active (key) menu closes
	const wasOpenRef = React.useRef<boolean>(false);
	React.useEffect(() => {
		const wasOpen = wasOpenRef.current;
		if (wasOpen && !popupState.isOpen && isOpenByGroup) {
			onRootClose?.();
		}
		wasOpenRef.current = popupState.isOpen;
	}, [popupState.isOpen, isOpenByGroup, onRootClose]);

	const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		popupState.setAnchorEl(event.currentTarget as any);
		onActivate?.();
		if (!popupState.isOpen) popupState.open();
		else popupState.close();
	}, [onActivate, popupState]);

	const handleMouseEnter = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		if (!isActive) return;
		popupState.setAnchorEl(event.currentTarget as any);
		onHoverNavigate?.();
	}, [isActive, onHoverNavigate, popupState]);

	return (
		<React.Fragment>
			<Button
				ref={handleButtonRef}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseOver={handleMouseEnter}
				onPointerEnter={handleMouseEnter as any}
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
				menuItems={menu.items}
				popupState={popupState}
				disableRipple={disableRipple}
				useHover={true}
				onRootClose={onRootClose}
			/>
		</React.Fragment>
	);
};

export default MenuButton;


