import { useState } from "react";
import { InputProps} from "../interfaces/components.interfaces";
import ValidationToolTip from "./ValidationToolTip";

function Input(props: InputProps) {
    const { label, placeholder, value, name, rules, onChange } = props

    const [showRules, setShowRules] = useState(false)
    const [launched, setLaunched] = useState(false)

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
                        className="h-10 w-full border border-gray-500 pointer-events-auto rounded-lg pl-3 text-sm"
                        name={name}
                        type="text"
                        value={value}
                        placeholder={placeholder}
                        onFocus={() => setShowRules(true)}
                        onBlur={() => setShowRules(false)}
                        onChange={handleChange}
                    />
                    {rules && rules.length > 0 && showRules && (<ValidationToolTip rules={rules} launched={launched}/>)}
                </div>
            </label>
        </div>
    );
}

export default Input