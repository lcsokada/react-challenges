import { useRef, useState } from 'react'
import './styles.css'

type Coordinate = {
  xPosition: number,
  yPostion: number
}

let removedCoordinates = Array<Coordinate>()

const ClickDetector = () => {
  const [clickPositions, setClickPositions] = useState(Array<Coordinate>())
  
  const findDuplicated = (coordinate: Coordinate) => {
    return clickPositions.find(({xPosition, yPostion}) => xPosition === coordinate.xPosition && yPostion === coordinate.yPostion)
  }
  
  const insert = (coordinate: Coordinate) => {
    if(!findDuplicated(coordinate)) { 
      setClickPositions([...clickPositions, coordinate])
    }
  }
  
  const handleScreenClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    insert({xPosition: event.pageX, yPostion: event.pageY})
  }
  
  const handleUndoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if(clickPositions.at(-1)) {
      removedCoordinates = removedCoordinates.concat(clickPositions.at(-1)!)
    }
    
    setClickPositions(clickPositions.slice(0, -1))
  }
  
  const handleRedoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    removedCoordinates.at(-1) && insert(removedCoordinates.at(-1)!)
    removedCoordinates = removedCoordinates.slice(0, -1)
  }
  
  const renderCircles = () => {
    return (
      clickPositions.map((coordinate: Coordinate) => 
        <p 
          key={`${coordinate.xPosition}${coordinate.yPostion}`} 
          style={{top: `${coordinate.yPostion}px`, left: `${coordinate.xPosition}px`, margin: 0, display: 'flex', justifyContent: 'space-around', position: 'absolute'}}
        >
          o
        </p>
      )
    )
  }
  
  return (
    <>
    <div className='screenContainer' onClick={handleScreenClick}>
      <button 
        onClick={handleUndoClick}
      >
        undo
      </button>
      <button
        onClick={handleRedoClick}
      >
        redo
      </button>
        {
          clickPositions.length > 0 && renderCircles()
        }
      </div>
    </>
  )
}

export default ClickDetector
