# Ⓜ ─ mui-menubar ─ 🍫

![Build](https://github.com/keithwalsh/mui-menubar/actions/workflows/build.yml/badge.svg)
[![Code Climate](https://codeclimate.com/github/keithwalsh/mui-menubar/badges/gpa.svg)](https://codeclimate.com/github/keithwalsh/mui-menubar)
[![Package Quality](https://packagequality.com/shield/mui-menubar.svg)](https://packagequality.com/#?package=mui-menubar)
[![NPM Version](https://img.shields.io/npm/v/mui-menubar.svg)](https://www.npmjs.com/package/mui-menubar)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

A React **MenuBar** component built with **Material-UI (MUI)** and **TypeScript**. A menu bar is common in desktop applications and provides quick access to a consistent set of commands (e.g. File, Edit, View).

## 🚀 Features

-   **Flexible Configuration:** Define multiple top-level menus with nested items, submenus, dividers, actions and hotkeys.
-   **TypeScript:** Strongly typed components and configurations.
-   **Material-UI:** Integrates with MUI's theming and styling.
-   **Accessibility:** Keyboard navigation is supported within dropdowns (e.g., Arrow keys to navigate, Enter to select).

## 📦 Installation

1. Ensure your project meets the peer dependencies before installing.

    ```
    npm install react react-dom @mui/material@^5.0.0 @mui/icons-material@^5.0.0 @emotion/react @emotion/styled
    ```

2. Install `mui-menubar`

    ```
    npm install mui-menubar
    ```

## 🎮 Usage

### Import the Component

```tsx
import React from "react";
import { MenuStrip, MenuConfig } from "react-mui-menustrip-ts";
import { Home, Settings, Help } from "@mui/icons-material";
```

### Define the Menu Configuration

```tsx
const menuConfig: MenuConfig[] = [
    {
        label: "File",
        items: [
            { label: "New", action: () => console.log("New clicked"), icon: Home },
            { label: "Open", action: () => console.log("Open clicked") },
            { kind: "divider" },
            {
                kind: "submenu",
                label: "Recent",
                items: [
                    { label: "Document 1", action: () => console.log("Document 1 clicked") },
                    { label: "Document 2", action: () => console.log("Document 2 clicked") },
                ],
            },
            { label: "Exit", action: () => console.log("Exit clicked") },
        ],
    },
    {
        label: "Edit",
        items: [
            { label: "Undo", action: () => console.log("Undo clicked"), icon: Settings },
            { label: "Redo", action: () => console.log("Redo clicked") },
        ],
    },
    {
        label: "Help",
        items: [
            { label: "Documentation", action: () => console.log("Documentation clicked"), icon: Help },
            { label: "About", action: () => console.log("About clicked") },
        ],
    },
];
```

### Example Integration

```tsx
import React from "react";
import { MenuBar, MenuConfig } from "mui-menubar";
import { Home, Settings, Help } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const menuConfig: MenuConfig[] = [
    /* ... as defined above ... */
];

const theme = createTheme({
    palette: {
        mode: "light", // Change to 'dark' for dark mode
    },
});

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <MenuBar config={menuConfig} darkMode={false} />
    </ThemeProvider>
);

export default App;
```

## 🔧 API Reference

### `MenuStrip` Props

| Prop         | Type             | Description                                  | Default |
| ------------ | ---------------- | -------------------------------------------- | ------- |
| `config`     | `MenuConfig[]`   | Required. Array defining the menu structure. | -       |
| `colorTheme` | `string`         | Changes color styles (e.g. "light" / "dark") | `light` |
| `sx`         | `SxProps<Theme>` | Custom styles for the `AppBar` component.    | -       |

### Type Definitions

`MenuConfig`

```tsx
interface MenuConfig {
    label: string;
    items: MenuItemDefinitionUnion[];
}
```

`MenuItemDefinitionUnion`

```tsx
type MenuItemDefinitionUnion = MenuItemActionDefinition | MenuItemDividerDefinition | MenuItemSubmenuDefinition;
```

`MenuItemActionDefinition`

```tsx
interface MenuItemActionDefinition {
    kind?: "action";
    label: string;
    action: () => void;
    icon?: React.ComponentType<SvgIconProps>;
    shortcut?: string;
}
```

`MenuItemDividerDefinition`

```tsx
interface MenuItemDividerDefinition {
    kind: "divider";
}
```

`MenuItemSubmenuDefinition`

```tsx
export interface MenuItemSubmenuDefinition {
    kind: "submenu";
    label: string;
    items: MenuItemDefinitionUnion[];
    icon?: React.ComponentType<SvgIconProps>;
}
```

## 🗺️ Roadmap

-   **ARIA Attributes:** Properly set for screen readers.
