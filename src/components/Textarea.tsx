import { useEffect, useState } from "react"
import { TextareaProps } from "../interfaces/components.interfaces"
import ValidationToolTip from "./ValidationToolTip";

/**
 * Componente personalizado de área de texto con contador de caracteres y validación.
 * 
 * - Muestra un contador de caracteres si se ha definido un máximo
 * - Cambia el color del contador cuando se excede el límite
 * - Muestra reglas de validación cuando el campo tiene foco
 * 
 * @param {TextareaProps} props - Propiedades del componente
 * @param {string} props.label - Etiqueta del campo
 * @param {string} props.placeholder - Texto de placeholder
 * @param {number} props.max - Número máximo de caracteres permitidos
 * @param {Array} props.rules - Reglas de validación
 * @param {string} props.value - Valor actual del área de texto
 * @param {string} props.name - Nombre del campo
 * @param {function} props.onChange - Función a ejecutar cuando cambia el valor
 * @returns {React.ReactElement} Componente de área de texto con validación
 */
function Textarea({ label, placeholder, max, rules, value, name, onChange }: TextareaProps) {
  const [charCount, setCharCount] = useState(value ? value.length : 0); // Estado para el contador de caracteres
  const [error, setError] = useState(false); // Estado para indicar si se excedió el límite
  const [showRules, setShowRules] = useState(false) // Estado para mostrar/ocultar reglas de validación
  const [launched, setLaunched] = useState(false) // Estado para indicar si el campo ha sido modificado 

  useEffect(() => {
    console.log(value)
  }, [])

  /**
   * Actualiza el contador de caracteres y el estado de error cuando cambia el valor
   */
  useEffect(() => {
    if (value) {
      setCharCount(value.length);
      setError(max !== undefined && value.trim().length >= max);
    } else {
      setCharCount(0);
    }
  }, [value]);


  /**
   * Maneja el cambio en el área de texto
   * 
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Evento de cambio
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!launched) {
      setLaunched(true)
    }

    const newValue = e.target.value;
    setCharCount(newValue.length);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col w-full relative space-y-1">
      <label 
        htmlFor={name}
        className="text-sm mb-1 pointer-events-none font-medium text-justify text-gray-700"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onFocus={() => setShowRules(true)}
        onBlur={() => setShowRules(false)}
        className={`border py-2 px-3 h-32 m-0 w-full outline-none rounded-xl resize-none text-sm ${error ? 'border-red-500' : 'border-gray-500'} overflow-y-auto scrollbar-hide`}
        onChange={handleChange}
      />

      {/* Muestra el contador de caracteres si hay un máximo definido */}
      {max !== undefined && (
        <div className={`text-right text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {charCount}/{max}
        </div>
      )}

      {/* Muestra el tooltip de validación si hay reglas y el campo tiene foco */}
      {rules && rules.length > 0 && showRules && (<ValidationToolTip rules={rules} launched={launched}/>)}
    </div>
  )
}
  
  export default Textarea