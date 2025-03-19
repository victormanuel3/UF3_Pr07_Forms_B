import "./App.css";
import Footer from "./layouts/Footer.tsx";
import FormLayout from "./layouts/FormLayout.tsx";
import Header from "./layouts/Header.tsx";

function App() {
  return (
    <div className="font-gabarito bg-purple-200 text-emerald-950">
      <Header />
      <FormLayout />
      <Footer />
    </div>
  );
}

export default App;
