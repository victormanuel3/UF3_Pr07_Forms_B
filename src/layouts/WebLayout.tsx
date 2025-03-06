import FormLayout from './FormLayout';

const WebLayout = () => {
    return (
        <>
            <header className="w-screen h-24 mb-24 font-gabarito bg-lime-500 text-black">HEADER</header>

            <div>
                <FormLayout />

            </div>

            <footer className="w-screen h-60 mt-24 font-gabarito bg-lime-500 text-black">FOOTER</footer>
        </>
    )
}

export default WebLayout;
