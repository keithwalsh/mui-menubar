import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MenuStrip, { MenuConfig } from "../MenuStrip";
import { FileCopy, FolderOpen, Save, ExitToApp, Undo, Redo, ContentCopy, ContentPaste, Visibility, ZoomIn, ZoomOut } from "@mui/icons-material";

const meta: Meta<typeof MenuStrip> = {
    title: "Components/MenuStrip",
    component: MenuStrip,
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
type Story = StoryObj<typeof MenuStrip>;

const sampleConfig: MenuConfig[] = [
    {
        label: "File",
        items: [
            { label: "New", action: () => console.log("New file"), icon: FileCopy },
            { label: "Open", action: () => console.log("Open file"), icon: FolderOpen },
            { kind: "divider" },
            { label: "Save", action: () => console.log("Save file"), icon: Save },
            { label: "Exit", action: () => console.log("Exit application"), icon: ExitToApp },
        ],
    },
    {
        label: "Edit",
        items: [
            { label: "Undo", action: () => console.log("Undo"), icon: Undo },
            { label: "Redo", action: () => console.log("Redo"), icon: Redo },
            { kind: "divider" },
            {
                kind: "submenu",
                label: "Advanced",
                items: [
                    { label: "Copy", action: () => console.log("Copy"), icon: ContentCopy },
                    { label: "Paste", action: () => console.log("Paste"), icon: ContentPaste },
                ],
            },
        ],
    },
    {
        label: "View",
        items: [
            { label: "Show/Hide Sidebar", action: () => console.log("Toggle Sidebar"), icon: Visibility },
            { kind: "divider" },
            { label: "Zoom In", action: () => console.log("Zoom In"), icon: ZoomIn },
            { label: "Zoom Out", action: () => console.log("Zoom Out"), icon: ZoomOut },
        ],
    },
];

export const Default: Story = {
    args: {
        config: sampleConfig,
        colorTheme: "light",
    },
    render: (args) => (
        <div style={{ backgroundColor: getBackgroundColor(args.colorTheme), padding: "20px" }}>
            <MenuStrip {...args} />
        </div>
    ),
};

export const DarkMode: Story = {
    args: {
        config: sampleConfig,
        colorTheme: "dark",
    },
    parameters: {
        backgrounds: {
            default: "dark",
        },
    },
    render: (args) => (
        <div style={{ backgroundColor: getBackgroundColor(args.colorTheme), padding: "20px" }}>
            <MenuStrip {...args} />
        </div>
    ),
};

// Helper function to get background color
const getBackgroundColor = (colorTheme: string | undefined): string => {
    return colorTheme === "dark" ? "#333333" : "transparent";
};
