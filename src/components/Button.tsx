import { ButtonProps } from "../interfaces/components.interfaces";
import * as motion from "motion/react-client"

function Button({ enabled, onClick, icon, text }: ButtonProps) {
  return (
    <div >
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}
        onClick={onClick}
        disabled={!enabled}
        className={`flex items-center cursor-pointer justify-center px-4 py-2 gap-2 rounded-lg transition-colors ${
          enabled
            ? "bg-pink-600 text-white hover:bg-emerald-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {icon}
        {text}
      </motion.button>
    </div>
  );
}

export default Button;
