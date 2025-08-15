/**
 * @fileoverview Tests `MainMenuRenderer` global mousemove hover navigation
 * behavior across top-level menu buttons.
 */

import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MainMenuRenderer } from '../src/components/MainMenuRenderer'
import { MenuConfig } from '../src/types'

const config: MenuConfig[] = [
  { label: 'File', items: [{ kind: 'action', label: 'A', action: jest.fn() }] },
  { label: 'Edit', items: [{ kind: 'action', label: 'B', action: jest.fn() }] }
]

describe('MainMenuRenderer hover navigation', () => {
  it('navigates to another menu via global mouse move when active', async () => {
    render(<MainMenuRenderer menuConfig={config} />)
    const user = userEvent.setup()

    const fileButton = screen.getByRole('button', { name: /file/i }) as HTMLButtonElement
    const editButton = screen.getByRole('button', { name: /edit/i }) as HTMLButtonElement

    ;(fileButton.getBoundingClientRect as any) = () => ({ left: 0, right: 50, top: 0, bottom: 20 })
    ;(editButton.getBoundingClientRect as any) = () => ({ left: 60, right: 110, top: 0, bottom: 20 })

    await user.click(fileButton)

    await act(async () => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 65, clientY: 10, bubbles: true }))
    })

    expect(await screen.findByText('B')).toBeInTheDocument()
  })
})


