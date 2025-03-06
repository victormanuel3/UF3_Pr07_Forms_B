export interface PersonalFormData {
    name: string,
    email: string,
    birthDate: string,
    gender: 'Masculino' | 'Femenino' | 'Otro' | "",
    preferences: ('Leer' | 'Deportes' | 'Viajar' | 'Cine')[]
}

export interface PersonalFormProps {
    progress: () => void
}