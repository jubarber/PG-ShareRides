import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import { Home } from "./components/Home";
import Filtros from "./components/Filtros/Filtros";
import Perfil from "./components/Perfil/Perfil";
import Navbar from "./components/NavBar";
import FormPerfil from "./components/FormPerfil/FormPerfil.jsx";
import FormRegistro from './components/FormRegistro/FormRegistro';
// import { DetalleViaje } from "./components/DetalleViaje";
// import CardViajeUsuario from "./components/CardViaje/CardViajeUsuario/CardViajeUsuario"
import Login from "./components/Login"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/perfil" element={<Perfil />} />
          <Route exact path="/perfil/editar" element={<FormPerfil />} />
          <Route exact path="/registro" element = {<FormRegistro />} />
          {/* <Route exact path="/viajes/detalle" element={<DetalleViaje/>}/>
          <Route exact path="/viajeusuario" element={<CardViajeUsuario/>}/> */}
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;