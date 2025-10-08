/**
 * @fileoverview Tests for MenuItemAction component verifying rendering,
 * interactions, and visual states.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { MenuItemAction } from '../components/MenuItemAction';
import { FileCopy, Save } from '@mui/icons-material';

describe('MenuItemAction', () => {
  it('should render with label', () => {
    render(<MenuItemAction label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render with left icon', () => {
    render(<MenuItemAction label="Save" leftIcon={<Save data-testid="save-icon" />} />);
    expect(screen.getByTestId('save-icon')).toBeInTheDocument();
  });

  it('should render with shortcut', () => {
    render(<MenuItemAction label="Save" shortcut="Ctrl+S" />);
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });

  it('should render with right icon when no shortcut', () => {
    render(<MenuItemAction label="Copy" rightIcon={<FileCopy data-testid="copy-icon" />} />);
    expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
  });

  it('should not render right icon when shortcut is present', () => {
    render(
      <MenuItemAction 
        label="Copy" 
        rightIcon={<FileCopy data-testid="copy-icon" />} 
        shortcut="Ctrl+C"
      />
    );
    expect(screen.queryByTestId('copy-icon')).not.toBeInTheDocument();
    expect(screen.getByText('Ctrl+C')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<MenuItemAction label="Click Me" onClick={handleClick} />);
    
    const menuItem = screen.getByRole('menuitem');
    fireEvent.click(menuItem);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<MenuItemAction label="Disabled Item" disabled />);
    const menuItem = screen.getByRole('menuitem');
    expect(menuItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render with selected state', () => {
    render(<MenuItemAction label="Selected Item" selected />);
    const menuItem = screen.getByRole('menuitem');
    expect(menuItem).toHaveClass('Mui-selected');
  });

  it('should render all props together', () => {
    const handleClick = jest.fn();
    render(
      <MenuItemAction 
        label="Complete Item"
        leftIcon={<Save data-testid="icon" />}
        shortcut="Ctrl+S"
        onClick={handleClick}
        selected
      />
    );
    
    expect(screen.getByText('Complete Item')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
    expect(screen.getByRole('menuitem')).toHaveClass('Mui-selected');
  });

  it('should be marked as disabled', () => {
    const handleClick = jest.fn();
    render(<MenuItemAction label="Disabled" onClick={handleClick} disabled />);
    
    const menuItem = screen.getByRole('menuitem');
    expect(menuItem).toHaveAttribute('aria-disabled', 'true');
    expect(menuItem).toHaveClass('Mui-disabled');
  });
});

