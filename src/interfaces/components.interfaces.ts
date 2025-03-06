import React from "react"

export interface InputProps {
    label: string,
    placeholder: string,
    value: string,
    name: string,
    type: 'text' | 'email' | 'password'
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface SelectProps {
    label: string,
    value: string,
    placeholder: string,
    options: string[],
}

export interface TextareaProps {
    label: string,
    placeholder: string,
    max: number
}

export interface CheckboxProps<T> {
    label: string,
    selectedOptions: T[],
    onSelectOption: (option: T) => void,
    options: T[]
}