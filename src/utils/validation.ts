export function validateLength(value: string, min: number, max?: number): boolean {
    if (max === undefined)
        return value.length >= min

    return value.length >= min && value.length <= max
}
