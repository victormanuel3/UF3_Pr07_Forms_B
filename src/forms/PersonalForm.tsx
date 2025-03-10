import { useEffect, useState } from "react"
import Input from "../components/Input"
import { PersonalFormData } from "../interfaces/form.interfaces";
import { validateLength } from "../utils/validation";
import Select from "../components/Select";
import Checkbox from "../components/Checkbox";

function PersonalForm() {
    const [formData, setFormData] = useState<PersonalFormData>({
        name: "",
        email: "",
        birthDate: "",
        gender: "",
        preferences: []
    });

    useEffect(() => {
        console.log(formData)
    },[formData.preferences])

    const handlePreferencesChanges = (option: 'Leer' | 'Deportes' | 'Viajar' | 'Cine') => {
        if (!formData.preferences.includes(option))
            setFormData({
                ...formData,
                preferences: [...formData.preferences, option]
            })
        else 
            setFormData({
                ...formData,
                preferences: formData.preferences.filter((opt => opt !== option))
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: [value]})
        validateLength(value, 3, 50)
    }

    return (
        <div className="flex flex-col gap-5 w-79 p-6 shadow-lg rounded-3xl bg-stone-50">
            <Input
                label="Nombre"
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
                label="Fecha de nacimiento"
                value={formData.birthDate}
                name="birthDate"
                placeholder="mm/dd/yyyy"
                type="text"
                onChange={handleChange}
            />
            <Select
                label="Sexo"
                value={formData.gender}
                placeholder="Select a option"
                options={[
                    'Femenino',
                    'Masculino',
                    'Otro'
                ]}
            />
            <Checkbox<'Leer' | 'Deportes' | 'Viajar' | 'Cine'>
                selectedOptions={formData.preferences}
                onSelectOption={handlePreferencesChanges}
                    options={[
                    'Leer',
                    'Deportes',
                    'Viajar',
                    'Cine'
                ]}
                label="Preferencias"
            />
        </div>
    )
}
export default PersonalForm


