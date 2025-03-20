import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./layouts/Footer.tsx";
import FormLayout from "./layouts/FormLayout.tsx";
import Header from "./layouts/Header.tsx";
import Landing from "./pages/Landing.tsx";
import Results from "./pages/Results.tsx";
import LanguageSwitch from "./components/LanguageSwitch.tsx";

function App() {
  return (
    <div className="font-gabarito bg-purple-200 text-emerald-950">
      <Header />

      <div className="max-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/forms" element={<FormLayout />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
