import { useState } from "react"
import Input from "../components/Input"
import { PersonalFormData } from "../interfaces/form.interfaces";
import { validateLength } from "../utils/validation";
import Select from "../components/Select";
import Textarea from "../components/Textarea";

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
            <Select
                label="Select"
                placeholder="Select a option"
                options={[
                    'manuel',
                    'akisha',
                    'monica'
                ]}
            />
            <Textarea
                label="Prueba"
                placeholder="placeholder del textarea"
                min={200}
            />
        </div>
        
    )
}
export default PersonalForm
