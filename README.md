# Ⓜ ─ mui-menubar ─ 🍫

![Build](https://github.com/keithwalsh/mui-menubar/actions/workflows/build.yml/badge.svg)
[![Code Climate](https://codeclimate.com/github/keithwalsh/mui-menubar/badges/gpa.svg)](https://codeclimate.com/github/keithwalsh/mui-menubar)
[![Package Quality](https://packagequality.com/shield/mui-menubar.svg)](https://packagequality.com/#?package=mui-menubar)
[![NPM Version](https://img.shields.io/npm/v/mui-menubar.svg)](https://www.npmjs.com/package/mui-menubar)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

A React **MenuBar** component package that provides a **Material-UI (MUI)** based menu bar implementation. A menu bar is common in desktop applications and provides quick access to a consistent set of commands (e.g. File, Edit, View). The core functionality is in the `MenuBar` component which supports nested menus, keyboard shortcuts, and theming.

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
            {
              kind: "action",
              label: "Open",
              action: () => console.log("Opening..."),
              icon: <FolderOpen />,
              shortcut: "Ctrl+O"
            },
            { kind: "divider" },
            {
              kind: "submenu",
              label: "Advanced",
              icon: <Settings />,
              items: [
                {
                  kind: "component",
                  component: <CustomComponent />  // Any React component
                }
              ]
            }
          ]
        }
    ]
```

### Type Definitions

`MenuItemComponentDefinition`

```tsx
interface MenuItemComponentDefinition {
    kind: "component";
    component: React.ReactNode;
}
```

### Menu Item Types

The MenuBar supports four types of menu items:

1. **Action Items** (`kind: "action"`): Clickable menu items that trigger a function
2. **Divider Items** (`kind: "divider"`): Visual separators between menu items
3. **Submenu Items** (`kind: "submenu"`): Nested menus that contain additional menu items
4. **Component Items** (`kind: "component"`): Custom React components rendered within the menu

Example of a component menu item:
```tsx
{
    kind: "submenu",
    label: "Table",
    icon: <TableChart />,
    items: [
        {
            kind: "component",
            component: (
                <TableSizeChooser
                    maxRows={10}
                    maxCols={10}
                    currentRows={3}
                    currentCols={3}
                    onSizeSelect={(rows, cols) => 
                        console.log(`Selected: ${rows}x${cols}`)}
                />
            )
        }
    ]
}
```

## API Reference

### MenuBar Props

| Prop         | Type             | Description                                  | Default |
| ------------ | ---------------- | -------------------------------------------- | ------- |
| `config`     | `MenuConfig[]`   | Required. Array defining the menu structure. | -       |
| `colorTheme` | `string`         | Changes color styles (e.g. "light" / "dark") | `light` |
| `sx`         | `SxProps<Theme>` | Custom styles for the `AppBar` component.    | -       |
