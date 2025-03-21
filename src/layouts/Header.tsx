import * as motion from "motion/react-client";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import logo from "../../public/img/logo.gif";
import LanguageSwitch from "../components/LanguageSwitch";

const Header = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const location = useLocation();
  const { pathname } = location;

  let title: string;
  switch (pathname) {
    case "/":
      title = t("header.home");
      break;
    case "/forms":
      title = t("header.forms");
      break;
    case "/results":
      title = t("header.results");
      break;
    default:
      title = "ERROR 404";
      break;
  }

  return (
    <div>
      <header className="max-w-screen h-24 mb-24 font-gabarito text-stone-800 ">
        <div className="flex items-center justify-between max-h-screen">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => navigate("/")}
            className="h-[80px] w-[80px] rounded-full m-5"
          >
            <img src={logo} alt="Logo" />
          </motion.div>
          <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}
            onClick={() => navigate("/")}
            className="text-3xl font-righteous text-gabarito text-pink-600"
          >
            {title}
          </motion.p>
          <LanguageSwitch />
        </div>
      </header>
    </div>
  );
};

export default Header;
