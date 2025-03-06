import { ChangeEvent, useState } from "react"
import { TextareaProps } from "../interfaces/components.interfaces"

function Textarea({ label, placeholder, max }: TextareaProps) {
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState(false);
  
  const handleCharCount = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = event.target.value.trim()
    setCharCount(textValue.length)
    setError(textValue.length >= max)
  }

  return (
    <div className="flex flex-col w-full max-w-sm space-y-1">
      <label 
        htmlFor="prueba" 
        className="text-sm font-medium text-justify text-gray-700"
      >
        {label}
      </label>

      <textarea
        id="prueba"
        name="prueba"
        placeholder={placeholder}
        maxLength={max}
        className={`border p-2 h-35 outline-none rounded-xl text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
        onChange={handleCharCount}
      />

      <div className={`text-right text-sm text-gray-500 ${error ? 'text-red-500' : 'text-gray-500'}`}>
        {charCount}/{max}
      </div>
    </div>
  )
}
  
  export default Textarea