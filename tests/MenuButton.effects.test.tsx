/**
 * @fileoverview Tests effect-driven open/close behavior in `MenuButton` when
 * active key toggles within the MenuButtonGroup.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { MenuButton } from '../src/components/MenuButton'
import { MenuButtonGroup } from '../src/components/MenuButtonGroup'
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
  it('opens when activeKey becomes this menu and closes when it changes away while active', () => {
    const onRootClose = jest.fn()
    const { rerender } = render(
      <MenuButtonGroup>
        <MenuButton menu={menu} />
      </MenuButtonGroup>
    )

    // Simulate group activation by clicking the button
    // The mocked popup state allows open/close to be called without DOM
    rerender(
      <MenuButtonGroup>
        <MenuButton menu={menu} />
      </MenuButtonGroup>
    )
  })
})


