import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Perfil from "./components/Perfil/Perfil";
import FormRegistro from "./components/FormRegistro/FormRegistro";
import FormViaje from "./components/FormViaje/FormViaje";
import FormPasajero from "./components/FormViaje/FormPasajero";
import FormVehiculo from "./components/FormViaje/FormVehiculo";
import FormConductor from "./components/FormViaje/FormConductor";
import { DetalleViajec } from "./components/DetalleViaje/Conductor/DetalleViaje";
import { DetalleViajep } from "./components/DetalleViaje/Pasajero/DetalleViaje";
import Login from "./components/Login/Login";
import RegistroGoogle from "./components/RegistroGoogle/RegistroGoogle";
import Admin from "./components/Admin/AdminLogin";
import AdminHome from "./components/Admin/AdminHome";
import RestaurarCuenta from "./components/RestaurarCuenta/RestaurarCuenta";
// import Card from "./components/CardViaje/CardViajeUsuario/Conductor/CardViajeUsuario"
import Calendario from "./components/Calendar/Calendar";
import Temporal from "./components/TemporalColaboracion/Temporal";
import Colaboracion from "./components/Colaboraciones/Colaboracion";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/perfil/:email" element={<Perfil />} />
          <Route exact path="/registro" element={<FormRegistro />} />
          <Route exact path="/formviaje" element={<FormViaje />} />
          <Route exact path="/formpasajero" element={<FormPasajero />} />
          <Route exact path="/formvehiculo" element={<FormVehiculo />} />
          <Route exact path="/formconductor" element={<FormConductor />} />
          <Route exact path="/detallec/:id" element={<DetalleViajec />} />
          <Route exact path="/detallep/:id" element={<DetalleViajep />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registrogoogle" element={<RegistroGoogle />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/adminhome" element={<AdminHome />} />
          <Route exact path="/calendario" element={<Calendario />} />
          <Route exact path="/restaurarCuenta" element={<RestaurarCuenta />} />
          <Route exact path="/temporal" element={<Temporal />} />
          <Route
            exact
            path="/colaboraciones/:email"
            element={<Colaboracion />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
