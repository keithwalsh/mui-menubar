/**
 * @fileoverview Renders the main menu items for the MenuBar component.
 */

import React from "react";
import { Box } from "@mui/material";
import { MenuConfig, MainMenuRendererProps } from "../types";
import MenuButton from "./MenuButton";


export const MainMenuRenderer: React.FC<MainMenuRendererProps> = ({ menuConfig, disableRipple }) => {
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [activeMenuKey, setActiveMenuKey] = React.useState<string | null>(null);

    const handleActivate = React.useCallback((key: string) => {
        setIsActive(true);
        setActiveMenuKey(key);
    }, []);

    const handleHoverNavigate = React.useCallback((key: string) => {
        if (!isActive) return;
        setActiveMenuKey(key);
    }, [isActive]);

    const handleRootClose = React.useCallback(() => {
        setIsActive(false);
        setActiveMenuKey(null);
    }, []);

    // Store button refs to check position
    const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

    // Global mouse move handler to detect hovering over buttons even when menu is open
    React.useEffect(() => {
        if (!isActive) return;

        const handleGlobalMouseMove = (event: MouseEvent) => {
            // Check if mouse is over any of our buttons by coordinates
            for (const [key, buttonElement] of buttonRefs.current.entries()) {
                if (!buttonElement) continue;
                
                const rect = buttonElement.getBoundingClientRect();
                if (event.clientX >= rect.left && 
                    event.clientX <= rect.right && 
                    event.clientY >= rect.top && 
                    event.clientY <= rect.bottom) {
                    
                    if (key !== activeMenuKey) {
                        handleHoverNavigate(key);
                    }
                    return;
                }
            }
        };

        document.addEventListener('mousemove', handleGlobalMouseMove);
        return () => document.removeEventListener('mousemove', handleGlobalMouseMove);
    }, [isActive, activeMenuKey, handleHoverNavigate]);

    return (
        <Box 
            data-testid="menu-toolbar"
            sx={{ display: 'flex' }}
        >
            {menuConfig.map((menu: MenuConfig) => {
                const key = menu.id ?? menu.label;
                return (
                    <MenuButton
                        key={key}
                        menu={menu}
                        disableRipple={disableRipple}
                        {...({
                            isActive,
                            isOpenByGroup: activeMenuKey === key,
                            onActivate: () => handleActivate(key),
                            onHoverNavigate: () => handleHoverNavigate(key),
                            onRootClose: handleRootClose,
                            onButtonRef: (ref: HTMLButtonElement | null) => {
                                if (ref) {
                                    buttonRefs.current.set(key, ref);
                                } else {
                                    buttonRefs.current.delete(key);
                                }
                            },
                        } as any)}
                    />
                );
            })}
        </Box>
    );
}; 