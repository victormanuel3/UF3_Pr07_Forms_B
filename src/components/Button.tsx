import { ButtonProps } from "../interfaces/components.interfaces";
import * as motion from "motion/react-client"

/**
 * Componente de botón reutilizable con estado habilitado/deshabilitado.
 * 
 * - Cambia de apariencia según su estado (habilitado/deshabilitado)
 * - Ejecuta la función onClick al hacer clic si está habilitado
 * 
 * @param {ButtonProps} props - Propiedades del componente
 * @param {boolean} props.enabled - Indica si el botón está habilitado
 * @param {function} props.onClick - Función a ejecutar cuando se hace clic en el botón
 * @param {React.ReactNode} props.icon - Icono a mostrar dentro del botón
 * @param {string} props.text - Texto a mostrar dentro dek botón
 * @returns {React.ReactElement} Componente de botón personalizado
 */
function Button({ enabled, onClick, icon, text }: ButtonProps) {
  return (
    <div >
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}
        onClick={onClick}
        disabled={!enabled}
        className={`flex items-center cursor-pointer justify-center px-4 py-2 gap-2 rounded-lg transition-colors ${
          enabled
            ? "bg-pink-600 text-white hover:bg-emerald-500" // Estilo para botón habilitado
            : "bg-gray-300 text-gray-500 cursor-not-allowed" // Estilo para botón deshabilitado
        }`}
      >
        {icon}
        {text}
      </motion.button>
    </div>
  );
}

export default Button;
