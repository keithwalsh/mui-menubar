/**
 * @fileoverview Provides a context-based group wrapper to coordinate top-level
 * menu button behaviour including active state, hover navigation, and root-close
 * handling across all top-level buttons.
 */

import React from "react";

export interface MenuButtonGroupContextValue {
	isActive: boolean;
	activeKey: string | null;
	registerButtonRef: (key: string, ref: HTMLButtonElement | null) => void;
	onActivate: (key: string) => void;
	onHoverNavigate: (key: string) => void;
	onRootClose: () => void;
}

export const MenuButtonGroupContext = React.createContext<MenuButtonGroupContextValue>({
	isActive: false,
	activeKey: null,
	registerButtonRef: () => {},
	onActivate: () => {},
	onHoverNavigate: () => {},
	onRootClose: () => {},
});

export interface MenuButtonGroupProps {
	children: React.ReactNode;
}

export const MenuButtonGroup: React.FC<MenuButtonGroupProps> = ({ children }) => {
	const [isActive, setIsActive] = React.useState<boolean>(false);
	const [activeKey, setActiveKey] = React.useState<string | null>(null);

	const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

	const registerButtonRef = React.useCallback((key: string, ref: HTMLButtonElement | null) => {
		if (ref) buttonRefs.current.set(key, ref);
		else buttonRefs.current.delete(key);
	}, []);

	const onActivate = React.useCallback((key: string) => {
		setIsActive(true);
		setActiveKey(key);
	}, []);

	const onHoverNavigate = React.useCallback((key: string) => {
		if (!isActive) return;
		setActiveKey(key);
	}, [isActive]);

	const onRootClose = React.useCallback(() => {
		setIsActive(false);
		setActiveKey(null);
	}, []);

	React.useEffect(() => {
		if (!isActive) return;

		const handleGlobalMouseMove = (event: MouseEvent) => {
			for (const [key, buttonElement] of buttonRefs.current.entries()) {
				if (!buttonElement) continue;
				const rect = buttonElement.getBoundingClientRect();
				if (
					event.clientX >= rect.left &&
					event.clientX <= rect.right &&
					event.clientY >= rect.top &&
					event.clientY <= rect.bottom
				) {
					if (key !== activeKey) {
						setActiveKey(key);
					}
					return;
				}
			}
		};

		document.addEventListener("mousemove", handleGlobalMouseMove);
		return () => document.removeEventListener("mousemove", handleGlobalMouseMove);
	}, [isActive, activeKey]);

	const contextValue = React.useMemo(
		() => ({ isActive, activeKey, registerButtonRef, onActivate, onHoverNavigate, onRootClose }),
		[isActive, activeKey, registerButtonRef, onActivate, onHoverNavigate, onRootClose]
	);

	return (
		<MenuButtonGroupContext.Provider value={contextValue}>
			{children}
		</MenuButtonGroupContext.Provider>
	);
};

export const useMenuButtonGroup = () => React.useContext(MenuButtonGroupContext);

export default MenuButtonGroup;


