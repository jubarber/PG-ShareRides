import React, { useEffect } from "react";
import "./Colaboracion.css";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import {
  getColaboraciones,
  getUsuarios,
  getViajesTotal,
} from "../../redux/actions/actions";

export default function Colaboracion() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
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

  console.log(viajes);

  return (
    <div>
      {colaboraciones.length !== 0 ? (
        colaboraciones.map((c) => {
          let viaje = viajes?.find((v) => v.id === c.viajeId);
          let usuarioCobrador = usuarios?.find(
            (u) => u.email === c.usuarioCobrador
          );
          return (
            <div>
              Monto de la colaboración: ${c.unit_price}
              <br />
              Persona con quien colaboraste: {usuarioCobrador?.nombre}{" "}
              {usuarioCobrador?.apellido}
              <br />
              El <a href={`/detallec/${viaje?.id}`}> viaje </a> fue de{" "}
              {viaje?.origen} a {viaje?.destino} el {viaje?.fecha}
            </div>
          );
        })
      ) : (
        <h2>Aún no hay colaboraciones</h2>
      )}

    </div>
  );
}
