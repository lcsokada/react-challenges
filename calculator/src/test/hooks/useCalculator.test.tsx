import { renderHook, act, waitFor } from '@testing-library/react'
import {useCalculator} from '../../hooks/useCalculator'

describe('useCalculator', () => {
  describe('key operators', () => {
    it('must have array with length 2', () => {
      const { result } = renderHook(useCalculator)
      
      expect(result.current.pressedKeysList().length).toBe(2)
    })
    
    it('must have the correct inserted values', () => {
      const { result } = renderHook(useCalculator)
      
      act(() => result.current.push('2'))
      act(() => result.current.push('3'))
      
      expect(result.current.pressedKeysList()).toStrictEqual(['2', '3'])
    })
    
    it('when push 3 elements, the third must become the second and the second become the first in the array', () => {
      const { result } = renderHook(useCalculator)
      
      act(() => result.current.push('2'))
      act(() => result.current.push('3'))
      act(() => result.current.push('4'))
      
      expect(result.current.pressedKeysList()).toStrictEqual(['3', '4'])
    })
    
    it('when push 4 elements, the third must become the first and the fourth become the second in the array', () => {
      const { result } = renderHook(useCalculator)
      
      act(() => result.current.push('2'))
      act(() => result.current.push('3'))
      act(() => result.current.push('4'))
      act(() => result.current.push('5'))
      
      expect(result.current.pressedKeysList()).toStrictEqual(['4', '5'])
    })
    
    it('must return type "numeric" for numbers', () => {
      const { result } = renderHook(useCalculator)
      
      expect(result.current.getKeyType('1')).toBe('numeric')
    })
    
    it('must return type "operator" for operator DEL', () => {
      const { result } = renderHook(useCalculator)
      
      expect(result.current.getKeyType('DEL')).toBe('operator')
    })
  })
  
  describe('arithimatic expression', () => {
    it('the input buttons "2 + 2 =" must result in 4', async () => {
      console.log('no teste ---------------------------------')
      const { result } = renderHook(useCalculator)
      
      act(() => result.current.push('2'))
      act(() => result.current.push('+'))
      act(() => result.current.push('2'))
      act(() => result.current.push('='))
            
      console.log('em 2 + 2 = ', result.current.expressionResult)
      console.log('fim do teste ---------------------------------')
      
      expect(result.current.expressionResult).toBe(4)
    })
    
    it('the input buttons "2 + 2 +" must result in 4', () => {
      const { result } = renderHook(useCalculator)
      act(() => result.current.push('2'))
      act(() => result.current.push('+'))
      act(() => result.current.push('2'))
      act(() => result.current.push('+'))
      
      expect(result.current.expressionResult).toBe(4)
    })
    
    it('the input buttons "2 + 2 + 2 =" must result in 6', () => {
      const { result } = renderHook(useCalculator)
      act(() => result.current.push('2'))
      act(() => result.current.push('+'))
      act(() => result.current.push('2'))
      act(() => result.current.push('+'))
      act(() => result.current.push('2'))
      act(() => result.current.push('='))
      
      expect(result.current.expressionResult).toBe(6)
    })
  })
})


