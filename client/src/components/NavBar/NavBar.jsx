import React from "react";
import { Filtros } from "../Filtros/Filtros";
import "./NavBar.css";
import userRojo from "../../assets/userRojo.jpg";
import logo from "../../assets/Icono shareRides.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="contenedor-NavBar">
      <div className="contenedor-titulo">
        <div className="titulo-NavBar">
          <h1>
            <img src={logo} alt="" />
            Share Rides
          </h1>
        </div>
        <div className="panel-botones">
          <button type="button" class="btn btn-outline-primary">
            <Link to="/home">Home</Link>
          </button>
          <button type="button" class="btn btn-outline-primary">
            <Link to="/#">Crear Viaje</Link>
          </button>
        </div>
        <div className="info-usuario">
          <h3>Hola, Julio</h3>
          <img src={userRojo} alt="" />
        </div>
      </div>
    </div>
  );
}
