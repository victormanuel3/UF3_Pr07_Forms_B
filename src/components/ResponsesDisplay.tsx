import { FormSection } from "../interfaces/form.interfaces";

export const ResponsesDisplay = () => {
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
      <h2 className="text-4xl">Respuestas</h2>
      {(JSON.parse(preguntasCuestionarioString) as FormSection[]).map(
        (cuestionario) => (
          <div className="shadow-md">
            <div className="flex flex-col items-start w-full">
              <h3 className="text-2xl">{cuestionario.titulo}</h3>
              <div className="flex flex-col items-start">
                {cuestionario.preguntas.map((pregunta) => (
                  <>
                    <span>{pregunta.pregunta}</span>
                    <span>{formResponses[pregunta.id]}</span>
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
