import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import  Home  from "./components/Home/Home";
// import Filtros from "./components/Filtros/Filtros";
import Perfil from "./components/Perfil/Perfil";
import FormPerfil from "./components/FormPerfil/FormPerfil.jsx";
import FormRegistro from './components/FormRegistro/FormRegistro';
<<<<<<< HEAD
// import { DetalleViaje } from "./components/DetalleViaje";
// import CardViajeUsuario from "./components/CardViaje/CardViajeUsuario/CardViajeUsuario"
// import Login from "./components/Login"
=======
>>>>>>> develop


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
<<<<<<< HEAD
          {/* <Route exact path="/viajes/detalle" element={<DetalleViaje/>}/>
          <Route exact path="/viajeusuario" element={<CardViajeUsuario/>}/> */}
          {/* <Route exact path="/login" element={<Login />} /> */}
=======
>>>>>>> develop
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;