# Ⓜ ─ mui-menubar ─ 🍫

![Build](https://github.com/keithwalsh/mui-menubar/actions/workflows/build.yml/badge.svg)
[![codecov](https://codecov.io/gh/keithwalsh/mui-menubar/branch/main/graph/badge.svg)](https://codecov.io/gh/keithwalsh/mui-menubar)
[![Code Climate](https://codeclimate.com/github/keithwalsh/mui-menubar/badges/gpa.svg)](https://codeclimate.com/github/keithwalsh/mui-menubar)
[![code quality](https://img.shields.io/codefactor/grade/github/keithwalsh/obsidian-kbd)](https://www.codefactor.io/repository/github/keithwalsh/obsidian-kbd)
[![NPM Version](https://img.shields.io/npm/v/mui-menubar.svg)](https://www.npmjs.com/package/mui-menubar)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

A React stateful **MenuBar** component built with **Material-UI (MUI)**, providing a customizable and accessible menu bar implementation for applications. A menu bar is common in desktop applications and provides quick access to a consistent set of commands (e.g. File, Edit, View).

## 🚀 Features

- Cascading menus with unlimited nesting
- Light and dark theme support
- Activation on click, navigation on hover
- Keyboard shortcuts
- Support for integrating components as a custom menu item
- Material-UI icons integration

## 📦 Basic Implementation
### Installation
1. Install the package
```
npm install mui-menubar
```
2. Ensure MUI peer dependencies are present in your project

For MUI v7:
```
npm install @mui/material@^7 @mui/icons-material@^7 @emotion/react @emotion/styled
```


### Compatibility

- React: ^17 or ^18
- MUI: v7
- TypeScript: 5.x recommended (for typings)
### Basic usage example:
```tsx
import { MenuBar, MenuConfig } from 'mui-menubar';
import { FileCopy, Save } from '@mui/icons-material';

const App = () => {
  const menuConfig: MenuConfig[] = [
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
      color="transparent"
    />
  );
};
```

## ⚙️ API Reference

### MenuBar Interface
```tsx
interface MenuBarProps {
    config?: MenuConfig[]; // Menu structure configuration (defaults to [])
    color?: "default" | "primary" | "secondary" | "inherit" | "transparent"; // AppBar color (default: "transparent")
    sx?: SxProps<Theme>; // MUI styling overrides passed to AppBar
    disableRipple?: boolean; // Disable ripple on menu items
}
```

### Exports

- `MenuBar` (named export)
- Types: `MenuConfig`, `MenuItems`, `MenuItemAction`, `MenuItemDivider`, `MenuItemSubmenu`

```ts
import { MenuBar, MenuConfig } from 'mui-menubar';
```
## 📚 Menu Configuration
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
    disabled?: boolean, // Disable user interaction
    selected?: boolean, // Visual selected state
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

## ⏩ Advanced Usage Examples

### Theme Configuration

```tsx
<MenuBar
    config={menuConfig}
    color="primary"
    sx={{ backgroundColor: '#1a1a1a' }}
/>
```

### Custom Menu with Icons

```tsx
const menuConfig: MenuConfig[] = [
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

## 🚨 Important Notes for Implementation

1. **Icon Integration**
   - Requires @mui/icons-material package
   - Icons should be passed as React elements

2. **Keyboard Shortcuts**
   - Automatically registered when a menu item has both `shortcut` and `action`
   - Case-insensitive; extra spaces are ignored
   - Normalized format: `ctrl+alt+shift+meta+<key>` (modifiers in that order)
   - Supported modifiers: Ctrl, Alt, Shift, Meta (Cmd on macOS)
   - Examples: "Ctrl+S", "Shift+A", "Cmd+P"

3. **Styling**
   - Uses Material-UI's sx prop for custom styling
   - Supports all Material-UI theme configurations

4. **Performance Considerations**
   - Keyboard listeners attach only when shortcuts are present
   - Consider memoizing expensive custom components

5. **Accessibility**
   - Supports keyboard navigation
   - ARIA attributes automatically handled

6. **Interaction Model**
   - Activation on click, navigation on hover
   - After clicking a top-level item, the menu stays active; hovering another top-level item switches submenus without extra clicks.
   - Submenus open on hover for seamless navigation
   - Click outside to close the menu and exit active state

## 🎨 Common Customization Patterns

1. **Dynamic Menu Items**
   - `config` can be updated dynamically
   - Useful for context-sensitive menus

2. **Theme Integration**
   - Automatically integrates with Material-UI theme
   - Can be overridden with `sx` prop

## 🚫 Error Handling
- Invalid `config` shapes are prevented by TypeScript in TS projects
- Disabled items prevent user interaction
- Runtime protects against missing handlers for non-custom items

## 🛠️ Development

### Project Structure

```
mui-menubar/
├── src/
│   ├── components/     # React components
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── index.ts       # Main entry point
├── stories/          # Storybook stories
├── tests/           # Jest test files
└── dist/           # Compiled output
```

### Scripts

- `npm run build` - Build the project
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

### Testing

The project uses Jest for testing. Tests are located in the `tests` directory. Run tests using:

```bash
npm run test
```

### Storybook

Component documentation and examples are available through Storybook. Run:

```bash
npm run storybook
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
