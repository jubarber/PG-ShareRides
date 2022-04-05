import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Perfil from "./components/Perfil/Perfil";
<<<<<<< HEAD
import FormPerfil from "./components/FormPerfil/FormPerfil.jsx";
=======
>>>>>>> develop
import FormRegistro from './components/FormRegistro/FormRegistro';
import FormViaje from "./components/FormViaje/FormViaje"
import FormPasajero from "./components/FormViaje/FormPasajero"
import FormVehiculo from "./components/FormViaje/FormVehiculo"
import FormConductor from "./components/FormViaje/FormConductor"
import { DetalleViaje } from "./components/DetalleViaje/DetalleViaje";
import Login from "./components/Login/Login"



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/perfil" element={<Perfil />} />
<<<<<<< HEAD
          <Route exact path="/perfil/editar" element={<FormPerfil />} />
=======
>>>>>>> develop
          <Route exact path="/registro" element = {<FormRegistro />} />
          <Route exact path="/formviaje" element = {<FormViaje />} />
          <Route exact path="/formpasajero" element = {<FormPasajero />} />
          <Route exact path="/formvehiculo" element = {<FormVehiculo />} />
          <Route exact path="/formconductor" element = {<FormConductor />} />
<<<<<<< HEAD
          <Route exact path="/registro" element={<FormRegistro />} />
          <Route exact path="/viajes/detalle" element={<DetalleViaje />} />
=======
          <Route exact path="/detalle/:id" element={<DetalleViaje />} />
          <Route exact path="/login" element={<Login />} />

>>>>>>> develop
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
