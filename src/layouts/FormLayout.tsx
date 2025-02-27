import { useState } from "react";
import PersonalForm from "../forms/PersonalForm";

function FormLayout() {
    const [progressForm, setProgressForm] = useState(1);

    const handleProgressForm = () => {
        setProgressForm(progressForm + 1);
    }

    return (
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
            {/* to do switch
            
                if progress form is 1, show Personal Form ...
            */}
            <PersonalForm progress={handleProgressForm} />
        </div>
    );
}

export default FormLayout