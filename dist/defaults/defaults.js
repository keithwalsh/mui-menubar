/**
 * @fileoverview Default configurations for the MenuBar component and its
 * subcomponents.
 */
import { FileCopy, FolderOpen, Save, ExitToApp } from "@mui/icons-material";
/** Default values for MenuConfig */
export const DEFAULT_MENU_CONFIG = {
    label: "Root",
    disabled: false,
    items: [
        {
            kind: "submenu",
            label: "File",
            items: [
                { kind: "action", label: "Hello", action: () => console.log("New file"), icon: FileCopy, shortcut: "Ctrl+S" },
                { kind: "action", label: "Open", action: () => console.log("Open file action triggered"), icon: FolderOpen, disabled: true },
                { kind: "divider" },
                { kind: "action", label: "Save", action: () => console.log("Save file"), icon: Save },
                { kind: "action", label: "Exit", action: () => console.log("Exit application"), icon: ExitToApp },
            ],
        },
    ],
};
/** Default values for MenuBar props */
export const DEFAULT_MENU_BAR_PROPS = {
    colorTheme: "light",
    color: "transparent",
    transitionDuration: 0,
    disableRipple: true,
};
