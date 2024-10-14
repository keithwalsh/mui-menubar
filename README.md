# react-mui-menustrip-ts

A React **MenuStrip** component built with **Material-UI (MUI)** and **TypeScript**, offering a flexible and customizable menu system for your React applications, including support for nested submenus.

## Features

-   **Flexible Configuration:** Define multiple top-level menus with nested items, submenus, and dividers.
-   **Nested Submenus:** Support for arbitrarily deep nested submenus.
-   **TypeScript Support:** Strongly typed components and configurations.
-   **Material-UI Integration:** Seamlessly integrates with MUI's theming and styling.
-   **Dark Mode:** Easily toggle between light and dark themes.
-   **Accessibility:** Keyboard navigable and ARIA compliant.

## Installation

1. Ensure your project meets the peer dependencies before installing.

    ```
    npm install react react-dom @mui/material@^5.0.0 @mui/icons-material@^5.0.0 @emotion/react @emotion/styled
    ```

2. Install `react-mui-menustrip-ts`

    ```
    npm install react-mui-menustrip-ts
    ```

## Usage

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
import { MenuStrip, MenuConfig } from "react-mui-menustrip-ts";
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
        <MenuStrip config={menuConfig} darkMode={false} />
    </ThemeProvider>
);

export default App;
```

## API Reference

### `MenuStrip` Props

| Prop       | Type             | Description                                  | Default |
| ---------- | ---------------- | -------------------------------------------- | ------- |
| `config`   | `MenuConfig[]`   | Required. Array defining the menu structure. | -       |
| `darkMode` | `boolean`        | Enables dark mode styling.                   | `false` |
| `sx`       | `SxProps<Theme>` | Custom styles for the `AppBar` component.    | -       |

### Type Definitions

`MenuConfig`

```tsx
export interface MenuConfig {
    label: string;
    items: MenuItemDefinitionUnion[];
}
```

`MenuItemDefinitionUnion`

```tsx
export type MenuItemDefinitionUnion = MenuItemActionDefinition | MenuItemDividerDefinition | MenuItemSubmenuDefinition;
```

`MenuItemActionDefinition`

```tsx
export interface MenuItemActionDefinition {
    kind?: "action";
    label: string;
    action?: () => void;
    icon?: React.ComponentType<SvgIconProps>;
}
```

`MenuItemDividerDefinition`

```tsx
export interface MenuItemDividerDefinition {
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

## Styling and Theming

### Custom Styles with `sx`

```tsx
<MenuStrip
    config={menuConfig}
    darkMode={true}
    sx={{
        backgroundColor: "#333",
        color: "#fff",
    }}
/>
```

### Dark Mode

```tsx
<MenuStrip config={menuConfig} darkMode={true} />
```

## Accessibility

-   **Keyboard Navigation:** Open menus with Enter or Space, navigate with arrow keys.
-   **ARIA Attributes:** Properly set for screen readers.
-   **Focus Management:** Ensures focus is handled when menus open/close.
