import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useCalculator = () => {
  const [arithmeticExp, setArithmeticExp] = useState('')
  const lastPressedKeys = useRef(Array<string>(2))
  const lastResult = useRef('')
  
  useEffect(() => {
    console.log(arithmeticExp)
  }, [arithmeticExp])
  
  const pressedKeysList: () => readonly string[] = () => {
    return lastPressedKeys.current
  }
  
  const push: (insertedKey: string) => readonly string[] = useCallback((insertedKey) => {
    lastPressedKeys.current.push(insertedKey)
    lastPressedKeys.current = lastPressedKeys.current.slice(1)
    setArithmeticExp(arithmeticExp.concat(insertedKey))
    
    return lastPressedKeys.current
  }, [arithmeticExp])
  
  const getKeyType: (insertedKey: string) => 'numeric' | 'operator' | undefined = useCallback((insertedKey) => {
    const operators = ['+', '-', '/', 'X', '=', 'DEL', 'RESET']
    const numericPattern = new RegExp('^[0-9]$')
    
    if(numericPattern.test(insertedKey)) { 
      return 'numeric'
    } else if (operators.includes(insertedKey)) {
      return 'operator'
    }
    
    return undefined
  }, [])
  
  const expressionResult = useMemo(() => {
    const lastDigit = arithmeticExp.at(-1)
    const operatorRegExp = new RegExp('[0-9*][+X\/-][0-9*][+X=\/-]', 'g')
    //2 + 2 -
    if(operatorRegExp.test(arithmeticExp) && getKeyType(lastDigit ?? '') === 'operator') {
      const result = eval(arithmeticExp.slice(0, -1).replace('X', '*'))
      lastResult.current = result
      
      if(lastDigit === '=') { 
        push(result)
        setArithmeticExp(`${result}`)
      } else { 
        setArithmeticExp(`${result}${lastPressedKeys.current.at(-1)}`)
        lastPressedKeys.current[0] = result
      }
      
      return result
    } else {
      return lastResult.current
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arithmeticExp])
  
  
  useEffect(() => {
  }, [expressionResult])
  
  return { 
    pressedKeysList,
    push,
    getKeyType,
    expressionResult
  }
}