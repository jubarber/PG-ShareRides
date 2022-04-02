import React from "react";
import { Filtros } from "../Filtros/Filtros";
import "./NavBar.css";
import userRojo from "../../assets/userRojo.jpg";

export default function NavBar() {
  return (
    <div className="contenedor-NavBar">
      <div className="contenedor-titulo">
        <div>
          <h1>Share Rides</h1>
        </div>
        <div className="panel-botones">
          <button>Home</button>
        </div>
        <div className="info-usuario">
          <h3>Hola, Julio</h3>
          <img src={userRojo} alt="" />
        </div>
      </div>
      <div>
        <Filtros />
      </div>
    </div>
  );
}
