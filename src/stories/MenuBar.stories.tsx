/**
 * @fileoverview Storybook stories for the MenuBar component, showcasing various
 * configurations and themes. Includes examples for light and dark modes.
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MenuBar, { MenuConfig } from "../components/MenuBar";
import { FileCopy, FolderOpen, Save, ExitToApp, Undo, Redo, ContentCopy, ContentPaste, Visibility, ZoomIn, ZoomOut } from "@mui/icons-material";

const meta: Meta<typeof MenuBar> = {
    title: "Components/MenuBar",
    component: MenuBar,
    tags: ["autodocs"],
    argTypes: {
        colorTheme: {
            control: {
                type: "radio",
            },
            options: ["light", "dark"],
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
    render: (args: { colorTheme?: string }) => (
        <div style={{ backgroundColor: getBackgroundColor(args.colorTheme), padding: "20px" }}>
            <MenuBar {...args} />
        </div>
    ),
};

export const DarkMode: Story = {
    args: {
        config: [
            {
                label: "File",
                items: [
                    { kind: "action", label: "Hello", action: () => console.log("New file"), icon: FileCopy },
                    { kind: "action", label: "Open", action: () => console.log("Open file"), icon: FolderOpen },
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
        ],
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
