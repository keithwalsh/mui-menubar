# Ⓜ ─ mui-menubar ─ 🍫

![Build](https://github.com/keithwalsh/mui-menubar/actions/workflows/build.yml/badge.svg)
[![Code Climate](https://codeclimate.com/github/keithwalsh/mui-menubar/badges/gpa.svg)](https://codeclimate.com/github/keithwalsh/mui-menubar)
[![Package Quality](https://packagequality.com/shield/mui-menubar.svg)](https://packagequality.com/#?package=mui-menubar)
[![NPM Version](https://img.shields.io/npm/v/mui-menubar.svg)](https://www.npmjs.com/package/mui-menubar)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

A React **MenuBar** component package that provides a **Material-UI (MUI)** based menu bar implementation. A menu bar is common in desktop applications and provides quick access to a consistent set of commands (e.g. File, Edit, View). The core functionality is in the `MenuBar` component which supports nested menus, keyboard shortcuts, and theming.

## 🚀 Features

- Cascading menus with unlimited nesting
- Light and dark theme support
- Keyboard shortcuts
- Custom menu items
- Hover or click activation
- Material-UI icons integration

## 📦 Basic Implementation
1. First, install the package and its peer dependencies:
```
# Install the menu bar package
npm install @your-scope/menubar-component

# Install peer dependencies (if not already in your project)
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled material-ui-popup-state react-hotkeys-hook
```
2. Basic usage example:
```tsx
import { MenuBar, MenuConfig } from 'mui-menubar';
import { FileCopy, Save } from '@mui/icons-material';

const App = () => {
  const menuConfig = [
    {
      label: "File",
      items: [
        {
          kind: "action",
          label: "New",
          action: () => console.log("New file"),
          icon: <FileCopy />,
          shortcut: "Ctrl+N"
        },
        {
          kind: "action",
          label: "Save",
          action: () => console.log("Save file"),
          icon: <Save />,
          shortcut: "Ctrl+S"
        }
      ]
    }
  ];

  return (
    <MenuBar 
      config={menuConfig}
      colorTheme="light"
      color="transparent"
    />
  );
};
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

## API Reference

### MenuBar Interface
```tsx
interface MenuBarProps {
    config?: MenuConfig[]; // Menu structure configuration
    colorTheme?: "light" | "dark"; // Theme selection
    color?: "default" | "primary" | "secondary" | "inherit" | "transparent";
    sx?: SxProps<Theme>; // MUI styling overrides
    disableRipple?: boolean; // Disable click animation
    transitionDuration?: TransitionDuration;
}
```
## Menu Configuration
### Menu Item Types

The MenuBar supports four types of menu items:

1. **Action Items** (`kind: "action"`): Clickable menu items that trigger a function
```tsx
{
    kind: "action",
    label: "Save",
    action: () => void,
    icon?: React.ReactNode, // Optional Material-UI icon
    shortcut?: string, // Keyboard shortcut
    disabled?: boolean, // If true, the menu item will be disabled
}
```
2. **Divider Items** (`kind: "divider"`): Visual separators between menu items
```tsx
{
    kind: "divider"
}
```
3. **Submenu Items** (`kind: "submenu"`): Nested menus that contain additional menu items
```tsx
{
    kind: "submenu",
    label: "Settings",
    items: MenuItems[], // Nested menu items
    icon?: React.ReactNode
}
```
4. **Custom Items** (`kind: "custom"`): Custom React components rendered within the menu
```tsx
{
    kind: "custom",
    component: React.ReactNode // Any custom React component
}
```

## Advanced Usage Examples

### Theme Configuration

```tsx
<MenuBar
    config={menuConfig}
    colorTheme="dark"
    color="primary"
    sx={{ backgroundColor: '#1a1a1a' }}
/>
```

### Custom Menu with Icons

```tsx
const menuConfig = [{
    label: "Edit",
    items: [
        {
            kind: "action",
            label: "Undo",
            action: () => handleUndo(),
            icon: <Undo />,
            shortcut: "Ctrl+Z"
        },
        {
            kind: "submenu",
            label: "Advanced",
            icon: <Settings />,
            items: [
                {
                    kind: "action",
                    label: "Custom Action",
                    action: () => handleCustomAction()
                }
            ]
        }
    ]
}];
```
### Custom Component Integration
```tsx
{
    kind: "custom",
        component: (
            <TableSizeChooser
                maxRows={10}
                maxCols={10}
                onSizeSelect={(rows, cols) => handleSizeSelect(rows, cols)}
            />
        )
}
```

## Important Notes for Implementation

1. **Icon Integration**
   - Requires @mui/icons-material package
   - Icons should be passed as React elements

2. **Keyboard Shortcuts**
   - Automatically registered when specified in config
   - Format: "Ctrl+S", "Shift+A", etc.

3. **Styling**
   - Uses Material-UI's sx prop for custom styling
   - Supports all Material-UI theme configurations

4. **Performance Considerations**
   - Menu items are rendered lazily
   - Use memoization for complex custom components

5. **Accessibility**
   - Supports keyboard navigation
   - ARIA attributes automatically handled

## Common Customization Patterns

1. **Changing Menu Activation**
   - Default: Hover activation
   - Can be modified in MenuBar component source

2. **Custom Transitions**
   - Configurable via transitionDuration prop
   - Supports auto, number, or object configuration

3. **Dynamic Menu Items**
   - Config can be updated dynamically
   - Useful for context-sensitive menus

4. **Theme Integration**
   - Automatically integrates with Material-UI theme
   - Can be overridden with sx prop

## Error Handling
- Invalid config structures will be safely ignored
- Disabled items prevent user interaction
- Type checking ensures proper prop usage