import React, { useEffect } from "react";
import "../CardViaje/CardViajeUsuario/Conductor/CardViajeUsuario.css";
import { VscLocation } from "react-icons/vsc";
import { MdSmokeFree, MdSmokingRooms, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { RiSteering2Fill } from "react-icons/ri";
import Cookies from "universal-cookie";

export default function CardConductoreMisViajes({
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

  //get de usuario (nombre, apellido y valoracion). foto usuario. Provincias/localidades como llegan y si se puede mostras cada una independiente de la otra. Iniciar sesion con aut 0 y con las cuquis trabajar con la info.
  const cookieMail = cookies.get("email");

  return (
    <div className="container-cardviaje">
      <div id="nueva-clase">
        <div class="parent">
          <RiSteering2Fill className="steering" />
          <div class="div2">
            <i className="flex">
              <VscLocation className="text-green-400" />
              <i>
                {origen} <p>{">"}</p> {destino}
              </i>
            </i>
            <i>
              {fecha} - {hora} hs
            </i>
            {asientosAOcupar > 1 ? (
              <i>{asientosAOcupar + " "}Lugares Disponibles</i>
            ) : asientosAOcupar === 1 ? (
              <i>{asientosAOcupar + " "}Lugar Disponible</i>
            ) : asientosAOcupar === 0 ? (
              <i>Viaje Completo</i>
            ) : null}
          </div>
          <div class="div3">
            {aceptaMascota ? <MdPets className="line-through" /> : <div></div>}
            {aceptaFumador ? <MdSmokingRooms /> : <MdSmokeFree />}
            {aceptaEquipaje ? (
              <FaSuitcaseRolling className="decoration-double" />
            ) : (
              <div></div>
            )}
            {usaBarbijo ? <MdMasks /> : <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
