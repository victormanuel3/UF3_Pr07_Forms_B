import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./layouts/Footer.tsx";
import FormLayout from "./layouts/FormLayout.tsx";
import Header from "./layouts/Header.tsx";
import Landing from "./pages/Landing.tsx";
import Results from "./pages/Results.tsx";

function App() {
  return (
    <div className="font-gabarito bg-blue-50 text-emerald-950">
      <Header />

      <div className="min-h-screen">
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
