import { render, screen } from '@testing-library/react'
import React from 'react'
import ResultInput from '../../components/ResultInput'

describe('ResultInputTest', () => {
  it('renders a input', () => {
    render(
      <ResultInput />
    )
    
    const resultInput = screen.getByRole('textbox')
    expect(resultInput).toBeInTheDocument()
    expect(resultInput).toHaveAttribute('type', 'text')
  })
  
  it('must be read only', () => {
    render(
      <ResultInput />
    )
    
    const resultInput = screen.getByRole('textbox')
    expect(resultInput).toHaveAttribute('readOnly')
  })
  
  it('must have value zero when doesn\'t receive props', () => {
    render(
      <ResultInput />
    )
    
    const resultInput = screen.getByRole('textbox')
    expect(resultInput).toHaveAttribute('value', '0')
  })
  
  it('must have the value passed by props', () => {
    render(
      <ResultInput calculatedValue={50} />
    )
    
    const resultInput = screen.getByRole('textbox')
    expect(resultInput).toHaveAttribute('value', '50')
  })
  
  it('must have value "ERROR" when NaN is passed in props', () => {
    render(
      <ResultInput calculatedValue={NaN} />
    )
    
    const resultInput = screen.getByRole('textbox')
    expect(resultInput).toHaveAttribute('value', 'ERROR')
  })
})