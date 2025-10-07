/**
 * @fileoverview Horizontal menu bar rendering menu buttons from MenuConfig,
 * supporting menu chaining and activation logic.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { MenuConfig } from '../types';
import { resolveMenuId } from '../utils/menuUtils';
import { MenuButton } from './MenuButton';

export interface MenuBarProps {
    menuConfig: MenuConfig[];
    sx?: SxProps<Theme>;
}

export function MenuBar({ menuConfig, sx }: MenuBarProps) {
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    const handleActivate = (menuId: string) => {
        setActiveMenuId(menuId);
    };

    const handleDeactivate = useCallback(() => {
        setActiveMenuId(null);
    }, []);

    const handleRegisterRef = (menuId: string, ref: HTMLButtonElement | null) => {
        if (ref) {
            buttonRefs.current.set(menuId, ref);
        } else {
            buttonRefs.current.delete(menuId);
        }
    };

    useEffect(() => {
        const onMouseDown = (event: MouseEvent) => {
            const buttons = [...buttonRefs.current.values()];
            const clickedOutside = !buttons.some(btn => btn?.contains(event.target as Node));
            if (clickedOutside) {
                handleDeactivate();
            }
        };

        document.addEventListener('mousedown', onMouseDown);
        return () => document.removeEventListener('mousedown', onMouseDown);
    }, [handleDeactivate]);

    return (
        <Box sx={{ display: 'flex', ...sx }}>
            {menuConfig.map((menu) => (
                <MenuButton 
                    key={resolveMenuId(menu)} 
                    menu={menu}
                    activeMenuId={activeMenuId}
                    onActivate={handleActivate}
                    onHoverNavigate={handleActivate}
                    onDeactivate={handleDeactivate}
                    onRegisterRef={handleRegisterRef}
                />
            ))}
        </Box>
    );
}