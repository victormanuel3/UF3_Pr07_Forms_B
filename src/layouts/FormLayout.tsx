import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import robotics from "../../public/img/robotics.gif";
import Button from "../components/Button";
import DynamicForms from "../form/DynamicForms";
import { FormSection } from "../interfaces/form.interfaces";

/**
 * Componente principal que gestiona la navegación entre los distintos cuestionarios.
 *
 * - Controla el estado de progreso de los formularios.
 * - Maneja la carga y visualización dínamica de los cuestionarios.
 * - Permite avanzar y retroceder entre formularios.
 * - Muestra las respuestas cuando se han completado todos los cuestionarios.
 *
 * @returns {React.ReactElement}
 * - Título dinámico que muestra el título del cuestionario actual o "¡Completado!"
 * - Indicadores de progreso (círculos numerados)
 * - Formulario dinámico del cuestionario actual o resumen de respuestas al finalizar
 * **/
function FormLayout() {
  const [title, setTitle] = useState(""); // Título del cuestionario actual,
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(1); // índice del cuestionario actual.
  const [cuestionarios, setCuestionarios] = useState<FormSection[]>([]); // Listado de los cuestionarios.
  const [isLoading, setIsLoading] = useState(true); // Controla el estado de carga.
  const [isCompleted, setIsCompleted] = useState(false); // Indica si se han completado todos los cuestionarios.
  const { t } = useTranslation(); // Función para traducir textos.
  const [shouldResetForm, setShouldResetForm] = useState(false); //Estado que indica si el formulario debe reiniciarse.
  const navigate = useNavigate();

  /**
   * Esta función maneja la navegación al siguiente cuestionario.
   *
   * - Incrementa el progreso actual en 1.
   * - Actualiza el título con el del siguiente formulario, aplicando la traducción
   * - Si se ha llegado al cuestionario final, marca el proceso como completado.
   *
   * @returns {void} no retorna ningún valor, solo actualiza los estados.
   * **/
  const handleNext = () => {
    if (progress < cuestionarios.length) {
      setProgress(progress + 1);
      setTitle(t(cuestionarios[progress].titulo));
      setDescription(t(cuestionarios[progress].descripcion));
    } else {
      setIsCompleted(true);
    }
  };

  /**
   * Esta función maneja la navegación al cuestionario anterior.
   *
   * - Verifica que el progreso actual sea mayor a 0.
   * - Decrementa el progreso actual en 1.
   * - Actualiza el título con el del cuestionario anterior.
   *
   * @returns {void} No retorna ningún valor, solo actualiza los estados.
   * **/
  const handlePrev = () => {
    if (progress > 1) {
      setProgress(progress - 1);
      setTitle(t(cuestionarios[progress - 2].titulo));
      setDescription(t(cuestionarios[progress - 2].descripcion));
    }
  };

  /**
   * Restablece el estado del formulario y reinicia el progreso.
   *
   * - Borra las respuestas guardadas en `localStorage`.
   * - Reinicia el progreso al primer cuestionario.
   * - Restablece el título al primer cuestionario si hay datos.
   * - Activa `shouldResetForm` para indicarle a `DynamicForms` que debe limpiar los datos.
   */
  const handleReset = () => {
    localStorage.removeItem("formResponses");
    setProgress(1);
    if (isCompleted) setIsCompleted(false);
    if (cuestionarios.length > 0) setTitle(t(cuestionarios[0].titulo));
    setShouldResetForm(true); // Activar el flag para resetear el formulario
  };

  /**
   * Desactiva `shouldResetForm` tras completar el reinicio del formulario.
   *
   * - Se ejecuta cuando `DynamicForms` ha limpiado los datos y ha confirmado el reset.
   */
  const handleResetComplete = () => {
    setShouldResetForm(false);
  };

  useEffect(() => {
    /**
     * Obtiene los cuestionarios desde el servidor mediante una petición HTTP.
     *
     * - Realiza una solicitud para cargar los cuestionarios en formato JSON.
     * - Maneja el estado de carga (`setIsLoading`).
     * - Guarda los cuestionarios en el estado (`setCuestionarios`).
     * - Si hay cuestionarios disponibles, establece el título del primero (`setTitle`).
     * - Captura errores y los muestra en consola.
     *
     * @async
     * @returns {Promise<void>} No retorna ningún valor, solo actualiza los estados.
     * @throws {Error} Si la respuesta del servidor no es satisfactoria.
     **/
    const fetchCuestionarios = async () => {
      try {
        const response = await fetch("/data/cuestionarios.json");
        if (!response.ok) throw new Error("Error at loading data");
        const data = await response.json();
        setCuestionarios(data);
        localStorage.setItem("preguntas-cuestionario", JSON.stringify(data));
        setIsLoading(false);
        if (data.length > 0) {
          setTitle(t(data[0].titulo));
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchCuestionarios();
  }, [t]);
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="flex justify-center gap-30"
    >
      <div className="w-lg text-left flex-column">
        <div className="items-center">
          <div className="bg-emerald-400 w-40 h-1 inline-block m-2 mb-0.5"></div>
          <h3 className="mb-5 inline-block">FORMS</h3>
        </div>
        {/* Título principal que cambia dinámicamente:
          - Muestra "¡Completado!" cuando se han respondido todos los cuestionarios (isCompleted = true)
          - Título del cuestionario actual.
        */}
        <h1 className="uppercase font-bold text-7xl font-righteous mb-5 text-blue-600">
          {isCompleted ? t("formComplete.complete") : title}
        </h1>
        <p className="my-5">{description}</p>
        <div className="flex gap-4">
          {isCompleted && (
            <Button
              enabled={true}
              onClick={() => navigate("/results")}
              text={t("buttons.results")}
            />
          )}
          <Button
            onClick={handleReset}
            enabled={true}
            text={"Reset form"}
          ></Button>
        </div>
      </div>
      <div className="flex gap-10 items-center">
        {/* Muestra un mensaje de carga mientras se obtienen los datos de los cuestionarios */}
        {isLoading ? (
          <p>Loading Forms...</p>
        ) : (
          <>
            <ul className="flex flex-col gap-5 text-lg font-gabarito">
              {/* Renderiza los indicadores de progreso numerados para cada cuestionario */}
              {cuestionarios.map((_, index) => (
                <li
                  key={index}
                  className={`w-14 flex justify-center shadow-[0px_1px_4px_rgba(0,0,0,0.25)] items-center h-14 rounded-full
                  ${
                    /* Aplica estilo de completado (verde) a los cuestionarios ya visitados,
                       y estilo inactivo (gris) a los pendientes */
                    index + 1 <= progress
                      ? "bg-emerald-400 text-emerald-950"
                      : "bg-stone-50 text-black/40"
                  }`}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`w-14 flex justify-center items-center h-14 rounded-full shadow-[0px_1px_4px_rgba(0,0,0,0.25)]
                ${isCompleted ? "bg-emerald-400" : "bg-stone-50"}`}
              >
                <svg
                  width="21"
                  height="19"
                  viewBox="0 0 21 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.0584 0.142906C18.3696 1.1173 16.461 2.51228 14.6663 4.08545C13.2199 5.35361 11.6773 6.88182 10.2486 8.46141C9.26295 9.55299 8.20026 10.8228 7.24031 12.0572C6.90641 12.4874 6.04278 13.64 5.77149 14.0205C5.63183 14.2163 5.55478 14.311 5.53873 14.3062C5.52588 14.303 4.30427 13.6159 2.82582 12.7812L0.136996 11.261L0.0759953 11.33C0.0438899 11.3686 0.00857399 11.4103 0.000547644 11.4247C-0.0138998 11.4504 0.214048 11.7169 6.02673 18.4574L6.49386 19H6.55807H6.62228L6.98668 18.2728C8.78618 14.6915 10.5536 11.7426 12.5586 8.9751C14.769 5.92669 17.2716 3.11907 20.0873 0.532986C20.2879 0.34838 20.4517 0.192669 20.4517 0.186248C20.4517 0.178222 20.3409 0.0209056 20.32 3.70978e-05C20.3168 -0.00156817 20.1996 0.0626426 20.0584 0.142906Z"
                    className={`${
                      isCompleted ? "fill-emerald-950" : "fill-black/40"
                    }`}
                  />
                </svg>
              </li>
            </ul>
            {/**
             * Verificamos si todos los formularios han sido respondidos.
             *
             * - Si `isCompleted` es true, se muestran las respuestas registradas.
             * - Si aún hay formularios pendientes, se muestra el formulario actual.
             **/}
            {!isCompleted ? (
              <DynamicForms
                cuestionarios={cuestionarios}
                currentFormIndex={progress - 1}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirstStep={progress === 1}
                shouldReset={shouldResetForm}
                onResetComplete={handleResetComplete}
              />
            ) : (
              <div>
                <img src={robotics} alt="Robot Illustration" />
                <a
                  href="https://storyset.com/technology"
                  className="text-xs text-blue-400"
                >
                  Technology illustrations by Storyset
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </m.div>
  );
}
export default FormLayout;
