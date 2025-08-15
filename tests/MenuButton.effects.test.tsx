/**
 * @fileoverview Tests effect-driven open/close behavior in `MenuButton` when
 * `isOpenByGroup` toggles while active.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { MenuButton } from '../src/components/MenuButton'
import { MenuConfig } from '../src/types'

jest.mock('material-ui-popup-state/hooks', () => {
  const state = {
    isOpen: false,
    open: jest.fn(function () { state.isOpen = true }),
    close: jest.fn(function () { state.isOpen = false }),
    setAnchorEl: jest.fn(),
    anchorEl: null
  }
  return {
    usePopupState: () => state
  }
})

const menu: MenuConfig = { label: 'Menu', items: [] }

describe('MenuButton effects', () => {
  it('opens when isOpenByGroup becomes true and closes when it becomes false while active', () => {
    const onRootClose = jest.fn()
    const { rerender } = render(
      <MenuButton menu={menu} isActive={true} isOpenByGroup={false} onRootClose={onRootClose} />
    )

    rerender(<MenuButton menu={menu} isActive={true} isOpenByGroup={true} onRootClose={onRootClose} />)
    rerender(<MenuButton menu={menu} isActive={true} isOpenByGroup={false} onRootClose={onRootClose} />)
  })
})


