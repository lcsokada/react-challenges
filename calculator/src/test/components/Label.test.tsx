import { render, screen } from '@testing-library/react'
import React from 'react'
import Label from '../../components/Label'
import { element } from '../utils/element'

describe('Label component', () => {
  it('must render a "p" tag with the provided text', () => {
    const textContent = 'test'
    render(
      <Label>
        {textContent}
      </Label>
    )
    const labelContent = screen.getByText(textContent)
    
    expect(labelContent).toBeInTheDocument()
    expect(labelContent.tagName).toBe('P')
  })
})