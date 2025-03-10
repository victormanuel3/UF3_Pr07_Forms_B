import { useState } from "react";
import PersonalForm from "../forms/PersonalForm";

function FormLayout() {
    const [header, setHeader] = useState("Formulario Personal");
    const [rules, setRules] = useState("NORMAS");
    const [progressForm, setProgressForm] = useState(1);

    const handleProgressForm = () => {
        setProgressForm(progressForm + 1);
    }

    return (
        <div className="flex justify-center gap-20">
            <div className="w-min flex items-center flex-col justify-center">
                <div className="flex flex-row">
                    <svg width="300" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect width="250" height="5" x="30" y="18" />
                    </svg>
                    <svg width="50" height="50">
                        <polygon points="0 20, 20 40, 40 20, 20 0" />
                    </svg>
                    <svg width="300" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect width="250" height="5" x="10" y="18" />
                    </svg>
                </div>
                <h1 className="uppercase font-bold text-7xl font-righteous">{header}</h1>
                <div className="flex flex-row mt-10">
                    <svg width="300" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect width="250" height="5" x="30" y="18" />
                    </svg>
                    <svg width="50" height="50">
                        <polygon points="0 20, 20 40, 40 20, 20 0" />
                    </svg>
                    <svg width="300" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect width="250" height="5" x="10" y="18" />
                    </svg>
                </div>
            </div>
            <div className="flex gap-10 items-center">
                <ul className="flex flex-col gap-5 text-lg">
                    <li className="w-14 flex justify-center items-center h-14 rounded-full bg-gray-200">1</li>
                    <li className="w-14 flex justify-center items-center h-14 rounded-full bg-gray-200">2</li>
                    <li className="w-14 flex justify-center items-center h-14 rounded-full bg-gray-200">3</li>
                    <li className="w-14 flex justify-center items-center h-14 rounded-full bg-gray-200">4</li>
                    <li className="w-14 flex justify-center items-center h-14 rounded-full bg-gray-200">
                        <i className="fa-sharp fa-solid fa-check"></i>
                    </li>
                </ul>
                <PersonalForm />

                <div className="ml-20">
                    <h3 className="uppercase font-bold text-5xl mb-5 font-righteous">{rules}</h3>
                    <div className="flex flex-col gap-5 w-79 h-50 p-6 shadow-lg rounded-3xl bg-stone-50"></div>
                </div>
            </div>
        </div>
    );
}

export default FormLayout