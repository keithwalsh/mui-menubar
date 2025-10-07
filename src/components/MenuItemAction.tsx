/**
 * @fileoverview Enhanced menu item component with icon, label, shortcut, and
 * selected state support. Compatible with MenuConfig structure.
 */

import { MouseEvent, Ref, ReactNode } from 'react';
import { alpha, ListItemIcon, ListItemText, MenuItem, Typography, Theme } from '@mui/material';
import { MENU_ITEM_ICON_ALPHA, MENU_ITEM_LABEL_ALPHA, MENU_ITEM_SHORTCUT_ALPHA, getMenuItemIconColor, getMenuItemLabelColor, getMenuItemShortcutColor } from '../utils/menuUtils';

interface MenuItemActionProps {
    disabled?: boolean;
    label?: string;
    leftIcon?: ReactNode;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    rightIcon?: ReactNode;
    shortcut?: string;
    selected?: boolean;
}

export function MenuItemAction(props: MenuItemActionProps & { ref?: Ref<HTMLLIElement> }) {
    return (
        <MenuItem
          dense
          ref={props.ref}
          disabled={props.disabled}
          selected={props.selected}
          onClick={props.onClick}
          sx={{
            m: 0.5,
            py: 0,
            minWidth: 150
          }}>
          {props.leftIcon && (
              <ListItemIcon
                sx={{
                  color: (theme) => alpha(getMenuItemIconColor(theme), MENU_ITEM_ICON_ALPHA),
                  ml: -0.5,
                  "& .MuiSvgIcon-root": {
                    fontSize: "small"
                  }
                }}
              >
                  {props.leftIcon}
              </ListItemIcon>
          )}
          <ListItemText 
            inset={!props.leftIcon} 
            sx={!props.leftIcon ? { ml: -1 } : {}}
          >
              <Typography
                variant="body2"
                sx={{
                  color: (theme: Theme) => alpha(getMenuItemLabelColor(theme), MENU_ITEM_LABEL_ALPHA)
                }}
              >
                {props.label}
              </Typography>
          </ListItemText>
          {props.shortcut && (
              <Typography
                variant="body2"
                sx={{
                  ml: 'auto', 
                  pl: 4, 
                  color: (theme: Theme) => alpha(getMenuItemShortcutColor(theme), MENU_ITEM_SHORTCUT_ALPHA), 
                  fontSize: '0.86rem'
                }}
              >
                  {props.shortcut}
              </Typography>
          )}
          {props.rightIcon && !props.shortcut && (
              <ListItemIcon
                sx={{
                  mr: -3,
                  color: (theme) => alpha(getMenuItemIconColor(theme), MENU_ITEM_ICON_ALPHA),
                  "& .MuiSvgIcon-root": {
                    fontSize: "small"
                  }
                }}
              >
                  {props.rightIcon}
              </ListItemIcon>
          )}
        </MenuItem>
    );
}
