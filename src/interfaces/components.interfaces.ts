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
    placeholder: string,
    options: string[],
}

export interface TextareaProps {
    label: string,
    placeholder: string,
    min: number
}

