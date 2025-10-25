/**
 * @fileoverview Individual menu button that triggers a dropdown menu with items,
 * supporting hover navigation between menus.
 */

import { Fragment, MouseEvent, PointerEvent, useRef, useState } from 'react';
import { alpha, Button, Menu, Theme } from '@mui/material';
import { MenuConfig, MenuItemConfig } from '../types';
import { renderMenuItem } from './renderMenuItem';
import { getMenuItemLabelColor, MENU_ITEM_LABEL_ALPHA, NESTED_MENU_SX, resolveMenuId } from '../utils/menuUtils';

export interface MenuButtonProps {
    menu: MenuConfig;
    activeMenuId: string | null;
    onActivate: (menuId: string) => void;
    onHoverNavigate: (menuId: string) => void;
    onDeactivate: () => void;
    onRegisterRef: (menuId: string, ref: HTMLButtonElement | null) => void;
}

export function MenuButton(props: MenuButtonProps) {
  const menuId = resolveMenuId(props.menu);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const isOpen = props.activeMenuId === menuId;

  function handleClick(event: MouseEvent<Element>) {
    if (isOpen) {
      props.onDeactivate();
    } else {
      setAnchorEl(event.currentTarget);
      props.onActivate(menuId);
    }
  }

  function handlePointerEnter(event: PointerEvent<HTMLButtonElement>) {
    if (props.activeMenuId) {
      event.preventDefault();
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
      props.onHoverNavigate(menuId);
    }
  }

  return (
    <Fragment key={menuId}>
      <Button
        ref={(node: HTMLButtonElement | null) => {
          buttonRef.current = node;
          props.onRegisterRef(menuId, node);
        }}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        disabled={props.menu.disabled}
        sx={{
          textTransform: "none",
          px: 2,
          py: 0.25,
          minWidth: 0,
          fontWeight: 400,
          color: (theme: Theme) => alpha(getMenuItemLabelColor(theme), MENU_ITEM_LABEL_ALPHA),
          backgroundColor: isOpen ? "action.selected" : "transparent",
          "&:hover": {
            backgroundColor: isOpen ? "action.selected" : "action.hover",
          },
        }}
      >
        {props.menu.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={props.onDeactivate}
        keepMounted
        transitionDuration={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={NESTED_MENU_SX}
      >
        {props.menu.items.map((item: MenuItemConfig) =>
          renderMenuItem({
            item,
            handleClose: props.onDeactivate,
            isOpen,
          })
        )}
      </Menu>
    </Fragment>
  );
}
