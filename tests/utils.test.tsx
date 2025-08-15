import { isDivider, useMenuHotkeys } from '../src/utils'
import { MenuItems, MenuConfig } from '../src/types'
import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'

describe('Utils', () => {
  describe('isDivider', () => {
    it('correctly identifies divider items', () => {
      const dividerItem: MenuItems = { kind: 'divider' }
      const actionItem: MenuItems = { 
        kind: 'action', 
        label: 'Test', 
        action: jest.fn() 
      }
      
      expect(isDivider(dividerItem)).toBe(true)
      expect(isDivider(actionItem)).toBe(false)
    })
  })

  describe('useMenuHotkeys', () => {
    it('registers hotkeys for menu items with shortcuts', () => {
      const action = jest.fn()
      const config: MenuConfig[] = [{
        label: 'File',
        items: [
          { 
            kind: 'action', 
            label: 'New', 
            action, 
            shortcut: 'ctrl+n' 
          }
        ]
      }]

      renderHook(() => useMenuHotkeys(config))

      // Simulate keyboard shortcut
      act(() => {
        const event = new KeyboardEvent('keydown', {
          key: 'n',
          ctrlKey: true
        })
        document.dispatchEvent(event)
      })

      expect(action).toHaveBeenCalled()
    })

    it('normalizes shortcut synonyms (cmd/option/shift) and fires action', () => {
      const action = jest.fn()
      const config: MenuConfig[] = [{
        label: 'File',
        items: [
          {
            kind: 'action',
            label: 'Do',
            action,
            shortcut: 'Command + Option + Shift + X'
          }
        ]
      }]

      renderHook(() => useMenuHotkeys(config))

      act(() => {
        const event = new KeyboardEvent('keydown', {
          key: 'x',
          altKey: true,
          shiftKey: true,
          metaKey: true
        })
        document.dispatchEvent(event)
      })

      expect(action).toHaveBeenCalled()
    })

    it('does nothing on keydown with no key and no modifiers', () => {
      const action = jest.fn()
      const config: MenuConfig[] = [{
        label: 'File',
        items: [
          { kind: 'action', label: 'New', action, shortcut: 'ctrl+n' }
        ]
      }]

      renderHook(() => useMenuHotkeys(config))

      act(() => {
        const event = new KeyboardEvent('keydown', {})
        document.dispatchEvent(event)
      })

      expect(action).not.toHaveBeenCalled()
    })

    it('does not fire action for modifiers-only key events', () => {
      const action = jest.fn()
      const config: MenuConfig[] = [{
        label: 'File',
        items: [
          { kind: 'action', label: 'New', action, shortcut: 'ctrl+n' }
        ]
      }]

      renderHook(() => useMenuHotkeys(config))

      act(() => {
        const ctrlOnly = new KeyboardEvent('keydown', { key: 'Control', ctrlKey: true })
        document.dispatchEvent(ctrlOnly)
      })

      expect(action).not.toHaveBeenCalled()
    })

    it('ignores items whose shortcuts normalize to null (empty/whitespace)', () => {
      const action = jest.fn()
      const config: MenuConfig[] = [{
        label: 'File',
        items: [
          { kind: 'action', label: 'No Hotkey', action, shortcut: '   ' }
        ]
      }]

      renderHook(() => useMenuHotkeys(config))

      act(() => {
        const event = new KeyboardEvent('keydown', { key: 'n' })
        document.dispatchEvent(event)
      })

      expect(action).not.toHaveBeenCalled()
    })
  })
}) 