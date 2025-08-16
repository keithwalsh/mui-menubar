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

    it('handles shortcut with meta, alt, and shift modifiers', () => {
      const action = jest.fn()
      const config: MenuConfig[] = [{
        label: 'File',
        items: [
          {
            kind: 'action',
            label: 'Do',
            action,
            shortcut: 'meta+alt+shift+x'
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

    it('registers multiple shortcuts correctly', () => {
      const action1 = jest.fn()
      const action2 = jest.fn()
      const config: MenuConfig[] = [{
        label: 'File',
        items: [
          { kind: 'action', label: 'New', action: action1, shortcut: 'ctrl+n' },
          { kind: 'action', label: 'Save', action: action2, shortcut: 'ctrl+s' }
        ]
      }]

      renderHook(() => useMenuHotkeys(config))

      // Test first shortcut
      act(() => {
        const event = new KeyboardEvent('keydown', {
          key: 'n',
          ctrlKey: true
        })
        document.dispatchEvent(event)
      })

      expect(action1).toHaveBeenCalled()
      expect(action2).not.toHaveBeenCalled()

      // Reset and test second shortcut
      action1.mockClear()
      action2.mockClear()

      act(() => {
        const event = new KeyboardEvent('keydown', {
          key: 's',
          ctrlKey: true
        })
        document.dispatchEvent(event)
      })

      expect(action1).not.toHaveBeenCalled()
      expect(action2).toHaveBeenCalled()
    })
  })
}) 