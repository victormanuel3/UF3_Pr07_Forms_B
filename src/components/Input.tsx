import React, { useState } from "react";
import { InputProps} from "../interfaces/components.interfaces";
import ValidationToolTip from "./ValidationToolTip";

/**
 * Componente input personalizado que maneja el estado de los valores y muestra las reglas de validación.
 * 
 * @param {InputProps} props - Las propiedades que recibe el componente.
 * @param {string} props.label - Etiqueta que mostrará la pregunta.
 * @param {string} props.placeholder - Texto que se muestra cuando el campo está vacío.
 * @param {string} props.value - El valor actual del campo de texto.
 * @param {string} props.name - Nombre del campo, que se usará en el input.
 * @param {Array<string>} props.rules - Lista de reglas de validación que deben aplicarse al campo de entrada.
 * @param {Function} props.onChange - Función que se ejecuta cuando cambia el valor del campo.
 * 
 * @returns {React.ReactElement} - Retorna un input texto, y si existen reglas, cada que recibe foco se muestran.
 * 
 * **/
function Input(props: InputProps) {
    const { label, placeholder, value, name, rules, onChange } = props

    const [showRules, setShowRules] = useState(false) //Estado que controla si las reglas de validación se deben mostrar.
    const [launched, setLaunched] = useState(false)  //Estado que indica si el campo de entrada ha sido modificado.

    /**
     * Maneja el evento de cambio en el input y dispara la función onChange
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio que se dispara cuando se modifica el campo de entrada.
     * @returns {void} - No retorna ningún valor, solo actualiza el estado y ejecuta onChange.
     * **/
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!launched) {
            setLaunched(true)
        }
        onChange(e)
    }

    return (
        <div className="w-full">
            <label className="flex flex-col gap-2 items-start pointer-events-none select-none cursor-pointer">
                {label}
                <div className="relative w-full">
                    <input
                        className="h-10 w-full outline-emerald-400 border border-gray-500 pointer-events-auto rounded-lg pl-3 text-sm"
                        name={name}
                        type="text"
                        value={value}
                        placeholder={placeholder}
                        onFocus={() => setShowRules(true)} // Muestra las reglas de validación cuando el campo recibe el foco 
                        onBlur={() => setShowRules(false)} // Oculta las reglas de validación cuando el campo pierde el foco
                        onChange={handleChange}
                    />
                    {/* Muestra el componente ValidationToolTip si existen reglas, hay más de una regla, y showRules es true */}
                    {rules && rules.length > 0 && showRules && (<ValidationToolTip rules={rules} launched={launched}/>)}
                </div>
            </label>
        </div>
    );
}

export default Input