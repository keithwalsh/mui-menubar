# Ⓜ ─ mui-menubar ─ 🍫

![build](https://github.com/keithwalsh/mui-menubar/actions/workflows/build.yml/badge.svg)
[![codecov](https://codecov.io/gh/keithwalsh/mui-menubar/branch/main/graph/badge.svg)](https://codecov.io/gh/keithwalsh/mui-menubar)
[![Code Climate](https://codeclimate.com/github/keithwalsh/mui-menubar/badges/gpa.svg)](https://codeclimate.com/github/keithwalsh/mui-menubar)
[![code quality](https://img.shields.io/codefactor/grade/github/keithwalsh/obsidian-kbd)](https://www.codefactor.io/repository/github/keithwalsh/obsidian-kbd)
[![NPM Version](https://img.shields.io/npm/v/mui-menubar.svg)](https://www.npmjs.com/package/mui-menubar)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

React MenuBar component built with Material-UI. Supports nested submenus, keyboard shortcuts, icons, and hover navigation.

## Installation

```bash
npm install mui-nested-menu
```

## Usage

```tsx
import { MenuBar, MenuConfig } from 'mui-nested-menu';

const menuConfig: MenuConfig[] = [
  {
    label: 'File',
    items: [
      { kind: 'action', label: 'New', action: () => {}, shortcut: '⌘N' },
      { kind: 'divider' },
      { kind: 'action', label: 'Exit', action: () => {} }
    ]
  }
];

<MenuBar menuConfig={menuConfig} />
```

## MenuConfig

Defines the structure of each top-level menu. Each menu contains:

- `label` - Text displayed in the menu bar
- `items` - Array of menu items (actions, dividers, or submenus)
- `id` - Optional unique identifier
- `disabled` - Optional flag to disable the entire menu

## Menu Items

Three types of menu items:

### Action

Executes a function when clicked.

```tsx
{
  kind: 'action',
  label: 'Save',
  action: () => console.log('saved'),
  shortcut: '⌘S',
  icon: <SaveIcon />,
  disabled: false,
  selected: false
}
```

### Divider

Visual separator between menu items.

```tsx
{
  kind: 'divider'
}
```

### Submenu

Nested menu that opens on hover. Supports infinite nesting depth.

```tsx
{
  kind: 'submenu',
  label: 'Recent Files',
  icon: <FolderIcon />,
  items: [
    { kind: 'action', label: 'file1.txt', action: () => {} },
    { kind: 'action', label: 'file2.txt', action: () => {} }
  ]
}
```

## Components

**MenuBar** - Horizontal bar that renders menu buttons. Handles activation state and hover navigation between menus. Clicking outside any menu closes all open menus.

**MenuButton** - Individual button in the menu bar. Opens a dropdown menu on click. Supports hover navigation when another menu is already open.

**MenuItemAction** - Leaf menu item that executes an action. Displays label, optional icon on left, and optional shortcut or icon on right. Supports selected and disabled states.

**MenuItemSubmenu** - Menu item that opens a submenu on hover. Default delay is 0ms but configurable. Displays chevron icon on the right by default.

**renderMenuItem** - Helper function that renders the appropriate component based on menu item kind (action, divider, or submenu).

## Utilities

**menuUtils.ts** contains:

- `generateMenuItemKey()` - Creates unique keys for React rendering using id, label, or random fallback
- `resolveMenuId()` - Determines menu identifier from id or label
- `NESTED_MENU_SX` - Shared styling for nested Menu components
- Color and alpha constants for consistent theming across menu items

## Props

### MenuBar

```tsx
interface MenuBarProps {
  menuConfig: MenuConfig[];
  sx?: SxProps<Theme>;
}
```

### MenuButton

Internal component. Receives menu configuration, active state, and callbacks for activation/deactivation.

### MenuItemAction

```tsx
interface MenuItemActionProps {
  disabled?: boolean;
  label?: string;
  leftIcon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  rightIcon?: ReactNode;
  shortcut?: string;
  selected?: boolean;
}
```

### MenuItemSubmenu

```tsx
interface MenuItemSubmenuProps {
  parentMenuOpen: boolean;
  label?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  delay?: number;
}
```

## Behavior

- Click a menu button to open its menu
- Click again or click outside to close
- When a menu is open, hovering over other menu buttons switches to that menu
- Submenus open on hover with configurable delay
- Keyboard shortcuts are displayed but not handled by the component
- Menus use zero transition duration for instant response

## License

MIT
