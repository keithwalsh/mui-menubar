/**
 * @fileoverview Helper function to render menu items based on their kind,
 * supporting action, divider, and submenu types.
 */

import { MouseEvent, ReactNode } from 'react';
import { Divider } from '@mui/material';
import { MenuItemConfig, MenuItemActionConfig } from '../types';
import { MenuItemAction } from './MenuItemAction';
import { MenuItemSubmenu } from './MenuItemSubmenu';
import { generateMenuItemKey } from '../utils/menuUtils';

export interface RenderMenuItemOptions {
    item: MenuItemConfig;
    handleClose: () => void;
    isOpen: boolean;
}

export function renderMenuItem(options: RenderMenuItemOptions): ReactNode {
    const key = generateMenuItemKey(options.item);

    if (options.item.kind === "divider") {
        return (
            <Divider
              key={`divider-${key}`}
              component="li"
              sx={{
                my: '0 !important',
              }} 
            />
        );
    }

    if (options.item.kind === "submenu") {
        return (
            <MenuItemSubmenu
                key={`submenu-${key}`}
                label={options.item.label}
                leftIcon={options.item.icon}
                parentMenuOpen={options.isOpen}
                disabled={options.item.disabled}
            >
                {options.item.items.map((subItem, index) => 
                    renderMenuItem({ 
                        item: subItem, 
                        handleClose: options.handleClose, 
                        isOpen: options.isOpen 
                    })
                )}
            </MenuItemSubmenu>
        );
    }

    if (options.item.kind === "action") {
        const actionItem = options.item as MenuItemActionConfig;
        return (
            <MenuItemAction
                key={`action-${key}`}
                label={actionItem.label}
                leftIcon={actionItem.icon}
                shortcut={actionItem.shortcut}
                disabled={actionItem.disabled}
                selected={actionItem.selected}
                onClick={(event: MouseEvent<HTMLElement>) => {
                    options.handleClose();
                    actionItem.action();
                }}
            />
        );
    }

    return null;
}

