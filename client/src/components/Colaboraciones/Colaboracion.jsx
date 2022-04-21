import React, { useEffect } from "react";
import "./Colaboracion.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import {
  getColaboraciones,
  getUsuarios,
  getViajesTotal,
} from "../../redux/actions/actions";
import fondo from "../../assets/fondo perfil.jpg";

export default function Colaboracion() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colaboraciones = useSelector((state) => state.colaboraciones);
  const usuarios = useSelector((state) => state.usuarios);
  const viajes = useSelector((state) => state.viajes);
  const cookieMail = cookies.get("email");
  const mailOtroUsuario = "";

  useEffect(() => {
    dispatch(getColaboraciones(cookieMail));
    dispatch(getUsuarios());
    dispatch(getViajesTotal());
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1 className="Colaboraciones__titulo">Mis Colaboraciones:</h1>
        <button className="Registro__btn_volver" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      {viajes.length !== 0 && (
        <div className="Colaboraciones__contenedor">
          {colaboraciones.length !== 0 ? (
            colaboraciones.map((c) => {
              let viaje;
              if (viajes.length !== 0)
                viaje = viajes.find((v) => v.id === c.viajeId);
              let usuarioCobrador = usuarios.find(
                (u) => u.email === c.usuarioCobrador
              );
              return (
                <div className="Colaboraciones__usuario">
                  Monto de la colaboración: ${c.unit_price}
                  <br />
                  Persona con quien colaboraste: {usuarioCobrador.nombre}{" "}
                  {usuarioCobrador.apellido}
                  <br />
                  El <a href={`/detallec/${viaje.id}`}> viaje </a> fue de{" "}
                  {viaje.origen} a {viaje.destino} el {viaje.fecha}
                </div>
              );
            })
          ) : (
            <h2>Aún no hay colaboraciones</h2>
          )}
        </div>
      )}
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
