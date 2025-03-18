import { ToolTipProps } from "../interfaces/components.interfaces"

function ValidationToolTip(props: ToolTipProps) {
    const { rules, launched } = props
    
    return (
        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-white text-black text-sm rounded-[1rem] p-3 border border-gray-400 z-50 w-max max-w-60">
            <ul className="list-disc pl-4 flex flex-col gap-2 text-left">
                {rules.map((rule, index) => (
                    <li className={launched ? (!rule.isValid ? 'text-red-500' : 'text-green-500') : 'text-black'} key={index}>{rule.message}</li>
                ))}
            </ul>
        </div>
    )
}

export default ValidationToolTip