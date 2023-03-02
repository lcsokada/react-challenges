import { render, screen, within } from '@testing-library/react'
import CalculatorKey from '../../components/CalculatorKey'

const mockedSetPressedKey = jest.fn()

describe('CalculatorKey', () => {
  it('must render a button', () => {
    render(<CalculatorKey setPressedKey={mockedSetPressedKey} />)
    
    const key = screen.getByRole('button')
    expect(key).toBeInTheDocument()
  })
  
  it('must have the content passed in props', () => {
    const content = '5'
    render(<CalculatorKey content={content} setPressedKey={mockedSetPressedKey} />)
    
    const key = screen.getByRole('button')
    expect(within(key).getByText(content)).toBeInTheDocument()
  })
  
  it('must have numeric content when type is numeric', () => {
    const content = '5'
    
    render(<CalculatorKey content={content} type='numeric' setPressedKey={mockedSetPressedKey} />)
    
    const key = screen.getByRole('button')
    
    expect(key).toHaveAttribute('name', 'numeric')
    expect(within(key).getByText(new RegExp('^[0-9]$'))).toBeInTheDocument()
  })
  
  it('must have "ERROR" content when type is numeric but content is not', () => {
    const content = 'A'
    const errorContent = 'ERROR'
    
    render(<CalculatorKey content={content} type='numeric' setPressedKey={mockedSetPressedKey} />)
    
    const key = screen.getByRole('button')
    
    expect(key).toHaveAttribute('name', 'numeric')
    expect(within(key).getByText(errorContent)).toBeInTheDocument()
  })
})

