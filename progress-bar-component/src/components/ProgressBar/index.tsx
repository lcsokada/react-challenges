import React, { useRef, useState } from 'react'

const progressContainer = (width: string) => ({
  height: 20,
  width: width,
  backgroundColor: 'red',
  borderRadius: 50,
  margin: 50
})

const filledContained = (completed: number) => ({
  height: 20,
  width: `${completed}%`,
  backgroundColor: 'blue',
  borderRadius: 50,
  cursor: 'move'
})

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(0)
  const divContainerRef = useRef<HTMLDivElement>(null)
  const slidePosition = useRef<number>(0)
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.target.value)
    if(inputValue >= 0 && inputValue <= 100) {
      setPercentage(inputValue)
    } else {
      inputValue < 0 && setPercentage(0)
      inputValue > 100 && setPercentage(100)
    }
  }
  
  const handleOnDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const initialBarPosition = divContainerRef.current?.clientLeft ?? 0
    const barLength = initialBarPosition - initialBarPosition + (0.3 * window.innerWidth)
    slidePosition.current = Math.floor((event.pageX / barLength) * 100)
    if(slidePosition.current > 100) {
      slidePosition.current = 100
    } else if(slidePosition.current < 0) {
      slidePosition.current = 0
    }
    
    setPercentage(slidePosition.current)
  }
  
  return (
    <div>
      <label>Input Percentage:</label>
      <input name='inputPercentage' type='number' value={percentage} onChange={handleInputChange}  />
      <div ref={divContainerRef} style={progressContainer('30%')}>
        <div title='slider' 
          style={filledContained(percentage)}
          onDrag={handleOnDrag}
          onDragEndCapture={handleOnDrag} 
          onDragStartCapture={(e)=>{
            const img = new Image()
            e.dataTransfer.setDragImage(img, 0, 0)}
          }
          draggable
        >
          {`${percentage}%`}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
