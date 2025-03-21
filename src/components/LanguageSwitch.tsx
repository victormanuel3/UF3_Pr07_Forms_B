import * as motion from "motion/react-client";
import { useTranslation } from "react-i18next";
import es from "../../public/img/spain-flag.png";
import en from "../../public/img/uk-flag.png";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-4 items-center mr-5">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => changeLanguage("es")}
        className="w-10 h-10"
      >
        <img src={es} alt="Español" className="w-full h-full" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => changeLanguage("en")}
        className="w-10 h-10"
      >
        <img src={en} alt="English" className="w-full h-full" />
      </motion.button>
    </div>
  );
};

export default LanguageSwitch;
