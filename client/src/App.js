<<<<<<< HEAD
<<<<<<< HEAD
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './components/LandingPage';

=======
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import { Home } from "./components/Home";
>>>>>>> develop
=======

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import { Home } from "./components/Home";
import Perfil from "./components/Perfil/Perfil";
import FormPerfil from "./components/FormPerfil/FormPerfil.jsx";
import FormRegistro from './components/FormRegistro/FormRegistro';
>>>>>>> develop

function App() {

  return (
    <div className="App">
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element= { <LandingPage/> }/>
      </Routes>
    
    </BrowserRouter>
=======
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/perfil" element={<Perfil />} />
          <Route exact path="/perfil/editar" element={<FormPerfil />} />
          <Route exact path="/registro" element={<FormRegistro />} />


        </Routes>
      </BrowserRouter>
>>>>>>> develop
    </div>
  );
}

export default App;
