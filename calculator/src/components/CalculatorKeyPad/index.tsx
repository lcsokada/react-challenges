import React, { HTMLAttributes, SetStateAction } from 'react'
import CalculatorKey from '../CalculatorKey'

interface Props extends HTMLAttributes<HTMLDivElement> {
  setPressedKey: React.Dispatch<SetStateAction<string>>
}

type keyType = 'numeric' | 'operator' | undefined

const keyArgs = [
  {content: '7', type: 'numeric' },
  {content: '8', type: 'numeric'},
  {content: '9', type: 'numeric'},
  {content: 'DEL', type: 'operator'},
  {content: '4', type: 'numeric'},
  {content: '5', type: 'numeric'},
  {content: '6', type: 'numeric'},
  {content: '+', type: 'operator'},
  {content: '1', type: 'numeric'},
  {content: '2', type: 'numeric'},
  {content: '3', type: 'numeric'},
  {content: '-', type: 'operator'},
  {content: '.', type: 'operator'},
  {content: '0', type: 'numeric'},
  {content: '/', type: 'operator'},
  {content: 'X', type: 'operator'},
  {content: 'RESET', type: 'operator'},
  {content: '=', type: 'operator'},
]

const CalculatorKeyPad = ({setPressedKey ,...props}: Props) => {
  return (
    <div {...props}>
      {keyArgs.map(key => (
        <CalculatorKey content={key.content} type={key.type as keyType} key={key.content} setPressedKey={setPressedKey} />
      ))}
    </div>
  )
}

export default CalculatorKeyPad
