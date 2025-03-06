import { InputProps } from "../interfaces/components.interfaces";

function Input(props: InputProps) {
    const {label, placeholder, type, value, name, onChange} = props
    return (
        <div className="w-full">
            <label className="flex flex-col gap-1 items-start">
                {label}
                <input
                    className="h-10 w-full border rounded-lg pl-3 text-sm"
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}

export default Input