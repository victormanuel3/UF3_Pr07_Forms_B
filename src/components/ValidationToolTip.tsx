import React from "react"
import { ToolTipProps } from "../interfaces/components.interfaces"

/***
 * Componente que muestra un tooltip con las reglas de validación del campo.
 * 
 * - Renderiza un listado de reglas con colores según su estado de validación
 * - Verde reglas válidas, rojo para inválidas y negro si el campo aún no ha sido modificado
 * 
 * @param {ToolTipProps} props - Propiedades del componente
 * @param {Array} props.rules - Array con las reglas de validación con mensajes y estado
 * @param {boolean} props.launched - Indica si el campo ha sido modificado para aplicar colores.
 * @returns {React.ReactElement} Tooltip con las reglas de validación
 */
function ValidationToolTip(props: ToolTipProps) {
    const { rules, launched } = props
    
    return (
        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-white text-black text-sm rounded-[1rem] p-3 border border-gray-400 z-50 w-max max-w-52">
            <ul className="list-disc pl-4 flex flex-col gap-2 text-left">
                {rules.map((rule, index) => (
                    <li className={launched
                        ? (!rule.isValid ? 'text-red-500' : 'text-green-500') // Texto rojo o verde según validez si el campo fue modificado
                        : 'text-black'} // Texto negro si el campo no ha sido modificado aún
                        key={index}
                    >
                        {rule.message}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ValidationToolTip