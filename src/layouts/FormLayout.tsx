import { useEffect, useState } from "react";
import DynamicForms from "../form/DynamicForms";
import { FormSection } from "../interfaces/form.interfaces";

function FormLayout() {
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(1);
  const [cuestionarios, setCuestionarios] = useState<FormSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (progress < cuestionarios.length) {
      setProgress(progress + 1);
      setTitle(cuestionarios[progress].titulo);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    console.log("before", progress);
      if (progress > 0) {
          setProgress(progress - 1);
          console.log("after", progress);
      setTitle(cuestionarios[progress].titulo);
    }
  };

  useEffect(() => {
    const fetchCuestionarios = async () => {
      try {
        const response = await fetch("/data/cuestionarios.json");
        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        setCuestionarios(data);
        setIsLoading(false);
        if (data.length > 0) {
          setTitle(data[0].titulo);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchCuestionarios();
  }, []);

  return (
    <div className="flex justify-center gap-30">
      <div className="w-lg text-left flex-column">
        <div className="items-center">
          <div className="bg-emerald-400 w-40 h-1 inline-block m-2 mb-0.5"></div>
          <h3 className="mb-5 inline-block">FORMS</h3>
        </div>
        <h1 className="uppercase font-bold text-7xl font-righteous mb-5 text-pink-700">
          {isCompleted ? "¡Completado!" : title}
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque error
          quis et molestiae impedit? Reiciendis, debitis aliquam ratione
          maiores, nam dolorum quasi nulla, temporibus quas nemo architecto
          deleniti saepe consequuntur.
        </p>
      </div>
      <div className="flex gap-10 items-center">
        {isLoading ? (
          <p>Cargando formularios...</p>
        ) : (
          <>
            <ul className="flex flex-col gap-5 text-lg">
              {cuestionarios.map((_, index) => (
                <li
                  key={index}
                  className={`w-14 flex justify-center text-emerald-950  items-center h-14 rounded-full
                                        ${
                                          index + 1 <= progress
                                            ? "bg-emerald-400"
                                            : "bg-stone-50"
                                        }`}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`w-14 flex justify-center text-emerald-950 items-center h-14 rounded-full
                                ${
                                  isCompleted ? "bg-emerald-400" : "bg-gray-100"
                                }`}
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
                    fill="black"
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
              />
            ) : (
              <div>
                <p>Respuestas</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default FormLayout;
