import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MenuBar } from '../src/components/MenuBar';
import { MenuConfig } from '../src/types/types';

describe('MenuBar', () => {
  const mockMenuConfig: MenuConfig[] = [
    {
      label: 'File',
      items: [
        { kind: 'action' as const, label: 'New', action: jest.fn() },
        { kind: 'action' as const, label: 'Open', action: jest.fn() },
      ],
    },
    {
      label: 'Edit',
      items: [
        { kind: 'action' as const, label: 'Cut', action: jest.fn() },
        { kind: 'action' as const, label: 'Copy', action: jest.fn() },
      ],
    },
  ];

  it('renders menu items correctly', () => {
    render(<MenuBar config={mockMenuConfig} />);
    
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('opens submenu on click', async () => {
    render(<MenuBar config={mockMenuConfig} />);
    const user = userEvent.setup();
    
    const fileMenu = screen.getByText('File');
    await user.click(fileMenu);
    
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('calls onClick handler when menu item is clicked', async () => {
    render(<MenuBar config={mockMenuConfig} />);
    const user = userEvent.setup();
    
    const fileMenu = screen.getByText('File');
    await user.click(fileMenu);
    
    const newMenuItem = screen.getByText('New');
    await user.click(newMenuItem);
    
    const newMenuItemConfig = mockMenuConfig[0].items[0];
    if (newMenuItemConfig.kind === 'action') {
      expect(newMenuItemConfig.action).toHaveBeenCalled();
    }
  });
});
