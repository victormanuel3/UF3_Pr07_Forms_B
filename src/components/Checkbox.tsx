import { useTranslation } from "react-i18next"
import { CheckboxProps } from "../interfaces/components.interfaces"

/**
 * Componente personalizado de Checkbox que permite seleccionar múltiples opciones.
 * 
 * - Recibe la lista de opciones disponibles, opciones seleccionadas y reglas de validación
 * - Permite seleccionar/deseleccionar opciones mediante la función onSelectOption
 * - Muestra mensajes de validación según las reglas
 * 
 * @param {Array<T>} options - Lista de opciones disponibles para seleccionar
 * @param {string} label - Etiqueta descriptiva para el grupo de checkboxes
 * @param {Array<T>} selectedOptions - Lista de opciones actualmente seleccionadas
 * @param {Array} rules - Reglas de validación con mensajes a mostrar
 * @param {function} onSelectOption - Función que se ejecuta al seleccionar/deseleccionar una opción
 * @returns {React.ReactElement} Componente de grupo de checkboxes
 */
function Checkbox<T>({ options, label, selectedOptions, rules, onSelectOption }: CheckboxProps<T>) {
    const { t } = useTranslation();

    /**
     * Verifica si una opción está seleccionada.
     * 
     * @param {T} option - Opción a verificar
     * @returns {boolean} Verdadero si la opción está en la lista de seleccionadas
     */
    const IsSelected = (option: T) => {
        return selectedOptions.includes(option)
    }

    return (
        <div className="flex flex-col gap-1.5 select-none">
            <div className="flex flex-col text-left mb-2 select-none">
                <span className="flex">{label}</span>
                {/* Mensajes de validación */}
                {rules?.map((rule, index) => (
                    <span key={index} className="text-xs text-gray-600">{rule.message}</span>
                ))}
            </div>
            {/* Lista de opciones de checkbox */}
            {options.map((option, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <div className={`flex items-center justify-center w-5 h-5 bg-white ${IsSelected(option) ? 'border-emerald-400 border-2' : 'border-gray-400 border-1'}`}>
                        {IsSelected(option) && (
                            <svg width={15} height={16} className="pointer-events-none mr-[1px]">
                                <path d="M2.85714 7.70169C3.09615 7.92407 3.40495 8.23159 3.73626 8.62373C4.04121 8.98495 4.24451 9.27512 4.3956 9.49153C4.73352 9.97586 4.98681 10.4108 5.49451 11.2814C5.58846 11.4424 5.66484 11.5748 5.71429 11.661C5.82418 11.8237 5.82418 11.7695 5.87363 11.6046C5.97637 11.2613 6.22308 10.8496 6.48352 10.3593C6.7033 9.94549 6.87692 9.65261 7.1978 9.11186C7.6022 8.43064 7.82033 8.06292 8.13187 7.59322C8.51758 7.01125 8.82033 6.61369 9.23077 6.07458C9.7022 5.45573 10.0418 5.04461 10.7143 4.23051C11.5099 3.2678 11.789 2.96569 11.978 2.7661C12.1593 2.57519 12.3951 2.33437 12.9121 1.84407C13.4082 1.37383 14.0918 0.741966 14.9451 0L15 3.74237C14.567 3.9962 13.9786 4.38183 13.3516 4.93559C13.1945 5.07444 12.8319 5.40312 12.1978 6.12881C11.3209 7.13275 10.7385 7.96529 10.0549 8.94915C9.43846 9.83593 9.13022 10.2796 8.73626 10.9559C8.48462 11.3877 8.22033 11.8763 7.69231 12.8542C7.57692 13.0674 7.40934 13.3776 7.1978 13.7763C6.89451 14.3474 6.5 15.0997 6.04396 16C5.64396 15.0167 5.18846 14.2785 4.83516 13.7763C4.47527 13.2643 4.15165 12.8987 3.68132 12.3661C3.00604 11.6019 2.49451 11.1224 2.25275 10.9017C2.06648 10.7314 1.93626 10.6121 1.75824 10.4678C1.1478 9.97478 0.537912 9.62875 0 9.38305C0.168681 9.27837 0.431868 9.12163 0.769231 8.94915C0.931319 8.86617 0.95989 8.85695 1.20879 8.7322C1.57967 8.54617 1.79835 8.43715 2.03297 8.2983C2.21648 8.18983 2.46538 8.03037 2.74725 7.81017L2.85714 7.70169Z" className="fill-emerald-400"/>
                            </svg>                            
                        )}
                        <input 
                            type="checkbox"
                            checked={IsSelected(option)}
                            onChange={() => onSelectOption(option)}
                            className="absolute opacity-0 w-5 h-5 cursor-pointer"
                        />
                    </div>
                    <span className="text-gray-700 text-sm">{t(String(option))}</span>
                </label>
            ))}
        </div>
    )
}

export default Checkbox