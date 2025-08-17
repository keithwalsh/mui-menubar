import { render, screen } from '@testing-library/react'
import { RootMenuRenderer } from '../src/components/RootMenuRenderer'
import { MenuConfig } from '../src/types'

describe('RootMenuRenderer', () => {
    it('handles disabled menu', () => {
        const disabledConfig: MenuConfig[] = [{
            label: 'File',
            disabled: true,
            items: []
        }]
        
        render(<RootMenuRenderer menuConfig={disabledConfig} />)
        const menuButton = screen.getByText('File').closest('button')
        expect(menuButton).not.toBeNull()
        expect(menuButton).toHaveAttribute('disabled')
        expect(menuButton).toHaveClass('Mui-disabled')
    })

    it('handles empty config', () => {
        render(<RootMenuRenderer menuConfig={[]} />)
        const toolbar = screen.getByTestId('menu-toolbar')
        expect(toolbar).toBeInTheDocument()
    })
}) 