import React, { ReactNode } from "react"

export interface InputProps {
    label: string,
    placeholder: string,
    value: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    rules?: {message: string; isValid: boolean}[]
}

export interface SelectProps {
    label?: string,
    value: string,
    name: string,
    placeholder: string,
    options: string[],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    rules?: {message: string}[]
}

export interface TextareaProps {
    label: string,
    placeholder: string,
    max?: number
    name: string
    value: string
    onChange: (value: string) => void
    rules?: {message: string; isValid: boolean}[]
}

export interface CheckboxProps<T> {
    label: string,
    selectedOptions: T[],
    onSelectOption: (option: T) => void,
    options: T[]
    rules?: {message: string}[]
}

export interface ToolTipProps {
    rules: { message: string; isValid: boolean }[]
    launched: boolean
}

export interface ButtonProps {
    enabled: boolean
    onClick: () => void
    icon: ReactNode
}