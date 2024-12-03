/**
 * @fileoverview Storybook stories for the MenuBar component, showcasing various
 * configurations and themes. Includes examples for light and dark modes.
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MenuBar, { MenuBarProps, MenuConfig } from "../src/components";
import { FileCopy, FolderOpen, Save, ExitToApp, Undo, Redo, ContentCopy, ContentPaste, Visibility, ZoomIn, ZoomOut } from "@mui/icons-material";
import { action } from "@storybook/addon-actions";
import TableSizeChooser from "./TableSizeChooser";
import TableChart from '@mui/icons-material/TableChart';

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
                    // Note: The string "Array<{" starts at the very beginning of the next line to ensure correct formatting in the Storybook UI display.
                    detail: `
Array<{
    label: string;
    disabled?: boolean;
    items: Array<{
        kind: "action" | "divider" | "submenu" | "custom";
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
    },
};

export default meta;
type Story = StoryObj<typeof MenuBar>;

const sampleConfig: MenuConfig[] = [
    {
        label: "File",
        items: [
            { kind: "action", label: "Hello", action: action("New file"), icon: <FileCopy />, shortcut: "Ctrl+S" },
            { kind: "action", label: "Open", action: action("Open file action triggered"), icon: <FolderOpen />, disabled: true },
            { kind: "divider" },
            {
                kind: "submenu",
                label: "Table Size",
                icon: <TableChart />,
                items: [
                    {
                        kind: "custom",
                        component: (
                            <TableSizeChooser
                                maxRows={10}
                                maxCols={10}
                                currentRows={3}
                                currentCols={3}
                                onSizeSelect={(rows, cols) => action("Size Selected")(`${rows}x${cols}`)}
                            />
                        )
                    }
                ]
            },
            { kind: "action", label: "Save", action: action("Save file"), icon: <Save /> },
            { kind: "action", label: "Exit", action: action("Exit application"), icon: <ExitToApp /> },
        ],
    },
    {
        label: "Edit",
        items: [
            { kind: "action", label: "Undo", action: action("Undo"), icon: <Undo /> },
            { kind: "action", label: "Redo", action: action("Redo"), icon: <Redo /> },
            { kind: "divider" },
            {
                kind: "submenu",
                label: "Advanced",
                items: [
                    { kind: "action", label: "Copy", action: action("Copy"), icon: <ContentCopy /> },
                    { kind: "divider" },
                    { kind: "action", label: "Paste", action: action("Paste"), icon: <ContentPaste /> },
                ],
            },
        ],
    },
    {
        label: "View",
        items: [
            { kind: "action", label: "Show/Hide Sidebar", action: action("Toggle Sidebar"), icon: <Visibility />, selected: true },
            { kind: "divider" },
            { kind: "action", label: "Zoom In", action: action("Zoom In"), icon: <ZoomIn /> },
            { kind: "action", label: "Zoom Out", action: action("Zoom Out"), icon: <ZoomOut /> },
        ],
    },
];

export const Default: Story = {
    args: {
        config: sampleConfig,
        color: "transparent",
        disableRipple: true,
    },
    render: (args: MenuBarProps) => (
            <MenuBar {...args} />
    ),
};