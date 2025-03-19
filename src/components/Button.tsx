import { ButtonProps } from "../interfaces/components.interfaces";

function Button({ enabled, onClick, icon }: ButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={!enabled}
        className={`flex items-center cursor-pointer justify-center px-4 py-2 gap-2 rounded-lg transition-colors ${
          enabled
            ? "bg-pink-600 text-white hover:bg-emerald-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {icon}
      </button>
    </div>
  );
}

export default Button;
