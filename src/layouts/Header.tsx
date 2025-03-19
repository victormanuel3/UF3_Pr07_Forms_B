const Header = () => {
  return (
    <div>
      <header className="w-screen h-24 mb-24 font-gabarito text-stone-800 ">
        <div className="flex items-center justify-between h-full">
          <div className="bg-stone-50 h-[80px] w-[80px] rounded-full m-5"></div>
          <p className="text-3xl font-righteous text-gabarito text-pink-600">FORMS LTD.</p>
          <div className="flex justify-center items-center">
            <button className="bg-stone-50 py-2.5 px-6 mr-2 rounded-full">
              RESET
            </button>
            <button className="bg-stone-50 w-12 h-12 mt-2 mr-2 rounded-full"></button>
            <button className="bg-stone-50 w-12 h-12 mt-2 mr-5 rounded-full"></button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
