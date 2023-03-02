import Label from '../Label'

interface Props {
  content?: string
  type?: 'numeric' | 'operator'
  setPressedKey: React.Dispatch<React.SetStateAction<string>>
}

const CalculatorKey = ({content = '', type, setPressedKey}: Props) => {
  const numericRegex = new RegExp('^[0-9]$')
  
  const testNumericContent = () => {
    if(!numericRegex.test(content)) {
      content = 'ERROR'
    }
    
    return content
  }
  
  const handleButtonClick = () => {
    setPressedKey(content)
  }
  
  return (
    <button type='button' name={type} onClick={handleButtonClick}>
      <Label>
        {type === 'numeric' ? testNumericContent() : content}
      </Label>
    </button>
  )
}

export default CalculatorKey