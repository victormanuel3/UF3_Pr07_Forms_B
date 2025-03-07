import FormLayout from './FormLayout';

const WebLayout = () => {
    return (
        <>
            <header className="w-screen h-24 mb-24 font-gabarito text-stone-800 flex flex-row justify-between bg-lime-500">
                <div className="bg-stone-50 h-[80px] w-[80px] rounded-full m-5"></div>
                <p className="text-3xl font-righteous text-gabarito">FIRST STEP</p>
                {/* TO MAKE A COMPONENT */}
                <button className="bg-stone-50 h-[80px] w-[100px] rounded-full">RESET</button>
            </header>

            <div>
                <FormLayout />

            </div>

            <footer className="w-screen h-60 mt-24 font-gabarito bg-stone-800 text-white">FOOTER</footer>
        </>
    )
}

export default WebLayout;
