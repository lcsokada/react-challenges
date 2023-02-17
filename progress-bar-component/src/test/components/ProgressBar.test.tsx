import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ProgressBar from '../../components/ProgressBar'

describe('ProgressBar', () => {
  it('renders progress bar percentage text', () => {
    render(
      <ProgressBar />
    )
    
    const textBox = screen.getByText('Input Percentage:')
    
    expect(textBox).toBeInTheDocument()
  })
  
  it('renders percentege input', () => {
    render(
      <ProgressBar />
    )
    
    const input = screen.getByRole('spinbutton')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('value', '0')
  })
  
  it('renders slider div', () => {
    render(
      <ProgressBar />
    )
    
    const sliderDiv = screen.getByTitle('slider')
    
    expect(sliderDiv).toBeInTheDocument()
    expect(sliderDiv).toHaveTextContent('0%')
  })
  
  it('change input value must change progress bar for values between 0 and 100', () => {
    render(
      <ProgressBar />
    )
    
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, {
      target: {
        value: 40
      }
    })
    
    const sliderDiv = screen.getByTitle('slider')
    expect(sliderDiv).toHaveTextContent('40%')
  })
  
  it('change input value must change progress bar to 0 for values greather than 100', () => {
    render(
      <ProgressBar />
    )
    
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, {
      target: {
        value: 120
      }
    })
    
    const sliderDiv = screen.getByTitle('slider')
    expect(sliderDiv).toHaveTextContent('100%')
  })
  
  it('change input value must change progress bar to 0 for values lesser than 0', () => {
    render(
      <ProgressBar />
    )
    
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, {
      target: {
        value: -12
      }
    })
    
    const sliderDiv = screen.getByTitle('slider')
    expect(sliderDiv).toHaveTextContent('0%')
  })
})