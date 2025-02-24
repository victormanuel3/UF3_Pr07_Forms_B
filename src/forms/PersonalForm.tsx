import { useState } from "react"
import Input from "../components/Input"
import { PersonalFormData } from "../interfaces/form.interfaces";
import { validateLength } from "../utils/validation";

function PersonalForm() {
    const [formData, setFormData] = useState<PersonalFormData>({
        name: "",
        email: "",
        birthDate: "",
        gender: "Femenino",
        preferences: 'Cine'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: [value]})
        validateLength(value, 3, 50)
    }

    return (
        <div className="flex flex-col gap-5 w-79 p-6 border rounded-3xl">
            <h1 className="font-normal text-2xl uppercase">personal form</h1>
            <Input
                label="Name"
                value={formData.name}
                name="name"
                placeholder="Enter your name"
                type="text"
                onChange={handleChange}
            />
            <Input
                label="Email"
                value={formData.email}
                name="email"
                placeholder="Enter your email"
                type="email"
                onChange={handleChange}
            />
            <Input
                label="Birthdate"
                value={formData.birthDate}
                name="birthDate"
                placeholder="mm/dd/yyyy"
                type="text"
                onChange={handleChange}
            />
            <div className="relative w-[360px]">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 
                    border-t-[12px] border-t-transparent
                    border-r-[12px] border-r-[#D9D9D9]
                    border-b-[12px] border-b-transparent">
                </div>
                <div className="w-full bg-[#D9D9D9] rounded-xl p-4 min-h-[66px]">
                    <p className="text-gray-700">Reglas de validación</p>
                </div>
            </div>
        </div>
        
    )
}
export default PersonalForm
