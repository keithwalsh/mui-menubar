import React from 'react'
import { render, screen } from '@testing-library/react'
import { MainMenuRenderer } from '../src/components/MainMenuRenderer'
import { MenuConfig } from '../src/types'

describe('MainMenuRenderer', () => {
    it('handles disabled menu', () => {
        const disabledConfig: MenuConfig[] = [{
            label: 'File',
            disabled: true,
            items: []
        }]
        
        render(<MainMenuRenderer menuConfig={disabledConfig} />)
        const menuButton = screen.getByText('File').closest('button')
        expect(menuButton).not.toBeNull()
        expect(menuButton).toHaveAttribute('disabled')
        expect(menuButton).toHaveClass('Mui-disabled')
    })

    it('handles empty config', () => {
        render(<MainMenuRenderer menuConfig={[]} />)
        const toolbar = screen.getByTestId('menu-toolbar')
        expect(toolbar).toBeInTheDocument()
    })
}) 