var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState } from "react";
import { AppBar, Button, Menu, MenuItem, Toolbar, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
var MenuStrip = function (_a) {
    var menuConfig = _a.menuConfig, _b = _a.darkMode, darkMode = _b === void 0 ? false : _b, sx = _a.sx;
    // Initialize anchor elements for each top-level menu
    var _c = useState(new Array(menuConfig.length).fill(null)), anchorEls = _c[0], setAnchorEls = _c[1];
    /**
     * Handles the opening of a menu by setting the corresponding anchor element.
     * @param event - The mouse event that triggered the menu opening.
     * @param index - The index of the menu to open.
     */
    var handleClick = function (event, index) {
        var newAnchorEls = __spreadArray([], anchorEls, true);
        newAnchorEls[index] = event.currentTarget;
        setAnchorEls(newAnchorEls);
    };
    /**
     * Handles the closing of a menu by clearing the corresponding anchor element.
     * @param index - The index of the menu to close.
     */
    var handleClose = function (index) {
        var newAnchorEls = __spreadArray([], anchorEls, true);
        newAnchorEls[index] = null;
        setAnchorEls(newAnchorEls);
    };
    /**
     * Handles keyboard interactions for accessibility.
     * @param event - The keyboard event.
     * @param index - The index of the menu.
     */
    var handleKeyDown = function (event, index) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick(event, index);
        }
    };
    /**
     * Type guard to determine if a menu item is a divider.
     * @param item - The menu item to check.
     * @returns True if the item is a divider, false otherwise.
     */
    var isDivider = function (item) {
        return item.kind === "divider";
    };
    /**
     * Renders a single menu item or a divider based on its configuration.
     * @param item - The menu item configuration.
     * @param closeMenu - Function to close the parent menu.
     * @param itemIndex - The index of the menu item within its menu.
     * @param menuIndex - The index of the parent menu.
     * @returns A JSX element representing the menu item or divider.
     */
    var renderMenuItem = function (item, closeMenu, itemIndex, menuIndex) {
        if (isDivider(item)) {
            return React.createElement(Divider, { key: "menu-".concat(menuIndex, "-divider-").concat(itemIndex), sx: { my: 0.5 } });
        }
        // TypeScript now knows item is MenuItemActionConfig
        var actionItem = item;
        return (React.createElement(MenuItem, { dense: true, onClick: function () {
                if (actionItem.action)
                    actionItem.action();
                closeMenu();
            }, key: "menu-".concat(menuIndex, "-item-").concat(itemIndex) },
            actionItem.icon && (React.createElement(ListItemIcon, { sx: { marginRight: -0.75 } },
                React.createElement(actionItem.icon, { fontSize: "small", sx: { marginLeft: 0 } }))),
            React.createElement(ListItemText, { primary: actionItem.label })));
    };
    /**
     * Renders a top-level menu with its corresponding items.
     * @param menu - The top-level menu configuration.
     * @param index - The index of the top-level menu.
     * @returns A JSX fragment containing the menu button and its dropdown.
     */
    var renderMenu = function (menu, index) { return (React.createElement(React.Fragment, { key: "menu-".concat(index, "-").concat(menu.label) },
        React.createElement(Button, { endIcon: React.createElement(KeyboardArrowDown, { sx: { marginLeft: -0.8 } }), "aria-controls": "menu-".concat(index), "aria-haspopup": "true", "aria-expanded": Boolean(anchorEls[index]), onClick: function (e) { return handleClick(e, index); }, onKeyDown: function (e) { return handleKeyDown(e, index); }, color: "inherit", sx: { textTransform: "none" } }, menu.label),
        React.createElement(Menu, { id: "menu-".concat(index), anchorEl: anchorEls[index], keepMounted: true, open: Boolean(anchorEls[index]), onClose: function () { return handleClose(index); }, MenuListProps: {
                "aria-labelledby": "menu-button-".concat(index),
            } }, menu.items.map(function (item, itemIndex) { return renderMenuItem(item, function () { return handleClose(index); }, itemIndex, index); })))); };
    return (React.createElement(AppBar, { position: "static", sx: __assign(__assign({}, sx), { backgroundColor: "transparent" }), style: {
            color: darkMode ? "rgb(255, 255, 255)" : "rgba(0, 0, 0, 0.87)",
        }, elevation: 0 },
        React.createElement(Toolbar, { sx: {
                padding: 0,
                "&.MuiToolbar-root": {
                    minHeight: 0,
                    padding: 0,
                },
            } }, menuConfig.map(function (menu, index) { return renderMenu(menu, index); }))));
};
export default MenuStrip;
