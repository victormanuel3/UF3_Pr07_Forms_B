import { isEmail } from "validator";

/**
 * Valida si la longitud de un texto está dentro del rango especificado.
 * 
 * @param {string} value - Valor a validar.
 * @param {number} min - Valor mínimo permitido de caracteres.
 * @param {number} [max] - Valor máximo permitido de caracteres (opcional).
 * @returns {boolean} - Retorna true si la longitud del valor está dentro del rango específico, si no false.
 * **/
export function validateLength(
  value: string,
  min: number,
  max?: number
): boolean {
  if (max === undefined) return value.length >= min;

  return value.length >= min && value.length <= max;
}

export function validateAge(birthDate: string, minimumAge: number): boolean {
    // Para formato DD/MM/YYYY
    if (birthDate.includes('/')) {
        const parts = birthDate.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1; // Los meses en JS Date son 0-11
            const year = parseInt(parts[2]);

            // 🚨 Validar que el año tenga exactamente 4 dígitos
            if (parts[2].length !== 4 || isNaN(year)) {
                return false;
            }
            
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                const birthDate = new Date(year, month, day);
                const today = new Date();
                
                // Calcular edad
                let age = today.getFullYear() - birthDate.getFullYear();
                
                // Ajustar la edad si el mes/día de cumpleaños aún no ha llegado este año
                if (today.getMonth() < birthDate.getMonth() || 
                    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                
                return age >= minimumAge;
            }
        }
    } 
    // Si el formato es inválido
    return false;
}

/**
 * Valida si la fecha de nacimiento está en el formato correcto (MM/DD/YYYY).
 * 
 * @param {string} birthDate - Fecha de nacimiento a validar en formato 'MM/DD/YYYY'.
 * @returns {boolean} - Devuelve 'true' si la fecha cumple con el formato, si no 'false'.
 * **/
export function validateBirthDateFormat(birthDate: string) {
    const birthDateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return birthDateRegex.test(birthDate);
}

/**
 * Valida si un Email tiene un formato válido.
 * 
 * - Utiliza la función 'isEmail' de la librería 'validator' para validar emails.
 * 
 * @param {string} email - Email a validar.
 * @returns {boolean} - Retorna 'true' si el formato es válido, en caso contrario 'false'
 * **/
export function validateEmailFormat(email: string) {
    return isEmail(email)
}

/**
 * Valida si el email tiene el dominio especificado.
 * 
 * @param {string} email - El correo electrónico que se quiere validar.
 * @param {string} domain - El dominio que debe tener el email.
 * @returns {boolean} - Retorna 'true' si el email tiene el dominio especificado, de lo contrario false.
 * **/
export function validateDomainEmail (email: string, domain: string) {
    const domainRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${domain.replace('.', '\\.')}$`);
    return domainRegex.test(email)
}

/**
 * Valida si la cantidad de elementos seleccionados no supera el máximo permitido.
 * 
 * - Verifica que el número de elementos del array 'selected' sea menor o igual al valor de 'max'
 * 
 * @template T - Tipo de los elementos del array.
 * @param {T[]} selected - Array de elementos seleccionados.
 * @param {number} max - Número máximo de elementos permitidos.
 * @returns {boolean} - Devuelve 'true' si la cantidad de elementos seleccionados no supera el máximo, de lo contrario 'false'.
 * **/
export function validateMaxSelected<T>(selected: T[], max: number): boolean {
    return selected.length <= max;
}

/**
 * Valida si un campo obligatorio tiene un valor válido.
 * 
 * - Si es un string, verifica queeno esté vacío.
 * - Si es un número, verificaque no sea 'NaN'.
 * - Para otro tipo de dato devuelve false.
 * 
 * @param {string | number} value - Valor a validar.
 * @returns {boolean} - Devuelve 'true' si el valor es válido, de lo contrario false.
 * **/
export function validateRequiredField(value: string | number) {
    if (typeof value === 'string') {
        return value.trim() !== ''
    } else if (typeof value === 'number') {
        return !isNaN(value)
    }
    return false
}

/**
 * Valida si un array no está vacío y es un array válido.
 * 
 * - Verifica que el valor recibido sea un array.
 * - Comprueba que tenga al menos un elemento.
 * 
 * @template T - Tipo de los elementos del array.
 * @param {T[]} array - Array a validar
 * @returns {boolean} - Devuelve 'true' si el array es válido y tiene elementos, de lo contrario 'false.
 * **/
export function validateRequiredArray<T>(array: T[]): boolean {
    return Array.isArray(array) && array.length > 0
}
