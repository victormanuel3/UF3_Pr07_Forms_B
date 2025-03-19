import { useNavigate } from "react-router";
import Button from "../components/Button";
import PathDrawing from "../components/PathDrawing";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-svh flex justify-around">
      <div className="w-lg text-left flex-column">
        <div className="items-center">
          <div className="bg-emerald-400 w-40 h-1 inline-block m-2 mb-0.5"></div>
          <h3 className="mb-5 inline-block">FORMS</h3>
        </div>
        <h1 className="uppercase font-bold text-9xl font-righteous mb-5 text-pink-600">
          FORMS LTD.
        </h1>
        <Button
          enabled={true}
          onClick={() => navigate("/forms")}
          text={"Responder"}
        />
      </div>
      <PathDrawing />
    </div>
  );
}

export default Landing;
