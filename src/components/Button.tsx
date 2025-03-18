import { ButtonProps } from "../interfaces/components.interfaces"

function Button({enabled, onClick}: ButtonProps) {
    return (
        <div className="w-full flex justify-end">
            <button
                onClick={onClick}
                disabled={!enabled}
                className={`flex items-center cursor-pointer justify-center px-4 py-2 gap-2 rounded-lg transition-colors ${
                    enabled 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}>
                <span>Next</span>
                <i className="fa-sharp fa-regular fa-arrow-right"></i>
            </button>
        </div>
    )
}

export default Button