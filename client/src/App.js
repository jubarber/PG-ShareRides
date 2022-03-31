import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import { Home } from "./components/Home";
import { Filtros } from "./components/Filtros"
import Perfil from "./components/Perfil/Perfil";
import FormPerfil from "./components/FormPerfil/FormPerfil.jsx";
import FormRegistro from './components/FormRegistro/FormRegistro';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/filtros" element={<Filtros />} />
          <Route exact path="/perfil" element={<Perfil />} />
          <Route exact path="/perfil/editar" element={<FormPerfil />} />
          <Route exact path="/registro" element = {<FormRegistro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
