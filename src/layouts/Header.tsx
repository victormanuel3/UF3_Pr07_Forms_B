import { useLocation, useNavigate } from "react-router";
import LanguageSwitch from "../components/LanguageSwitch";

const Header = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  let title: string;
  switch (pathname) {
    case "/":
      title = "HOME";
      break;
    case "/forms":
      title = "FORM TIME!";
      break;
    case "/results":
      title = "RESULTS";
      break;
    default:
      title = "ERROR 404";
      break;
  }

  return (
    <div>
      <header className="max-w-screen h-24 mb-24 font-gabarito text-stone-800 ">
        <div className="flex items-center justify-between max-h-screen">
          <div
            onClick={() => navigate("/")}
            className="bg-stone-50 h-[80px] w-[80px] rounded-full m-5"
          ></div>
          <p
            onClick={() => navigate("/")}
            className="text-3xl font-righteous text-gabarito text-pink-600"
          >
            {title}
          </p>
          <LanguageSwitch />
        </div>
      </header>
    </div>
  );
};

export default Header;
