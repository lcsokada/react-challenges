import React, { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  calculatedValue?: number
}

const ResultInput = ({calculatedValue = 0, ...props}: Props) => {
  return (
    <input
      name='resultInput'
      type='text'
      value={Number.isNaN(calculatedValue) ? 'ERROR' : calculatedValue}
      readOnly
      {...props}
    />
  )
}

export default ResultInput