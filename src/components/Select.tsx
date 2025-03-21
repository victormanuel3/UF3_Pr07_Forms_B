import { useEffect, useRef, useState } from "react";
import { SelectProps } from "../interfaces/components.interfaces";
import { useTranslation } from "react-i18next";

/**
 * Componente de selección desplegable personalizado.
 * 
 * - Muestra un menú desplegable con opciones al hacer clic
 * - Cierra el menú al seleccionar una opción o hacer clic fuera
 * 
 * @param {SelectProps} props - Propiedades del componente
 * @param {string} props.label - Etiqueta del campo de selección
 * @param {string} props.placeholder - Texto a mostrar cuando no hay selección
 * @param {Array<string>} props.options - Lista de opciones disponibles
 * @param {string} props.name - Nombre del campo para el formulario
 * @param {string} props.value - Valor actualmente seleccionado
 * @param {function} props.onChange - Función a ejecutar cuando cambia la selección
 * @returns {React.ReactElement} Componente de selección desplegable
 */
function Select(props: SelectProps) {
  const { label, placeholder, options, name, value, onChange } = props;
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el dropdown está abierto
  const selectRef = useRef<HTMLDivElement>(null); // Referencia para detectar clics fuera del componente

  const { t } = useTranslation();

    /**
     * Maneja el clic en una opción del menú desplegable.
     * 
     * - Emite un evento de cambio simulado con el formato esperado por el formulario
     * - Cierra el menú desplegable después de seleccionar
     * 
     * @param {string} option - Opción seleccionada
     */
  const handleOptionClick = (option: string) => {
    onChange({
      target: {
        name: name,
        value: option
      },
    } as React.ChangeEvent<HTMLInputElement>);

    handleToogleDropdown();
  };

    /**
     * Alterna el estado de apertura del menú desplegable.
     */
    const handleToogleDropdown = () => {
        setIsOpen(!isOpen)
    }

     /**
     * Efecto para detectar clics fuera del componente y cerrar el menú.
     * 
     * - Agrega un listener de clic cuando el menú está abierto
     * - Elimina el listener cuando el componente se desmonta o el menú se cierra
     */
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
    <div className="relative" ref={selectRef}>
      <label className="flex flex-col gap-2 items-start select-none pointer-events-none">
        <div className="flex flex-col text-left">
          {label}
          <span className="text-xs text-gray-600">{ t("messages.required") }</span>
        </div>
        <div className="relative h-10 w-full">
          <input
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            readOnly
            onClick={handleToogleDropdown}
            className="h-full w-full pointer-events-auto border border-gray-500 rounded-lg pl-3 outline-none cursor-pointer text-sm"
          />
          <i
            className={`fa-sharp fa-regular fa-angle-down absolute top-1/2 right-3 -translate-y-1/2 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          ></i>
        </div>
      </label>
            {/* Menú desplegable de opciones, visible solo cuando isOpen es true */}
      {isOpen && (
        <ul className="absolute top-full z-10 mt-0.5 bg-white border border-gray-400 p-0.5 rounded-lg w-full">
          {options.map((option) => (
            <li
              className="text-justify px-3 py-1.5 cursor-pointer hover:bg-gray-200 rounded-sm text-sm select-none"
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
