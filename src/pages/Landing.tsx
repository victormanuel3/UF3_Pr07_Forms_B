import { motion as m } from "framer-motion";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import PathDrawing from "../components/PathDrawing";
import { useTranslation } from "react-i18next";

function Landing() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="max-h-screen flex justify-center gap-30"
    >
      <div className="w-3xl text-left flex-column">
        <div className="items-center">
          <div className="bg-emerald-400 w-40 h-1 inline-block m-2 mb-0.5"></div>
          <h3 className="mb-5 inline-block">FORMS</h3>
        </div>
        <h1 className="uppercase font-bold text-9xl font-righteous mb-5 text-pink-600">
          FORMS LTD.
        </h1>
        <p className="mb-10 w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          corrupti hic nobis odio explicabo adipisci reprehenderit modi commodi
          dolores nulla neque consequatur libero, accusantium omnis repellendus
          a eveniet atque culpa?
        </p>
        <Button
          enabled={true}
          onClick={() => navigate("/forms")}
          text={t("buttons.start")}
        />
      </div>
      <div className="mb-40">
        <PathDrawing />
      </div>
    </m.div>
  );
}

export default Landing;
