/**
 * @fileoverview Renders cascading menus with hover functionality using material-ui-popup-state.
 */

import React, { useContext, useMemo } from "react";
import { styled } from "@mui/material/styles";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import MenuItem from "@mui/material/MenuItem";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { usePopupState, bindHover, bindFocus, bindMenu, PopupState } from "material-ui-popup-state/hooks";
import { MenuBarItem, CascadingMenuProps, CascadingSubmenuProps, CascadingMenuItemProps } from "./types";

const StyledSubmenu = styled("div")(({ theme }) => ({
    marginTop: -theme.spacing(1),
}));

const StyledTitle = styled("span")({
    flexGrow: 1,
});

const StyledMoreArrow = styled(ChevronRight)(({ theme }) => ({
    marginRight: -theme.spacing(1),
}));

interface CascadingContextType {
    parentPopupState: PopupState | null;
    rootPopupState: PopupState | null;
}

const CascadingContext = React.createContext<CascadingContextType>({
    parentPopupState: null,
    rootPopupState: null,
});

const CascadingMenuItem: React.FC<CascadingMenuItemProps> = ({ onClick, ...props }) => {
    const { rootPopupState } = useContext(CascadingContext);
    if (!rootPopupState) throw new Error("must be used inside a CascadingMenu");
    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLLIElement>) => {
            rootPopupState.close(event);
            if (onClick) onClick();
        },
        [rootPopupState, onClick]
    );

    return <MenuItem {...props} onClick={handleClick} />;
};

const CascadingSubmenu: React.FC<CascadingSubmenuProps> = ({ item, popupId, colorTheme, disableRipple }) => {
    const { parentPopupState } = useContext(CascadingContext);
    const popupState = usePopupState({
        popupId,
        variant: "popover",
        parentPopupState,
    });
    return (
        <React.Fragment>
            <MenuItem {...bindHover(popupState)} {...bindFocus(popupState)}>
                <StyledTitle>{item.label}</StyledTitle>
                <StyledMoreArrow />
            </MenuItem>
            <CascadingMenu
                menuItems={item.items}
                componentsProps={{ paper: { component: StyledSubmenu } }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                popupState={popupState}
                colorTheme={colorTheme || "light"}
                disableRipple={disableRipple || false}
            />
        </React.Fragment>
    );
};

const CascadingMenu: React.FC<CascadingMenuProps> = ({ menuItems, popupState, colorTheme, disableRipple, ...props }) => {
    const { rootPopupState } = useContext(CascadingContext);
    const context = useMemo(
        () => ({
            rootPopupState: rootPopupState || popupState,
            parentPopupState: popupState,
        }),
        [rootPopupState, popupState]
    );

    return (
        <CascadingContext.Provider value={context}>
            <HoverMenu {...props} {...bindMenu(popupState)}>
                {menuItems.map((item: MenuBarItem, index: number) =>
                    item.kind === "submenu" ? (
                        <CascadingSubmenu
                            key={`submenu-${index}`}
                            item={item}
                            popupId={`submenu-${index}`}
                            colorTheme={colorTheme || "light"}
                            disableRipple={disableRipple || false}
                        />
                    ) : (
                        <CascadingMenuItem key={`item-${index}`} onClick={item.kind === "action" ? item.onClick : undefined} disabled={item.disabled}>
                            {item.label}
                        </CascadingMenuItem>
                    )
                )}
            </HoverMenu>
        </CascadingContext.Provider>
    );
};

export default CascadingMenu;
