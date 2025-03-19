import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="w-screen h-24 mb-24 font-gabarito text-stone-800 ">
        <div className="flex items-center justify-between h-full">
          <div onClick={() => navigate("/home")} className="bg-stone-50 h-[80px] w-[80px] rounded-full m-5"></div>
          <p onClick={() => navigate("/home")} className="text-3xl font-righteous text-gabarito text-pink-600">FORMS LTD.</p>
          <div className="flex justify-center items-center">
            <button className="bg-stone-50 w-12 h-12 mt-2 mr-5 rounded-full"></button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
