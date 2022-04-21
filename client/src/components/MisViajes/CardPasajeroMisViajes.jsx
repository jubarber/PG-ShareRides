import React, { useEffect } from "react";
import "../CardViaje/CardViajeUsuario/Conductor/CardViajeUsuario.css";
import { VscLocation } from "react-icons/vsc";
import { MdSmokeFree, MdSmokingRooms, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import Cookies from "universal-cookie";

export default function CardPasajeroMisViajes({
  origen,
  destino,
  fecha,
  hora,
  asientosAOcupar,
  aceptaEquipaje,
  aceptaFumador,
  aceptaMascota,
  usaBarbijo,
}) {
  const cookies = new Cookies();

  const cookieMail = cookies.get("email");

  // console.log("esto llega como avatar:", avatar);
  //get de usuario (nombre, apellido y valoracion). foto usuario. Provincias/localidades como llegan y si se puede mostras cada una independiente de la otra. Iniciar sesion con aut 0 y con las cuquis trabajar con la info.
  return (
    <div className="container-cardviaje">
      <div id="nueva-clase">
        <div class="parent">
          <BsPersonFill className="person" />
          <div class="div2">
            <i className="flex">
              <VscLocation className="text-green-400" />
              <i>
                {origen} <p>{">"}</p>
                {destino}
              </i>
            </i>
            <i>
              {fecha} - {hora} hs
            </i>
            {asientosAOcupar > 1 ? (
              <i>{asientosAOcupar + " "}Lugares Requeridos</i>
            ) : asientosAOcupar === 1 ? (
              <i>{asientosAOcupar + " "}Lugar Requerido</i>
            ) : asientosAOcupar === 0 ? (
              <i>Viaje Completo</i>
            ) : null}
          </div>
          <div class="div3">
            {aceptaMascota ? <MdPets /> : <div></div>}
            {aceptaFumador ? <MdSmokingRooms /> : <MdSmokeFree />}
            {aceptaEquipaje ? <FaSuitcaseRolling /> : <div></div>}
            {usaBarbijo ? <MdMasks /> : <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
