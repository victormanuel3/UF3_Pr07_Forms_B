export function validateLength(value: string, min: number, max?: number): boolean {
    if (max === undefined)
        return value.length >= min

    return value.length >= min && value.length <= max
}

export function validateAge(yearOfBirth: number) {
    const date = new Date;
    const year = date.getFullYear();

    return year - yearOfBirth < 17 
}

// export function validateBirthDateFormat(birthDate: string) {
//     const birthDateRegex = //;
//     return birthDateRegex.test(birthDate);
// }

export function validateEmailFormat(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.stucom\.com$/;
    return emailRegex.test(email)
}

export function validateMaxSelected(selected: string[]) {
    return selected.length > 2
}