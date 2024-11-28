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
              kind: "action",
              label: "Save",
              action: () => console.log("Saving..."),
              icon: <Save />,
              shortcut: "Ctrl+S"
            }
          ]
        },
        {
          label: "Edit",
          items: [
            {
              kind: "action",
              label: "Undo",
              action: () => console.log("Undo"),
              icon: <Undo />,
              shortcut: "Ctrl+Z"
            },
            {
              kind: "action",
              label: "Redo",
              action: () => console.log("Redo"),
              icon: <Redo />,
              shortcut: "Ctrl+Y"
            },
            { kind: "divider"},
            {
              kind: "submenu",
              label: "Clipboard",
              items: [
                {
                  kind: "action",
                  label: "Copy",
                  action: () => console.log("Copy"),
                  icon: <ContentCopy />,
                  shortcut: "Ctrl+C"
                },
                {
                  kind: "action",
                  label: "Paste",
                  action: () => console.log("Paste"),
                  icon: <ContentPaste />,
                  shortcut: "Ctrl+V"
                }
              ]
            }
          ]
        }
    ]
```

### Example Integration

```tsx
import { MenuBar, MenuConfig } from "mui-menubar";
import { 
    Save, 
    FolderOpen, 
    ContentCopy, 
    ContentPaste,
    Undo,
    Redo 
  } from '@mui/icons-material';

const menuConfig: MenuConfig[] = [
    /* ... as defined above ... */
];

const App: React.FC = () => (
    <MenuBar 
        config={menuConfig}
        colorTheme="light"
        color="transparent"
        disableRipple={true}
        transitionDuration={200}
        sx={{ 
          borderBottom: '1px solid #eee',
          boxShadow: 'none'
        }}
    />
);

export default App;
```
### Key Implementation Notes:
- Each top-level menu item must have a `label` and `items` array
- Menu items can be actions, dividers, or submenus
- Action items require `label` and `action` properties
- Shortcuts and icons are optional for action items
- Use MUI's sx prop for custom styling
- The component supports both light and dark themes

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
