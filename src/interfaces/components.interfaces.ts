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

}