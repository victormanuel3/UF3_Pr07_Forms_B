import { ChangeEvent, useState } from "react"
import { TextareaProps } from "../interfaces/components.interfaces"

function Textarea({ label, placeholder, min }: TextareaProps) {
  const [charCount, setCharCount] = useState(0);
  
  const handleCharCount = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = event.target.value
    setCharCount(textValue.length)
  }

  return (
    <div className="flex flex-col w-full max-w-sm space-y-1">
      {/* Etiqueta */}
      <label 
        htmlFor="prueba" 
        className="text-sm font-medium text-justify text-gray-700"
      >
        {label}
      </label>

      {/* Área de texto */}
      <textarea
        id="prueba"
        name="prueba"
        placeholder={placeholder}
        className="border border-gray-300 p-2 focus:outline-none rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        onChange={handleCharCount}
      />

      {/* Contador de caracteres (estático como ejemplo) */}
      <div className="text-right text-sm text-gray-500">
        {charCount}/{min}
      </div>
    </div>
  )
}
  
  export default Textarea