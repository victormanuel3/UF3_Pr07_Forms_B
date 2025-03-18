export interface FormQuestion {
    id: string;
    tipo: 'text' | 'select' | 'check' | 'textarea';
    pregunta: string;
    respuesta: string | string[];
    restricciones?: {
      min?: number;
      max?: number;
    };
    validacion?: {
      min_edad?: number;
      formato?: string;
      dominio?: string;
      max_seleccionados?: number;
    };
    opciones?: string[];
}

export interface FormSection {
    titulo: string;
    preguntas: FormQuestion[];
}

export interface DynamicFormProps {
    cuestionarios: FormSection[];
    currentFormIndex: number;
    onNext: () => void;
}