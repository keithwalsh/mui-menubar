/**
 * @fileoverview Renders a single non-submenu item in the cascading menu.
 */

import React, { useContext } from "react";
import { MenuItems } from "../types";
import { CascadingContext } from "./CascadingShared";
import { KindDividerItem } from "./KindDividerItem";
import { KindCustomItem } from "./KindCustomItem";
import { KindActionItem } from "./KindActionItem";

export const CascadingMenuItem: React.FC<MenuItems & { disableRipple?: boolean }> = ({ disableRipple, ...item }) => {
    const { rootPopupState, parentPopupState } = useContext(CascadingContext);
    if (!rootPopupState) throw new Error("must be used inside a RootMenu/SubMenu context");
    if (!parentPopupState) throw new Error("must have a parent popup state for submenu");

    if (item.kind === "divider") {
        return <KindDividerItem {...item} />;
    }

    if (item.kind === "custom") {
        return <KindCustomItem {...item} disableRipple={disableRipple} />;
    }

    if (item.kind === "action") {
        return <KindActionItem {...item} disableRipple={disableRipple} />;
    }

    return null;
};


