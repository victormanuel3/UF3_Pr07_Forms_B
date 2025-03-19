import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./layouts/Footer.tsx";
import FormLayout from "./layouts/FormLayout.tsx";
import Header from "./layouts/Header.tsx";
import Landing from "./pages/Landing.tsx";
import Results from "./pages/Results.tsx";

function App() {
  return (
    <div className="font-gabarito bg-purple-200 text-emerald-950">
        <Header />

        <Routes>
          <Route path="/home" element={<Landing />} />
          <Route path="/forms" element={<FormLayout />} />
          <Route path="/results" element={<Results />} />
        </Routes>

        <Footer />
    </div>
  );
}

export default App;
