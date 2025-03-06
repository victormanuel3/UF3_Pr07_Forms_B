import { useState } from "react";
import PersonalForm from "../forms/PersonalForm";

function FormLayout() {
    const [header, setHeader] = useState("Formulario Personal")
    const [progressForm, setProgressForm] = useState(1);

    const handleProgressForm = () => {
        setProgressForm(progressForm + 1);
    }

    return (
        <div className="flex justify-center gap-40">
            <div className="w-min">
                <h1 className="uppercase font-bold text-7xl">{header}</h1>
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
                <PersonalForm/>
            </div>
        </div>
    );
}

export default FormLayout