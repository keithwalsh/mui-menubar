/**
 * @fileoverview Backward compatibility wrapper for the original CascadingMenu component.
 * This component has been split into RootMenu and SubMenu for better separation of concerns.
 * @deprecated Use RootMenu for root menus and SubMenu for submenus instead.
 */

import React from "react";
import { CascadingMenuProps } from "../types";
import { RootMenu } from "./RootMenu";
import { SubMenu } from "./SubMenu";

export const CascadingMenu: React.FC<CascadingMenuProps> = ({ 
    isSubmenu = false,
    ...props 
}) => {
    if (isSubmenu) {
        return <SubMenu {...props} />;
    }
    return <RootMenu {...props} />;
}

export { CascadingMenuItem } from "./CascadingMenuItem";
export { CascadingContext } from "./CascadingShared";

export default CascadingMenu;