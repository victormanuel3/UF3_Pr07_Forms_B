import { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import Select from "../components/Select";
import Textarea from "../components/Textarea";
import { DynamicFormProps, FormQuestion } from "../interfaces/form.interfaces";
import {
  validateAge,
  validateBirthDateFormat,
  validateDomainEmail,
  validateEmailFormat,
  validateLength,
  validateMaxSelected,
  validateRequiredArray,
  validateRequiredField,
} from "../utils/validation";

function DynamicForms({
  cuestionarios,
  currentFormIndex,
  onNext,
  onPrev,
  isFirstStep,
}: DynamicFormProps) {

  /** Función que se usa para traducir los textos. Se aplica en etiquetas, placeholders y mensajes. */
  const { t } = useTranslation();

  /** Obtiene el formulario actual según el progreso del usuario, recibido desde el formulario padre. */
  const currentForm = cuestionarios[currentFormIndex]; 

  // ----------------------

  type FormValue = string | string[] | number | number[]; /** Tipo que define los posibles valores de una respuesta en el formulario. */
  
  /**
  * Estado que almacena las respuestas del formulario.
  * - Intenta recuperar datos guardados en 'localStorage' bajo la clave 'formResponses'.
  * - Si hay datos, los convierte de JSON a objeto.
  * - Si no hay datos, inicia con un objeto vacío '{}'.
  */
  const [formData, setFormData] = useState<Record<string, FormValue>>(() => {
    const saveData = localStorage.getItem("formResponses");
    if (saveData) {
      return JSON.parse(saveData);
    }
    return {};
  });

  // ----------------------
  /**
   * Estado que indica si formulario es válido.
   * - Se actualiza si todos los campos cumplen las reglas de validación.
   */
  const [isFormValid, setIsFormValid] = useState(false); 

  /**
   * Este useEffect prepara valores iniciales vacíos para cada pregunta del formulario.
   * 
   * - Comprueba si hay un formulario que mostrar.
   * - Para cada pregunta sin respuesta previa, crea un valor inicial vacío según su tipo.
   * - Solo actualiza el estado si realmente se añadió algún valor nuevo, evitando actualizaciones innecesarias.
  */
  useEffect(() => {
    if (currentForm) {
      const updatedData = { ...formData };
      let dataUpdated = false;

      currentForm.preguntas.forEach((pregunta) => {
        /* Si la pregunta no tiene respuesta, crea un valor vacío según su tipo */
        if (updatedData[pregunta.id] === undefined) {
          if (pregunta.tipo === "check") {
            updatedData[pregunta.id] = []; // Ej: se guarda "preferencias": []
          } else {
            updatedData[pregunta.id] = ""; // Ej: se guarda "nombre": ""
          }
          dataUpdated = true;
        }
      });
      // Solo actualiza el estado si se añadió algún valor nuevo
      if (dataUpdated) { 
        setFormData(updatedData);
      }
    }
  }, [currentForm, formData]);

  /**
   * Este useEffect guarda las respuestas del formulario en el localStorage
   * 
   * - Se ejecuta cada que cambia el formData.
   * - Convierte el objeto formData a string mediante JSON.stringify antes de guardarlo.
  */
  useEffect(() => {
    localStorage.setItem("formResponses", JSON.stringify(formData));
    console.log(localStorage.getItem("formResponses"));
  }, [formData]);

  /**
   * Este useEffect valida todos los campos del formulario actual para determinar si es válido.
   * 
   * - Recorre cada pregunta del formulario actual.
   * - Realiza validaciones específicas según el tipo del campo y sus restrincciones.
   * - Aplica validaciones definidas en la propiedad "validacion" de cada pregunta
   * - Actualiza el estado de isFormValid basado en el resultado de todas las validaciones.
   * 
  */
  useEffect(() => {
    let valid = true;

    currentForm.preguntas.forEach((pregunta) => {
      const value = formData[pregunta.id];

      // Validación para input text y textarea --------------------------------
      if (pregunta.tipo == "text" || pregunta.tipo == "textarea") {
        const stringValue = value as string;

        // Valida que el campo no esté vacío
        if (!validateRequiredField(stringValue)) {
          valid = false;
          return;
        }
        // Valida la longitud mínima y máxima.
        if (pregunta.restricciones) { // RESTRINCCIONES 
          if (
            !validateLength(
              stringValue,
              pregunta.restricciones.min || 0,
              pregunta.restricciones.max
            )
          ) {
            valid = false;
            return;
          }
        }

        // VALIDACIONES
        if (pregunta.validacion) {
          // Valida el formato Email
          if (
            pregunta.validacion.formato === "email" &&
            !validateEmailFormat(stringValue)
          ) {
            valid = false;
            return;
          }

          // Valida el dominio del Email
          const domain = pregunta.validacion.dominio;
          if (domain && !validateDomainEmail(stringValue, domain)) {
            valid = false;
            return;
          }

          /** Validaciones específicas con la fecha de nacimiento
          * Verificamos que el input tenga un identificador de fecha de nacimiento.
          */
          if (pregunta.id === "fecha_nacimiento") {
            if (!validateBirthDateFormat(formData[pregunta.id] as string)) { // Validamos que tenga un formato de fecha correcto.
              valid = false;
              return;
            }
            if ( //Verificamos si tiene la validación de edad mínima en caso tal lo comprobamos de acuerdo a la fecha añadida
              pregunta.validacion.min_edad &&
              !validateAge(stringValue, pregunta.validacion.min_edad)
            ) {
              valid = false;
              return;
            }
          }
        }

      // Validaciones para los selects
      } else if (pregunta.tipo === "select") {
        // Valida que se haya seleccionado una opción.
        if (!validateRequiredField(value as string)) {
          valid = false;
          return;
        }
      
      // Validaciones para los check
      } else if (pregunta.tipo === "check") {
        const arrayValue = Array.isArray(value) ? value : [];

        // Valida que al menos haya una opción seleccionada
        if (!validateRequiredArray<string | number>(arrayValue)) {
          valid = false;
          return;
        }

        // Validar que no se excedan las opciones máximas permitidas
        if (
          pregunta.validacion?.max_seleccionados &&
          !validateMaxSelected<string | number>(
            arrayValue,
            pregunta.validacion.max_seleccionados
          )
        ) {
          valid = false;
          return;
        }
      }
    });
    setIsFormValid(valid);
  }, [formData, currentForm]);

  // EVENTOS DE CAMBIO PARA MODIFICAR LOS VALORES ----------------------------------

  /**
   * Maneja cambios en los campos tipo input
   * 
   * - Extrae el nombre y el valor del evento input.
   * - Para fechas: valida que solo ingresen números y el separador "/".
   * - Actualiza el estado del formulario con el nuevo valor manteniendo el resto intacto.
   * 
   * @param e - Evento de cambio del input.
   * **/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "fecha_nacimiento") {
      const lastChar = value.slice(-1);

      if (isNaN(Number(lastChar)) && lastChar !== "/") {
        return;
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Maneja cambios en los campos de tipo textarea.
   * 
   * - Actualiza el estado del formulario con el nuevo valor del textarea
   * 
   * @param name - Identificador del campo.
   * @param value - Nuevo valor del textarea.
  */
  const handleTexareaChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Maneja cambios de tipo checkbox.
   * 
   * - Si la opción ya está seleccionada, la elimina del array.
   * - Si no está seleccionada, la añade al array.
   * - Si el valor actual no es un array, crea uno con la opción.
   * @param name 
   * @param option 
   */
  const handleCheckboxChange = (name: string, option: string) => {
    const currentValue = formData[name] as string[] | undefined;
    let newValue: string[];

    if (Array.isArray(currentValue)) {
      if (currentValue.includes(option)) {
        newValue = currentValue.filter((opt) => opt !== option);
      } else {
        newValue = [...currentValue, option];
      }
    } else {
      newValue = [option];
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // ---------------------------------------------------------------------------------

  /**
   * Renderiza el componente de formulario según el tipo de pregunta.
   * 
   * - Determina qué componente mostrar basado en el tipo de pregunta (text, select, check, textarea)
   * - Configura las propiedades especifícas para cada tipo de componente
   * - Aplica las reglas de validación correspondientes
   * 
   * @param {FormQuestion} pregunta - Objeto con la configuración de la pregunta deel formulario
   * @returns {React.ReactElement} El componente React correspondiente al tipo de campo o null si no coincide.
   * **/
  const renderFormField = (pregunta: FormQuestion) => {
    switch (pregunta.tipo) {
      case "text":
        return (
          <Input
            key={pregunta.id}
            onChange={handleInputChange}
            rules={getValidationRules(pregunta)}
            label={t(pregunta.pregunta)}
            name={pregunta.id}
            placeholder={
              // Configura placeholder específico para campos de fecha o texto general
              pregunta.id === "fecha_nacimiento" || pregunta.id === "fecha" 
                ? "mm/dd/yyyy"
                : "Escribe un texto"
            }
            value={formData[pregunta.id] as string}
          />
        );
      case "select":
        return (
          <Select
            key={pregunta.id}
            name={pregunta.id}
            label={t(pregunta.pregunta)}
            placeholder="Select a option"
            options={pregunta.opciones?.map((opcion) => t(opcion)) || []} 
            value={t(formData[pregunta.id] as string)}
            onChange={handleInputChange}
            rules={[{ message: "Este campo es obligatorio*" }]}
          />
        );
      case "check":
        return (
          <Checkbox
            key={pregunta.id}
            label={t(pregunta.pregunta)}
            options={pregunta.opciones?.map((opcion) => t(opcion)) || []}
            onSelectOption={(option) =>
              handleCheckboxChange(pregunta.id, option)
            }
            selectedOptions={
              // Asegura que siempre se pase un array al componente
              Array.isArray(formData[pregunta.id])
                ? (formData[pregunta.id] as string[])
                : []
            }
            rules={[
              // Regla básica de validación para campos obligatorios
              { message: "Este campo es obligatorio*" },
              // Reglas adicionales según configuración de máximo de opciones seleccionables
              ...(pregunta.validacion?.max_seleccionados !== undefined
                ? [
                    {
                      message: `Deben haber máximo ${pregunta.validacion.max_seleccionados} seleccionadas*`,
                    },
                  ]
                : []),
            ]}
          />
        );
      case "textarea":
        return (
          <Textarea
            key={pregunta.id}
            label={t(pregunta.pregunta)}
            placeholder="Escribe un texto"
            max={pregunta.restricciones?.max}
            name={pregunta.id}
            value={formData[pregunta.id] as string}
            onChange={(value) => handleTexareaChange(pregunta.id, value)}
            rules={getValidationRules(pregunta)}
          />
        );
      default:
        return null;
    }
  };

  // ---------------------------------------------------------------------------------

  /**
   * Genera reglas de validación para un campo del formulario.
   * 
   * - Crea un array de reglas de validación según las configuraciones del campo.
   * - Aplica validaciones obligatorias, de longitud, formato de email y fecha según corresponda
   * - Cada reglas contiene un mensaje de error y una función de validación
   * 
   * @param {FormQuestion} pregunta 
   * @returns {Array} Array de reglas de validación con mensajes y estado de validez
   */
  const getValidationRules = (pregunta: FormQuestion) => {
    // Inicializa el array de reglas de validación
    const rules: { message: string; isValid: boolean }[] = [];
    // Obtiene el valor actual del campo o cadena vacía si no existe
    const value = (formData[pregunta.id] as string) || "";

    // Reglas básica: Campo requerido
    rules.push({
      message: "Este campo es obligatorio.",
      isValid: validateRequiredField(value),
    });

    // Validaciones de restrincciones de longitud
    if (pregunta.restricciones) {
      if (pregunta.restricciones.min && pregunta.restricciones.max) {
        // Validación de rango de longitud (mínimo y máximo)
        rules.push({
          message: `El campo debe tener entre ${pregunta.restricciones.min} y ${pregunta.restricciones.max} caracteres.`,
          isValid: validateLength(
            value,
            pregunta.restricciones.min,
            pregunta.restricciones.max
          ),
        });
      } else if (pregunta.restricciones.min) {
        // Solo validación de longitud mínima
        rules.push({
          message: `El campo debe tener mínimo ${pregunta.restricciones.min} caracteres.`,
          isValid: validateLength(value, pregunta.restricciones.min),
        });
      }
    }

    // Validaciones específicas según formato y configuración
    if (pregunta.validacion) {
      if (pregunta.validacion.formato === "email") {
        // Validación formato email
        rules.push({
          message: `Debes añadir un email correcto`,
          isValid: validateEmailFormat(value),
        });

        // Validación adicional de dominio al email si esta especificado
        if (pregunta.validacion.dominio) {
          rules.push({
            message: `El dominio del email debe ser ${pregunta.validacion.dominio}.`,
            isValid: validateDomainEmail(value, pregunta.validacion.dominio),
          });
        }
      }

      // Validaciones específicas para fechas de nacimiento
      if (pregunta.id === "fecha_nacimiento") {
        // Validación de formato de fecha
        rules.push({
          message: 'Debes añadir una fecha válida separada por "/".',
          isValid: validateBirthDateFormat(value),
        });

        // Validación de edad mínima si está configurada
        if (pregunta.validacion.min_edad) {
          rules.push({
            message: `Debes tener al menos ${pregunta.validacion.min_edad} años.`,
            isValid:
              validateBirthDateFormat(value) &&
              validateAge(value, pregunta.validacion.min_edad),
          });
        }
      }
    }
    return rules;
  };

  // ---------------------------------------------------------------------------------

  /***
   * Renderiza el formulario actual con su lista de preguntas y botones de navegación.
   * 
   * - Mapea y renderiza cada pregunta del formulario actual
   * - Muestra botones de navegación (anterior / siguiente) dependiendo de la posición del formulario actual
   * - El botón "anterior" solo se muestra si no es el primer paso
   * - El botón siguiente se habilita solo si el formulario es válido.
  */
  return (
    <div className="flex shadow-[2px_2px_10px_rgba(0,0,0,0.15)] flex-col gap-5 w-lg p-6 rounded-3xl bg-stone-50">
      {/* Renderiza cada pregunta del formulario actual */}
      {currentForm.preguntas.map((pregunta) => (
        <div key={pregunta.id}>{renderFormField(pregunta)}</div>
      ))}

      {/* Botones de navegación */}
      <div className="flex flex-row justify-end gap-5">
        {!isFirstStep && (
          <Button
            enabled={true}
            onClick={onPrev}
            icon={<i className="fa-sharp fa-regular fa-arrow-left"></i>}
          />
        )}

        <Button
          enabled={isFormValid}
          onClick={onNext}
          icon={<i className="fa-sharp fa-regular fa-arrow-right"></i>}
        />
      </div>
    </div>
  );
}

export default DynamicForms;