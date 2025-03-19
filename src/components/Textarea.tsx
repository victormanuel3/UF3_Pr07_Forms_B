import { useEffect, useState } from "react"
import { TextareaProps } from "../interfaces/components.interfaces"
import ValidationToolTip from "./ValidationToolTip";

function Textarea({ label, placeholder, max, rules, value, name, onChange }: TextareaProps) {
  const [charCount, setCharCount] = useState(value ? value.length : 0);
  const [error, setError] = useState(false);
  const [showRules, setShowRules] = useState(false)
  const [launched, setLaunched] = useState(false)

  useEffect(() => {
    console.log(value)
  }, [])

  useEffect(() => {
    if (value) {
      setCharCount(value.length);
      setError(max !== undefined && value.trim().length >= max);
    } else {
      setCharCount(0);
    }
  }, [value]);

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

      {max !== undefined && (
        <div className={`text-right text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {charCount}/{max}
        </div>
      )}

      {rules && rules.length > 0 && showRules && (<ValidationToolTip rules={rules} launched={launched}/>)}
    </div>
  )
}
  
  export default Textarea