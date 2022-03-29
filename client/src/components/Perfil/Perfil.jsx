import React from "react";
import { Link } from "react-router-dom";
import fondo from "../../assets/fondo perfil.jpg";
import "./Perfil.css";

export default function Perfil() {
  return (
    <div className="container">
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"
          alt=""
          width="30"
          height="30"
        />
      </div>
      <div></div>
      <button>
        <Link to={"/perfil/editar"}>Editar Perfil</Link>
      </button>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
