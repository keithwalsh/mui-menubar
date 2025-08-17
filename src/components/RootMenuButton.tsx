/**
 * @fileoverview Encapsulates a single root menu button with its popup state
 * and associated cascading menu rendering. Uses group context to coordinate
 * active state, hover navigation, and root-close behavior.
 */

import React from "react";
import { Button, Typography } from "@mui/material";
import { usePopupState } from "material-ui-popup-state/hooks";
import { RootMenu } from "./RootMenu";
import { MenuConfig } from "../types";
import { useRootMenuButtonGroup } from "./RootMenuButtonGroup";


export interface RootMenuButtonProps {
	menu: MenuConfig;
	disableRipple?: boolean;
}

export const RootMenuButton: React.FC<RootMenuButtonProps> = ({ menu, disableRipple }) => {
	const menuId = menu.id ?? menu.label;
	const popupState = usePopupState({
		variant: "popover" as const,
		popupId: `menu-${menuId}`,
	});

	const buttonRef = React.useRef<HTMLButtonElement | null>(null);
	const { isActive, activeKey, registerButtonRef, onActivate, onHoverNavigate, onRootClose } = useRootMenuButtonGroup();
	
	// Handle button ref callback
	const handleButtonRef = React.useCallback((ref: HTMLButtonElement | null) => {
		buttonRef.current = ref;
		registerButtonRef(menuId, ref);
	}, [registerButtonRef, menuId]);

	React.useEffect(() => {
		const isOpenByGroup = activeKey === menuId;
		if (isOpenByGroup && !popupState.isOpen) {
			if (!popupState.anchorEl && buttonRef.current) {
				popupState.setAnchorEl(buttonRef.current as any);
			}
			popupState.open();
		} else if (!isOpenByGroup && popupState.isOpen && isActive) {
			popupState.close();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeKey]);

	// Deactivate group when the currently active (key) menu closes
	const wasOpenRef = React.useRef<boolean>(false);
	React.useEffect(() => {
		const wasOpen = wasOpenRef.current;
		const isOpenByGroup = activeKey === menuId;
		if (wasOpen && !popupState.isOpen && isOpenByGroup) {
			onRootClose?.();
		}
		wasOpenRef.current = popupState.isOpen;
	}, [popupState.isOpen, activeKey, onRootClose, menuId]);

	const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		popupState.setAnchorEl(event.currentTarget as any);
		onActivate?.(menuId);
		if (!popupState.isOpen) popupState.open();
		else popupState.close();
	}, [onActivate, popupState, menuId]);

	const handleMouseEnter = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		if (!isActive) return;
		popupState.setAnchorEl(event.currentTarget as any);
		onHoverNavigate?.(menuId);
	}, [isActive, onHoverNavigate, popupState, menuId]);

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
					px: 0,
					py: 0.25,
					minWidth: 0.7
				}}
				disabled={menu.disabled}
				disableRipple={disableRipple}
			>
				<Typography variant="body2" color="text.secondary">{menu.label}</Typography>
			</Button>
			<RootMenu
			PopoverProps={{
				transitionDuration: 222,                 // or { enter: 222, exit: 222 }
				slotProps: { transition: { timeout: 222 } } // optional; transitionDuration is what matters
			  }}
				menuItems={menu.items}
				popupState={popupState}
				disableRipple={disableRipple}
				useHover={true}
				onRootClose={onRootClose}
			/>
		</React.Fragment>
	);
};

export default RootMenuButton;


