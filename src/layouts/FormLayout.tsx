import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import robotics from "../../public/img/robotics.gif";
import Button from "../components/Button";
import LoadingCircleSpinner from "../components/Loading";
import DynamicForms from "../form/DynamicForms";
import { FormSection } from "../interfaces/form.interfaces";

function FormLayout() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(1);
  const [cuestionarios, setCuestionarios] = useState<FormSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleNext = () => {
    if (progress < cuestionarios.length) {
      setProgress(progress + 1);
      setTitle(t(cuestionarios[progress].titulo));
      setDescription(t(cuestionarios[progress].descripcion));
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (progress > 0) {
      setProgress(progress - 1);
      setTitle(t(cuestionarios[progress - 2].titulo));
      setDescription(t(cuestionarios[progress - 2].descripcion));
    }
  };

  useEffect(() => {
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
        <h1 className="uppercase font-bold text-7xl font-righteous mb-5 text-blue-600">
          {isCompleted ? t("formComplete.complete") : title}
        </h1>
        <p className="my-5">{description}</p>
        {isCompleted && (
          <Button
            enabled={true}
            onClick={() => navigate("/results")}
            text={t("buttons.results")}
          />
        )}
      </div>
      <div className="flex gap-10 items-center">
        {isLoading ? (
          <LoadingCircleSpinner />
        ) : (
          <>
            <ul className="flex flex-col gap-5 text-lg font-gabarito">
              {cuestionarios.map((_, index) => (
                <li
                  key={index}
                  className={`w-14 flex justify-center shadow-[0px_1px_4px_rgba(0,0,0,0.25)] items-center h-14 rounded-full
                  ${
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
            {!isCompleted ? (
              <DynamicForms
                cuestionarios={cuestionarios}
                currentFormIndex={progress - 1}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirstStep={progress === 1}
              />
            ) : (
              <div>
                <img src={robotics} alt="Robot Illustration" />
                <a href="https://storyset.com/technology" className="text-xs text-blue-400">Technology illustrations by Storyset</a>
              </div>
            )}
          </>
        )}
      </div>
    </m.div>
  );
}
export default FormLayout;
