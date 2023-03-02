import { useEffect, useState } from 'react'
import {useCalculator} from '../../hooks/useCalculator'
import CalculatorKeyPad from '../CalculatorKeyPad'
import ResultInput from '../ResultInput'

const Calculator = () => {
  const {pressedKeysList, push, getKeyType, expressionResult} = useCalculator()
  const [result, setResult] = useState(0)
  const [pressedKey, setPressedKey] = useState('')
  
  useEffect(() => {
    getKeyType(pressedKey) === 'numeric' && setResult(parseFloat(pressedKey))
    push(pressedKey)
    
    pressedKeysList().filter(key => getKeyType(key) === 'operator').length === 2 && setResult(NaN)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedKey])
  
  useEffect(() => {
    if(expressionResult) {
      setResult(expressionResult)
    }
  }, [expressionResult])
  
  return (
    <div>
      <ResultInput calculatedValue={result} id={'calculatorResultScreen'} />
      <CalculatorKeyPad id={'calculatorKeyPad'} setPressedKey={setPressedKey} />
    </div>
  )
}

export default Calculator