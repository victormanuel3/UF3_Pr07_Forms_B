import { ButtonProps } from "../interfaces/components.interfaces";

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
 * @returns {React.ReactElement} Componente de botón personalizado
 */
function Button({ enabled, onClick, icon }: ButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={!enabled}
        className={`flex items-center cursor-pointer justify-center px-4 py-2 gap-2 rounded-lg transition-colors ${
          enabled
            ? "bg-pink-600 text-white hover:bg-emerald-500" // Estilo para botón habilitado
            : "bg-gray-300 text-gray-500 cursor-not-allowed" // Estilo para botón deshabilitado
        }`}
      >
        {icon}
      </button>
    </div>
  );
}

export default Button;
