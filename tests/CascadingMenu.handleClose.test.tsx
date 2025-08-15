/**
 * @fileoverview Tests close handling branches in `CascadingMenu` by mocking
 * Popover to trigger `onClose` with specific reasons.
 */

import React from 'react'
import { render } from '@testing-library/react'
import CascadingMenu from '../src/components/CascadingMenu'

// Partially mock @mui/material to control Popover's onClose reason
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material')
  return {
    ...actual,
    Popover: ({ onClose, children, ...rest }: any) => {
      const reason = (rest['data-test-reason'] as any) ?? 'backdropClick'
      React.useEffect(() => {
        onClose?.({}, reason)
      }, [onClose, reason])
      return <div data-testid="mock-popover">{children}</div>
    }
  }
})

const createMockPopupState = () => ({
  isOpen: true,
  open: jest.fn(),
  close: jest.fn(),
  setOpen: jest.fn(),
  toggle: jest.fn(),
  anchorEl: document.body,
  anchorPosition: undefined,
  setAnchorEl: jest.fn(),
  setAnchorPosition: jest.fn(),
  onMouseLeave: jest.fn(),
  onBlur: jest.fn(),
  popupId: 'test-popup',
  variant: 'popover' as const,
  elementRefKey: null,
  parentPopupState: null,
  hasChildPopup: false,
  setHasChildPopup: jest.fn(),
  setAnchorElUsed: false,
  disableAutoFocus: false,
  _openEventType: null,
  _childPopupState: null,
  _setChildPopupState: jest.fn()
})

describe('CascadingMenu handleClose', () => {
  it('calls popupState.close and onRootClose on backdropClick', () => {
    const popupState = createMockPopupState()
    const onRootClose = jest.fn()

    render(
      <CascadingMenu
        menuItems={[]}
        popupState={popupState as any}
        onRootClose={onRootClose}
        PopoverProps={{ 'data-test-reason': 'backdropClick' } as any}
      />
    )

    expect(popupState.close).toHaveBeenCalled()
    expect(onRootClose).toHaveBeenCalled()
  })

  it('calls popupState.close and onRootClose on escapeKeyDown', () => {
    const popupState = createMockPopupState()
    const onRootClose = jest.fn()

    render(
      <CascadingMenu
        menuItems={[]}
        popupState={popupState as any}
        onRootClose={onRootClose}
        PopoverProps={{ 'data-test-reason': 'escapeKeyDown' } as any}
      />
    )

    expect(popupState.close).toHaveBeenCalled()
    expect(onRootClose).toHaveBeenCalled()
  })
})


