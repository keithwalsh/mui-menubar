/**
 * @fileoverview Nested submenu component that opens on hover with configurable
 * delay and supports infinite nesting depth.
 */

import { MouseEvent, ReactNode, useImperativeHandle, useRef, useState, Ref, useEffect } from 'react';
import { Box, Menu } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { MenuItemAction } from './MenuItemAction';
import { NESTED_MENU_SX, POINTER_EVENTS_AUTO_STYLE } from '../utils/menuUtils';

export interface MenuItemSubmenuProps {
    parentMenuOpen: boolean;
    label?: string;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    children?: ReactNode;
    disabled?: boolean;
    delay?: number;
}

export function MenuItemSubmenu(props: MenuItemSubmenuProps & { ref?: Ref<HTMLLIElement | null> }) {
    const { 
        rightIcon = <ChevronRight />, 
        leftIcon = null,
        delay = 0,
        parentMenuOpen,
        label,
        children,
        disabled,
        ref,
    } = props;
    
    const menuItemRef = useRef<HTMLLIElement | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    useImperativeHandle(ref, () => menuItemRef.current!);
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            if (!disabled) {
                setIsSubMenuOpen(true);
            }
        }, delay);
    };
    
    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsSubMenuOpen(false);
    };

    return (
        <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{ m: 0.5 }}
        >
            <MenuItemAction
                ref={menuItemRef}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                label={label}
            />
            <Menu
                anchorEl={menuItemRef.current}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                open={isSubMenuOpen && parentMenuOpen}
                keepMounted
                transitionDuration={0}
                onClose={() => setIsSubMenuOpen(false)}
                sx={{
                  ...NESTED_MENU_SX,
                  '& .MuiPaper-root': {
                    mt: 0.5
                  }
                }}
            >
                <Box style={POINTER_EVENTS_AUTO_STYLE}>
                    {children}
                </Box>
            </Menu>
        </Box>
    );
}