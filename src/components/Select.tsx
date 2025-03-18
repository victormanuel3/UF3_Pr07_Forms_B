import { useEffect, useRef, useState } from "react"
import { SelectProps } from "../interfaces/components.interfaces"

function Select(props: SelectProps) {
    const { label, placeholder, options, name, value, onChange } = props
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    
    const handleOptionClick = (option: string) => {
        onChange({
            target: {
                name: name,
                value: option
            }
        } as React.ChangeEvent<HTMLInputElement>);

        handleToogleDropdown()
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
            <label className="flex flex-col gap-2 items-start select-none">
                <div className="flex flex-col text-left">
                    {label}
                    <span className="text-xs text-gray-600">Este campo es obligatorio*</span>
                </div>
                <div className="relative h-10 w-full">
                    <input
                        type="text"
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        readOnly
                        onClick={handleToogleDropdown}
                        className="h-full w-full border border-gray-500 rounded-lg pl-3 outline-none cursor-pointer text-sm"
                    />
                    <i className={`fa-sharp fa-regular fa-angle-down absolute top-1/2 right-3 -translate-y-1/2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </div>
            </label> 
            {isOpen && (
                <ul className="absolute top-full z-10 mt-0.5 bg-white border border-gray-400 p-0.5 rounded-lg w-full">
                    {options.map((option) => (
                        <li className="text-justify px-3 py-1.5 cursor-pointer hover:bg-gray-200 rounded-sm text-sm select-none" key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Select