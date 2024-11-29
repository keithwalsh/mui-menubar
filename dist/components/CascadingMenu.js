var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @fileoverview Renders cascading menus with hover functionality using material-ui-popup-state.
 */
import React, { useContext, useMemo } from "react";
import HoverMenuImport from "material-ui-popup-state/HoverMenu";
import { MenuItem, Divider, ListItemText, ListItemIcon, MenuList, Typography, Box } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { usePopupState, bindHover, bindFocus, bindMenu } from "material-ui-popup-state/hooks";
import { styled } from "@mui/material/styles";
// Cast HoverMenu to any to bypass type checking
const HoverMenu = HoverMenuImport;
const iconSx = { mb: 0.2, fontSize: "small" };
const CascadingContext = React.createContext({
    parentPopupState: null,
    rootPopupState: null,
});
const CascadingMenuItem = (item) => {
    const { rootPopupState } = useContext(CascadingContext);
    if (!rootPopupState)
        throw new Error("must be used inside a CascadingMenu");
    const handleClick = React.useCallback((event) => {
        if (item.kind === "custom")
            return; // Don't close menu for custom components
        rootPopupState.close(event);
        if (item.kind === "action")
            item.action();
    }, [rootPopupState, item]);
    if (item.kind === "divider") {
        return _jsx(Divider, {});
    }
    if (item.kind === "custom") {
        return _jsx(Box, { sx: { minWidth: 200 }, children: item.component });
    }
    if (item.kind === "action") {
        return (_jsxs(MenuItem, { dense: true, onClick: handleClick, disabled: item.disabled, selected: item.selected, children: [item.icon && (_jsx(ListItemIcon, { children: React.isValidElement(item.icon) ? React.cloneElement(item.icon, { sx: iconSx }) : item.icon })), _jsx(ListItemText, { children: item.label }), item.shortcut && (_jsx(Typography, { variant: "body2", sx: { ml: 4, color: "text.secondary" }, children: item.shortcut }))] }));
    }
    // Must be submenu at this point
    return (_jsxs(MenuItem, { dense: true, disabled: item.disabled, selected: item.selected, children: [item.icon && (_jsx(ListItemIcon, { sx: { minWidth: '24px', mr: 1 }, children: React.isValidElement(item.icon) ? React.cloneElement(item.icon, { sx: iconSx }) : item.icon })), _jsx(ListItemText, { primary: item.label, sx: { m: 0 } }), _jsx(ChevronRight, { sx: { ml: 'auto' } })] }));
};
const CascadingSubmenu = ({ label, items, icon, popupId, colorTheme, disableRipple, transitionDuration }) => {
    const { parentPopupState } = useContext(CascadingContext);
    const popupState = usePopupState({
        popupId,
        variant: "popover",
        parentPopupState,
    });
    return (_jsxs(React.Fragment, { children: [_jsx(MenuList, { sx: { px: 0, py: 0.5 }, children: _jsxs(MenuItem, Object.assign({ dense: true }, bindHover(popupState), bindFocus(popupState), { children: [icon && (_jsx(ListItemIcon, { sx: { mr: -4.5 }, children: React.isValidElement(icon) ? React.cloneElement(icon, { sx: iconSx }) : icon })), _jsx(ListItemText, { inset: true, sx: { px: 0 }, children: label }), _jsx(ChevronRight, { sx: { ml: 4 } })] })) }), _jsx(CascadingMenu, { menuItems: items, anchorOrigin: { vertical: "top", horizontal: "right" }, transformOrigin: { vertical: "top", horizontal: "left" }, popupState: popupState, colorTheme: colorTheme, disableRipple: disableRipple, transitionDuration: transitionDuration, isSubmenu: true })] }));
};
// Create a styled version of Menu with custom styles
const StyledMenu = styled(HoverMenu)(() => ({
    "& .MuiList-padding": {
        paddingTop: 1,
        paddingBottom: 1,
    },
}));
const CascadingMenu = (_a) => {
    var { menuItems, popupState, colorTheme, disableRipple, transitionDuration, isSubmenu = false } = _a, props = __rest(_a, ["menuItems", "popupState", "colorTheme", "disableRipple", "transitionDuration", "isSubmenu"]);
    const { rootPopupState } = useContext(CascadingContext);
    const context = useMemo(() => ({
        rootPopupState: rootPopupState || popupState,
        parentPopupState: popupState,
    }), [rootPopupState, popupState]);
    const paperSx = useMemo(() => (Object.assign({ backgroundColor: isSubmenu ? "background.paper" : "transparent" }, (isSubmenu && {
        "& .MuiPaper-root": {
            backgroundColor: "background.paper",
        },
    }))), [isSubmenu]);
    return (_jsx(CascadingContext.Provider, { value: context, children: _jsx(StyledMenu, Object.assign({ dense: true }, props, bindMenu(popupState), { PaperProps: Object.assign(Object.assign({}, props.PaperProps), { sx: paperSx, component: MenuItem }), TransitionProps: Object.assign(Object.assign({}, props.TransitionProps), { transitionDuration: transitionDuration }), children: menuItems.map((item, index) => item.kind === "submenu" ? (_jsx(CascadingSubmenu, Object.assign({ dense: true, disablePadding: true }, item, { popupId: `submenu-${index}`, colorTheme: colorTheme, disableRipple: disableRipple, transitionDuration: transitionDuration }), `submenu-${index}`)) : (_jsx(CascadingMenuItem, Object.assign({}, item), `item-${index}`))) })) }));
};
export default CascadingMenu;
