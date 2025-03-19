import { useEffect, useState } from "react";
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
  isFirstStep
}: DynamicFormProps) {
  const currentForm = cuestionarios[currentFormIndex];
  // ----------------------
  type FormValue = string | string[] | number | number[];
  const [formData, setFormData] = useState<Record<string, FormValue>>(() => {
      const saveData = localStorage.getItem("formResponses")
      if (saveData) {
        return JSON.parse(saveData)
      }
      return {}
  });
  // ----------------------
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (currentForm) {
      const updatedData = {...formData}    
      let dataUpdated = false
      
    currentForm.preguntas.forEach((pregunta) => {
        if (updatedData[pregunta.id] === undefined) { 
          if (pregunta.tipo === "check") {
            updatedData[pregunta.id] = [];
          } else {
            updatedData[pregunta.id] = "";
          }
          dataUpdated = true;
        }
      });
      if (dataUpdated) {
        setFormData(updatedData);
      }
    }
  }, [currentForm, formData]);
    
  useEffect(() => {
      localStorage.setItem('formResponses', JSON.stringify(formData));
      console.log(localStorage.getItem('formResponses'))
  }, [formData]);

  useEffect(() => {
    let valid = true;

    currentForm.preguntas.forEach((pregunta) => {
      const value = formData[pregunta.id];

      if (pregunta.tipo == "text" || pregunta.tipo == "textarea") {
        const stringValue = value as string;

        // VALIDA CAMPO REQUERIDO.
        if (!validateRequiredField(stringValue)) {
          valid = false;
          return;
        }
        // VALIDA RESTRICCIONES
        if (pregunta.restricciones) {
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

        // VALIDACIONES ESPECÍFICAS
        if (pregunta.validacion) {
          if (
            pregunta.validacion.formato === "email" &&
            !validateEmailFormat(stringValue)
          ) {
            valid = false;
            return;
          }

          const domain = pregunta.validacion.dominio;
          if (domain && !validateDomainEmail(stringValue, domain)) {
            valid = false;
            return;
          }

          if (pregunta.id === "fecha_nacimiento") {
            if (!validateBirthDateFormat(formData[pregunta.id] as string)) {
              valid = false;
              return;
            }
            if (
              pregunta.validacion.min_edad &&
              !validateAge(stringValue, pregunta.validacion.min_edad)
            ) {
              valid = false;
              return;
            }
          }
        }
      } else if (pregunta.tipo === "select") {
        // VALIDA CAMPO REQUERIDO
        if (!validateRequiredField(value as string)) {
          valid = false;
          return;
        }
      } else if (pregunta.tipo === "check") {
        const arrayValue = Array.isArray(value) ? value : [];

        // VALIDAR QUE HAY AL MENOS UNA SELECCIONADA
        if (!validateRequiredArray<string | number>(arrayValue)) {
          valid = false;
          return;
        }

        // VALIDAR MAX OPCIONES SELECCIONADAS
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

  const handleTexareaChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const renderFormField = (pregunta: FormQuestion) => {
    switch (pregunta.tipo) {
      case "text":
        return (
          <Input
            key={pregunta.id}
            onChange={handleInputChange}
            rules={getValidationRules(pregunta)}
            label={pregunta.pregunta}
            name={pregunta.id}
            placeholder={
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
            label={pregunta.pregunta}
            placeholder="Select an option"
            options={pregunta.opciones || []}
            value={formData[pregunta.id] as string}
            onChange={handleInputChange}
            rules={[{ message: "Este campo es obligatorio*" }]}
          />
        );
      case "check":
        return (
          <Checkbox
            key={pregunta.id}
            label={pregunta.pregunta}
            options={pregunta.opciones || []}
            onSelectOption={(option) =>
              handleCheckboxChange(pregunta.id, option)
            }
            selectedOptions={
              Array.isArray(formData[pregunta.id])
                ? (formData[pregunta.id] as string[])
                : []
            }
            rules={[
              { message: "Este campo es obligatorio*" },
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
            label={pregunta.pregunta}
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

  const getValidationRules = (pregunta: FormQuestion) => {
    const rules: { message: string; isValid: boolean }[] = [];
    const value = (formData[pregunta.id] as string) || "";

    rules.push({
      message: "Este campo es obligatorio.",
      isValid: validateRequiredField(value),
    });

    if (pregunta.restricciones) {
      if (pregunta.restricciones.min && pregunta.restricciones.max) {
        rules.push({
          message: `El campo debe tener entre ${pregunta.restricciones.min} y ${pregunta.restricciones.max} caracteres.`,
          isValid: validateLength(
            value,
            pregunta.restricciones.min,
            pregunta.restricciones.max
          ),
        });
      } else if (pregunta.restricciones.min) {
        rules.push({
          message: `El campo debe tener mínimo ${pregunta.restricciones.min} caracteres.`,
          isValid: validateLength(value, pregunta.restricciones.min),
        });
      }
    }

    if (pregunta.validacion) {
      if (pregunta.validacion.formato === "email") {
        rules.push({
          message: `Debes añadir un email correcto`,
          isValid: validateEmailFormat(value),
        });
        if (pregunta.validacion.dominio) {
          rules.push({
            message: `El dominio del email debe ser ${pregunta.validacion.dominio}.`,
            isValid: validateDomainEmail(value, pregunta.validacion.dominio),
          });
        }
      }
      if (pregunta.id === "fecha_nacimiento") {
        rules.push({
          message: 'Debes añadir una fecha válida separada por "/".',
          isValid: validateBirthDateFormat(value),
        });
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

  return (
    <div className="flex flex-col gap-5 w-lg p-6 rounded-3xl bg-stone-50 drop-shadow-xl shadow-purple-950">
      {currentForm.preguntas.map((pregunta) => (
        <div key={pregunta.id}>{renderFormField(pregunta)}</div>
      ))}
      <div className="flex flex-row justify-end gap-5">
      {
        !isFirstStep && <Button
        enabled={true}
        onClick={onPrev}
        icon={<i className="fa-sharp fa-regular fa-arrow-left"></i>}
      />
      }
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

// RECORD
