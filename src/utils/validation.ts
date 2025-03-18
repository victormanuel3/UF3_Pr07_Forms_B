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
    // Si es solo un año
    else if (!isNaN(parseInt(birthDate))) {
        const birthYear = parseInt(birthDate);
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear >= minimumAge;
    }
    
    // Si el formato es inválido
    return false;
}

export function validateBirthDateFormat(birthDate: string) {
    const birthDateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return birthDateRegex.test(birthDate);
}

export function validateEmailFormat(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,}$/;
    return emailRegex.test(email)
}

export function validateDomainEmail (email: string, domain: string) {
    const domainRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${domain.replace('.', '\\.')}$`);
    return domainRegex.test(email)
}

export function validateMaxSelected<T>(selected: T[], max: number): boolean {
    return selected.length <= max;
}

export function validateRequiredField(value: string | number) {
    if (typeof value === 'string') {
        return value.trim() !== ''
    } else if (typeof value === 'number') {
        return !isNaN(value)
    }
    return false
}

export function validateRequiredArray<T>(array: T[]): boolean {
    return Array.isArray(array) && array.length > 0
}
