/**
 * @fileoverview Storybook stories for the MenuBar component demonstrating
 * usage with MenuConfig structure compatible with menubar.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { MenuBar, MenuBarProps } from '../components/MenuBar';
import { MenuConfig } from '../types';
import { Brightness4, Brightness7, ContentCopy, ContentPaste, ExitToApp, FileCopy, FolderOpen, Redo, Save, Undo, Visibility, ZoomIn, ZoomOut } from '@mui/icons-material';
import React from 'react';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, Container, IconButton, ThemeProvider } from '@mui/material';


const meta = {
    title: 'Components/MenuBar',
    component: MenuBar,
    tags: ['autodocs'],
    argTypes: {
        menuConfig: {
            control: {
                type: "object",
            },
            description: "Object config for menu structure.",
            table: {
                defaultValue: { summary: "[]", detail: "Empty array = no rendering" },
                type: {
                    summary: "MenuConfig[]",
                    // Note: The string "Array<{" starts at the very beginning of the next line to ensure correct formatting in the Storybook UI display.
                    detail: `
Array<{
    label: string;
    id?: string;
    disabled?: boolean;
    items: Array<
        | {
            kind: "action";
            label: string;
            action: () => void;
            id?: string;
            disabled?: boolean;
            selected?: boolean;
            icon?: React.ReactNode;
            shortcut?: string;
          }
        | {
            kind: "divider";
          }
        | {
            kind: "submenu";
            label: string;
            items: Array</* Recursive reference to this items structure */>;
            id?: string;
            disabled?: boolean;
            selected?: boolean;
            icon?: React.ReactNode;
          }
    >;
}>;
                    `,
                },
            },
        },
    },
} satisfies Meta<typeof MenuBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const nestedMenuConfig: MenuConfig[] = [
    {
        label: "File",
        items: [
            { kind: "action", label: "Hello", action: () => console.log("New file"), icon: <FileCopy /> },
            { kind: "action", label: "Open", action: () => console.log("Open file action triggered"), icon: <FolderOpen />, shortcut: "Ctrl+O", disabled: true },
            { kind: "divider" },
            { kind: "action", label: "Save", action: () => console.log("Save file"), icon: <Save />,  shortcut: "Ctrl+S" },
            { kind: "action", label: "Exit", action: () => console.log("Exit application"), icon: <ExitToApp /> },
        ],
    },
    {
        label: "Edit",
        items: [
            { kind: "action", label: "Undo", action: () => console.log("Undo"), icon: <Undo />, shortcut: "Ctrl+Z" },
            { kind: "action", label: "Redo", action: () => console.log("Redo"), icon: <Redo />, shortcut: "Ctrl+Y" },
            { kind: "divider" },
            {
                kind: "submenu",
                label: "Other",
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
            { kind: "action", label: "Zoom In", action: () => console.log("Zoom In"), icon: <ZoomIn />, shortcut: "Ctrl+Plus" },
            { kind: "action", label: "Zoom Out", action: () => console.log("Zoom Out"), icon: <ZoomOut />, shortcut: "Ctrl+Minus" },
        ],
    },
];

export const ComponentPreview: Story = {
    args: {
        menuConfig: nestedMenuConfig,
    },
    render: (args: MenuBarProps) => {
        const [mode, setMode] = React.useState<'light' | 'dark'>('light');
        const theme = React.useMemo(() => createTheme({ palette: { mode } }), [mode]);

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <MenuBar {...args} />
                    <IconButton aria-label="toggle color scheme" color="inherit" onClick={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))}>
                        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Container>
            </ThemeProvider>
        );
    }
};  