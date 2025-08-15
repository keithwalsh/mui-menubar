/**
 * @fileoverview Tests the early error branches in `CascadingMenuItem` when
 * required context values are missing.
 */

import React from 'react'
import { render } from '@testing-library/react'
import { CascadingMenuItem, CascadingContext } from '../src/components/CascadingMenu'
import { MenuItems } from '../src/types'

const actionItem: MenuItems = {
  kind: 'action',
  label: 'X',
  action: jest.fn()
}

describe('CascadingMenuItem error branches', () => {
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  it('throws when rootPopupState is missing', () => {
    expect(() => render(
      <CascadingContext.Provider value={{ rootPopupState: null as any, parentPopupState: null as any }}>
        <CascadingMenuItem {...actionItem} />
      </CascadingContext.Provider>
    )).toThrow('must be used inside a CascadingMenu')
  })

  it('throws when parentPopupState is missing', () => {
    const mockRoot = { close: jest.fn() } as any
    expect(() => render(
      <CascadingContext.Provider value={{ rootPopupState: mockRoot, parentPopupState: null as any }}>
        <CascadingMenuItem {...actionItem} />
      </CascadingContext.Provider>
    )).toThrow('must have a parent popup state for submenu')
  })
})


