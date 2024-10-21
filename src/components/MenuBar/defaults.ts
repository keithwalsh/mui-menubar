/**
 * @fileoverview Default configurations for the MenuBar component and its
 * subcomponents.
 */

import { MenuConfig, MenuBarProps } from "./types";
import { FileCopy, FolderOpen, Save, ExitToApp, Undo, Redo, ContentCopy, ContentPaste, Visibility, ZoomIn, ZoomOut } from "@mui/icons-material";

/** Default values for MenuConfig */
export const DEFAULT_MENU_CONFIG: Required<MenuConfig> = {
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
        {
            kind: "submenu",
            label: "Edit",
            items: [
                { kind: "action", label: "Undo", action: () => console.log("Undo"), icon: Undo },
                { kind: "action", label: "Redo", action: () => console.log("Redo"), icon: Redo },
                { kind: "divider" },
                {
                    kind: "submenu",
                    label: "Advanced",
                    items: [
                        { kind: "action", label: "Copy", action: () => console.log("Copy"), icon: ContentCopy },
                        { kind: "divider" },
                        { kind: "action", label: "Paste", action: () => console.log("Paste"), icon: ContentPaste },
                    ],
                },
            ],
        },
        {
            kind: "submenu",
            label: "View",
            items: [
                { kind: "action", label: "Show/Hide Sidebar", action: () => console.log("Toggle Sidebar"), icon: Visibility, selected: true },
                { kind: "divider" },
                { kind: "action", label: "Zoom In", action: () => console.log("Zoom In"), icon: ZoomIn },
                { kind: "action", label: "Zoom Out", action: () => console.log("Zoom Out"), icon: ZoomOut },
            ],
        },
    ],
};

/** Default values for MenuBar props */
export const DEFAULT_MENU_BAR_PROPS: Required<Omit<MenuBarProps, "config" | "sx">> = {
    colorTheme: "light",
    color: "transparent" as const,
    transitionDuration: 0,
    disableRipple: true,
};
