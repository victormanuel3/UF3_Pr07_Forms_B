import { useEffect, useRef, useState } from "react"
import { SelectProps } from "../interfaces/components.interfaces"

function Select(props: SelectProps) {
    const { label, placeholder, options } = props
    const [value, setValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    
    const handleOptionClick = (option: string) => {
        setValue(option);
    }

    const handleToogleDropdown = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        // Agregar el event listener cuando el dropdown está abierto
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        // Limpiar el event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={selectRef} >
            <label className="flex flex-col gap-1 items-start">
                {label}
                <div className="relative h-11 w-full">
                    <input
                        type="text"
                        value={value}
                        placeholder={placeholder}
                        readOnly
                        onClick={handleToogleDropdown}
                        className="h-full w-full border rounded-lg pl-3 outline-none"
                    />
                    <i className={`fa-sharp fa-solid fa-angle-down absolute top-1/2 right-3 -translate-y-1/2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </div>
            </label> 
            {isOpen && (
                <ul className="absolute top-full mt-0.5 bg-white border rounded-lg w-full">
                    {options.map((option) => (
                        <li className="text-justify px-3 py-1.5 cursor-pointer select-none" key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Select