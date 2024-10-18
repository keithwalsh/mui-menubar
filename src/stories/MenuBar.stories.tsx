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
            table: {
                defaultValue: { summary: "[]", detail: "Empty array = no rendering" },
                type: {
                    summary: "MenuConfig[]",
                    detail: `
Array<{
    label: string;
    disabled?: boolean;
    items: Array<{
        kind: "action" | "divider" | "submenu";
        label?: string;
        disabled?: boolean;
        selected?: boolean;
        transitionDuration?: "auto" | number | { appear?: number; enter?: number; exit?: number };
        action?: () => void;
        icon?: React.ReactNode;
        shortcut?: string;
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
            table: {
                defaultValue: { summary: "light" },
                type: { summary: `"light" | "dark"` },
            },
        },
        color: {
            options: ["default", "primary", "secondary", "inherit", "transparent"],
            control: { type: "select" },
            description: "Color of the menu bar (AppBar colors).",
            table: {
                defaultValue: { summary: "transparent" },
                type: { summary: `"default" | "primary" | "secondary" | "inherit" | "transparent"` },
            },
        },
        sx: {
            control: { type: "object" },
            description: "Custom styles for the menu bar.",
            table: {
                defaultValue: { summary: "{}" },
                type: { summary: "SxProps<Theme>", detail: "See https://mui.com/material-ui/api/app-bar/#props" },
            },
        },
        disableRipple: {
            control: { type: "radio" },
            options: [true, false],
            description: "Disable ripple effect on menu items.",
            table: {
                defaultValue: { summary: "true" },
                type: { summary: "boolean" },
            },
        },
        transitionDuration: {
            control: { type: "number" },
            description: "Transition duration for menu items.",
            table: {
                defaultValue: { summary: "0" },
                type: { summary: "number" },
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
            { kind: "action", label: "Hello", action: () => console.log("New file"), icon: <FileCopy />, shortcut: "Ctrl+S" },
            { kind: "action", label: "Open", action: () => console.log("Open file action triggered"), icon: <FolderOpen />, disabled: true },
            { kind: "divider" },
            { kind: "action", label: "Save", action: () => console.log("Save file"), icon: <Save /> },
            { kind: "action", label: "Exit", action: () => console.log("Exit application"), icon: <ExitToApp /> },
        ],
    },
    {
        label: "Edit",
        items: [
            { kind: "action", label: "Undo", action: () => console.log("Undo"), icon: <Undo /> },
            { kind: "action", label: "Redo", action: () => console.log("Redo"), icon: <Redo /> },
            { kind: "divider" },
            {
                kind: "submenu",
                label: "Advanced",
                items: [
                    { kind: "action", label: "Copy", action: () => console.log("Copy"), icon: <ContentCopy /> },
                    { kind: "divider" },
                    { kind: "action", label: "Paste", action: () => console.log("Paste"), icon: <ContentPaste /> },
                ],
            },
        ],
    },
    {
        label: "View",
        items: [
            { kind: "action", label: "Show/Hide Sidebar", action: () => console.log("Toggle Sidebar"), icon: <Visibility />, selected: true },
            { kind: "divider" },
            { kind: "action", label: "Zoom In", action: () => console.log("Zoom In"), icon: <ZoomIn /> },
            { kind: "action", label: "Zoom Out", action: () => console.log("Zoom Out"), icon: <ZoomOut /> },
        ],
    },
];

export const Default: Story = {
    args: {
        config: sampleConfig,
        colorTheme: "light",
        color: "transparent",
    },
    render: (args: MenuBarProps) => (
        <div style={{ backgroundColor: getBackgroundColor(args.colorTheme) }}>
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
    backgrounds: {
        default: "dark",
    },
};

// Helper function to get background color
function getBackgroundColor(colorTheme: string | undefined): string {
    return colorTheme === "dark" ? "#333333" : "transparent";
}
