import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import { Home } from "./components/Home";
import { Filtros } from "./components/Filtros"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/filtros" element={<Filtros />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
