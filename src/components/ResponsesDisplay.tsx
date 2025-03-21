import { useTranslation } from "react-i18next";
import { FormSection } from "../interfaces/form.interfaces";

/**
 *
 * Esta función renderiza las respuestas guardadas en el localStorage
 *
 * - Verifica si existen datos guardados en el localStorage bajo la clave "formResponses".
 * - Si no hay datos, muestra un mensaje indicando que no hay respuestas registradas.
 * - Si hay datos, convierte el string json a un objeto y muestra las respuestas.
 *
 * @returns {React.ReactElement} Retorna un elemento con las respuestas en caso que hayan.
 * **/
export const ResponsesDisplay = () => {
  const { t } = useTranslation();

  const saveData = localStorage.getItem("formResponses");
  if (!saveData) return <p>No hay respuestas registradas</p>;

  const formResponses = JSON.parse(saveData);

  const preguntasCuestionarioString = localStorage.getItem(
    "preguntas-cuestionario"
  );

  if (preguntasCuestionarioString === null)
    return <p>No hay preguntas registradas</p>;

  return (
    <div className="flex flex-col items-center w-150">
      {(JSON.parse(preguntasCuestionarioString) as FormSection[]).map(
        (cuestionario) => (
          <div className="rounded-2xl py-5 px-20 mb-10 ml-5">
            <div className="flex flex-col items-start w-full">
              <h3 className="text-4xl font-righteous text-emerald-500 uppercase">
                {t(cuestionario.titulo)}
              </h3>
              <div className="mt-10 flex flex-col items-start gap-2">
                {/* Recorremos cada una de las preguntas por cuestionario */}
                {cuestionario.preguntas.map((pregunta) => (
                  <>
                    {/* Mostramos la pregunta con su correspondiente traducción */}
                    <span className="font-bold text-left text-blue-600">
                      {t(pregunta.pregunta)}
                    </span>
                    {/* Mostramos la respuesta correspondiente usando el ID de la pregunta como clave */}
                    <div className="mb-5 text-left">
                      {Array.isArray(formResponses[pregunta.id]) ? (
                        formResponses[pregunta.id].map(
                          (response: string, index: number) => (
                            <div key={index}>{t(response)}</div>
                          )
                        )
                      ) : (
                        <span>{formResponses[pregunta.id]}</span>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="bg-stone-200 w-full h-1 mt-10"></div>
          </div>
        )
      )}
    </div>
  );
};
