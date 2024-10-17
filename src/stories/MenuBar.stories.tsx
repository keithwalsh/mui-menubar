/**
 * @fileoverview Storybook stories for the MenuBar component, showcasing various
 * configurations and themes. Includes examples for light and dark modes.
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MenuBar, { MenuBarProps, MenuConfig } from "../components/MenuBar";
import { FileCopy, FolderOpen, Save, ExitToApp, Undo, Redo, ContentCopy, ContentPaste, Visibility, ZoomIn, ZoomOut } from "@mui/icons-material";

const meta: Meta<typeof MenuBar> = {
    title: "MenuBar",
    component: MenuBar,
    tags: ["autodocs"],
    argTypes: {
        config: {
            control: {
                type: "object",
            },
            description: "JSON configuration for the menu structure.",
            defaultValue: "[]",
            table: {
                defaultValue: { summary: "[]", detail: "Empty array = no rendering" },
                type: {
                    summary: "MenuConfig[]",
                    detail: `
Array<{
    /** Label for the top-level menu category. */
    label: string;
    /** Optional flag to disable the entire menu category. */
    disabled?: boolean;
    /** Array of menu items within this category. */
    items: Array<{
               /** Determines the type of menu item: 'action', 'divider', or 'submenu'. */
               kind: "action" | "divider" | "submenu";
               /** Text displayed for the menu item (not applicable for dividers). */
               label?: string;
               /** Function to be called when an action item is selected. */
               action?: () => void;
               /** Optional icon component to be displayed alongside the label. */
               icon?: React.ComponentType<SvgIconProps>;
               /** Optional keyboard shortcut displayed for the menu item. */
               shortcut?: string;
               /** Whether the menu item is disabled. */
               disabled?: boolean;
               /**
                * For submenu items, an array of nested menu items.
                * These can have the same structure as top-level items,
                * allowing for multiple levels of nesting.
                */
               items?: Array</* Recursive reference to this item structure */>;
        }>;
    }>;
`,
                },
            },
        },
        colorTheme: {
            control: {
                type: "radio",
                options: ["light", "dark"],
            },
            description: "Switch between light and dark mode.",
            defaultValue: "light",
            table: {
                type: { summary: `"light" | "dark"` },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof MenuBar>;

const sampleConfig: MenuConfig[] = [
    {
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
        label: "View",
        items: [
            { kind: "action", label: "Show/Hide Sidebar", action: () => console.log("Toggle Sidebar"), icon: Visibility },
            { kind: "divider" },
            { kind: "action", label: "Zoom In", action: () => console.log("Zoom In"), icon: ZoomIn },
            { kind: "action", label: "Zoom Out", action: () => console.log("Zoom Out"), icon: ZoomOut },
        ],
    },
];

export const Default: Story = {
    args: {
        config: sampleConfig,
        colorTheme: "light",
    },
    render: (args: MenuBarProps) => (
        <div style={{ backgroundColor: getBackgroundColor(args.colorTheme), padding: "20px" }}>
            <MenuBar {...args} />
        </div>
    ),
};

export const DarkMode: Story = {
    args: {
        config: sampleConfig,
        colorTheme: "dark",
    },
};

DarkMode.parameters = {
    docs: {
        source: {
            type: "code",
        },
    },
    backgrounds: {
        default: "dark",
    },
};

// Helper function to get background color
function getBackgroundColor(colorTheme: string | undefined): string {
    return colorTheme === "dark" ? "#333333" : "transparent";
}
