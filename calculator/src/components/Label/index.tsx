import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Label = ({children} : Props) => {
  return (
    <p>
      {children}
    </p>
  )
}

export default Label