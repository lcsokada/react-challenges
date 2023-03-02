import { render, queryByAttribute, fireEvent, within } from '@testing-library/react'
import Calculator from '../../components/Calculator'

describe('Calculator', () => {
  const getById = queryByAttribute.bind(null, 'id')
  
  it('must have a result screen', () => {
    const { container } = render(<Calculator />)
    const resultScreenId = 'calculatorResultScreen'
    const resultScreen = getById(container, resultScreenId)
    
    expect(resultScreen).toBeInTheDocument()
  })
  
  it('must have a keyPad', () => {
    const { container } = render(<Calculator />)
    const keyPadId = 'calculatorKeyPad'
    const keyPad = getById(container, keyPadId)
    
    expect(keyPad).toBeInTheDocument()
  })
  
  it('must have zero as initial value', () => {
    const { container } = render(<Calculator />)
    const resultScreenId = 'calculatorResultScreen'
    const resultScreen = getById(container, resultScreenId)
    
    expect(resultScreen).toHaveAttribute('value', '0')
  })
  
  it('must have the clicked button content for numeric button clicks', () => {
    const { container } = render(<Calculator />)
    const pressedKeyContent = '5'
    const resultScreenId = 'calculatorResultScreen'
    const resultScreen = getById(container, resultScreenId)
    const keyPadId = 'calculatorKeyPad'
    const keyPad = getById(container, keyPadId) as HTMLElement
    const pressedKey = within(keyPad).getByRole('button', {name: pressedKeyContent})
    
    fireEvent.click(pressedKey)
    
    expect(resultScreen).toHaveAttribute('value', pressedKeyContent)
  })
  
  it('must not have the clicked button content for operator button clicks', () => {
    const { container } = render(<Calculator />)
    const defaultValue = '0'
    const pressedKeyContent = '+'
    const resultScreenId = 'calculatorResultScreen'
    const resultScreen = getById(container, resultScreenId)
    const keyPadId = 'calculatorKeyPad'
    const keyPad = getById(container, keyPadId) as HTMLElement
    const pressedKey = within(keyPad).getByRole('button', {name: pressedKeyContent})
    
    fireEvent.click(pressedKey)
    
    expect(resultScreen).toHaveAttribute('value', defaultValue)
  })
  
  it('must have "ERROR" as result when a operand is clicked side by side', () => {
    const { container } = render(<Calculator />)
    const resultScreenId = 'calculatorResultScreen'
    const resultScreen = getById(container, resultScreenId)
    const keyPadId = 'calculatorKeyPad'
    const keyPad = getById(container, keyPadId) as HTMLElement
    
    const firstOperatorButton = within(keyPad).getByRole('button', {name: '-'})
    const secondOperatorButton = within(keyPad).getByRole('button', {name: '+'})
    
    fireEvent.click(firstOperatorButton)
    fireEvent.click(secondOperatorButton)
    
    expect(resultScreen).toHaveAttribute('value', 'ERROR')
  })
  
  it('the click sequence "5 + 2" followed by click in "=" must result in "7"', () => {
    const { container } = render(<Calculator />)
    const resultScreenId = 'calculatorResultScreen'
    const resultScreen = getById(container, resultScreenId)
    const keyPadId = 'calculatorKeyPad'
    const keyPad = getById(container, keyPadId) as HTMLElement
    
    const firstOperandButton = within(keyPad).getByRole('button', {name: '5'})
    const firstOperatorButton = within(keyPad).getByRole('button', {name: '+'})
    const secondOperandButton = within(keyPad).getByRole('button', {name: '2'})
    const secondOperatorButton = within(keyPad).getByRole('button', {name: '='})
    
    fireEvent.click(firstOperandButton)
    fireEvent.click(firstOperatorButton)
    fireEvent.click(secondOperandButton)
    fireEvent.click(secondOperatorButton)
    
    expect(resultScreen).toHaveAttribute('value', '7')
  })
  
  it('the click sequence "5 + 2" followed by click in "+" must result in "7"', () => {
    const { container } = render(<Calculator />)
    const resultScreenId = 'calculatorResultScreen'
    const resultScreen = getById(container, resultScreenId)
    const keyPadId = 'calculatorKeyPad'
    const keyPad = getById(container, keyPadId) as HTMLElement
    
    const firstOperandButton = within(keyPad).getByRole('button', {name: '5'})
    const firstOperatorButton = within(keyPad).getByRole('button', {name: '+'})
    const secondOperandButton = within(keyPad).getByRole('button', {name: '2'})
    const secondOperatorButton = within(keyPad).getByRole('button', {name: '+'})
    
    fireEvent.click(firstOperandButton)
    fireEvent.click(firstOperatorButton)
    fireEvent.click(secondOperandButton)
    fireEvent.click(secondOperatorButton)
    
    expect(resultScreen).toHaveAttribute('value', '7')
  })
  
  it('the click sequence "5 + 2 + 3" followed by click in "=" must result in "10"', () => {
    const { container } = render(<Calculator />)
    const resultScreenId = 'calculatorResultScreen'
    const resultScreen = getById(container, resultScreenId)
    const keyPadId = 'calculatorKeyPad'
    const keyPad = getById(container, keyPadId) as HTMLElement
    
    const firstOperandButton = within(keyPad).getByRole('button', {name: '5'})
    const firstOperatorButton = within(keyPad).getByRole('button', {name: '+'})
    const secondOperandButton = within(keyPad).getByRole('button', {name: '2'})
    const secondOperatorButton = within(keyPad).getByRole('button', {name: '+'})
    const thirdOperandButton = within(keyPad).getByRole('button', {name: '3'})
    const thirdOperatorButton = within(keyPad).getByRole('button', {name: '='})
    
    fireEvent.click(firstOperandButton)
    fireEvent.click(firstOperatorButton)
    fireEvent.click(secondOperandButton)
    fireEvent.click(secondOperatorButton)
    fireEvent.click(thirdOperandButton)
    fireEvent.click(thirdOperatorButton)
    
    expect(resultScreen).toHaveAttribute('value', '10')
  })
  
  it('the click sequence "5 + 2 + 3" followed by click in "+" must result in "10"', () => {
    const { container } = render(<Calculator />)
    const resultScreenId = 'calculatorResultScreen'
    const resultScreen = getById(container, resultScreenId)
    const keyPadId = 'calculatorKeyPad'
    const keyPad = getById(container, keyPadId) as HTMLElement
    
    const firstOperandButton = within(keyPad).getByRole('button', {name: '5'})
    const firstOperatorButton = within(keyPad).getByRole('button', {name: '+'})
    const secondOperandButton = within(keyPad).getByRole('button', {name: '2'})
    const secondOperatorButton = within(keyPad).getByRole('button', {name: '+'})
    const thirdOperandButton = within(keyPad).getByRole('button', {name: '3'})
    const thirdOperatorButton = within(keyPad).getByRole('button', {name: '+'})
    
    fireEvent.click(firstOperandButton)
    fireEvent.click(firstOperatorButton)
    fireEvent.click(secondOperandButton)
    fireEvent.click(secondOperatorButton)
    fireEvent.click(thirdOperandButton)
    fireEvent.click(thirdOperatorButton)
    
    expect(resultScreen).toHaveAttribute('value', '10')
  })
})
