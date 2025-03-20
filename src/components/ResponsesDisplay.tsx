import { useTranslation } from "react-i18next";
import { FormSection } from "../interfaces/form.interfaces";

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
          <div className="shadow-md">
            <div className="flex flex-col items-start w-full">
              <h3 className="text-4xl font-righteous text-emerald-500">
                {t(cuestionario.titulo)}
              </h3>
              <div className="mt-10 flex flex-col items-start gap-2">
                {cuestionario.preguntas.map((pregunta) => (
                  <>
                    <span className="font-bold color">{t(pregunta.pregunta)}</span>
                    <span className="mb-5">{formResponses[pregunta.id]}</span>
                  </>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
