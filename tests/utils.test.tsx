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
  })
}) 