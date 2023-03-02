import { render, screen } from '@testing-library/react'
import React from 'react'
import CalculatorKeyPad from '../../components/CalculatorKeyPad'

const mockedSetPressedKey = jest.fn()

describe('CalculatorKeyPad', () => {
  it('must have 18 buttons', () => {
    render(<CalculatorKeyPad setPressedKey={mockedSetPressedKey} />)
    
    const keyCount = 18
    const keys = screen.getAllByRole('button')
    
    expect(keys.length).toBe(keyCount)
  })
  
  it('must have 10 numeric digits', () => {
    render(<CalculatorKeyPad setPressedKey={mockedSetPressedKey} />)
    
    const numericKeysCount = 10
    const allKeys = screen.getAllByRole('button')
    const numericKeys = allKeys.filter(key => key.getAttribute('name') === 'numeric')
    
    expect(numericKeys.length).toBe(numericKeysCount)
  })
})