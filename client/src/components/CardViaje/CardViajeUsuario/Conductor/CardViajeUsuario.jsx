import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardViajeUsuario.css";
import { VscLocation } from "react-icons/vsc";
import { MdSmokeFree, MdSmokingRooms, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import link from "../../Links";
import { RiSteering2Fill } from "react-icons/ri";
import user from "../../../../assets/user.png";

export default function Card({
  origen,
  destino,
  fecha,
  hora,
  asientosAOcupar,
  aceptaEquipaje,
  aceptaFumador,
  aceptaMascota,
  usaBarbijo,
  viajeDisponible,
  nombre,
  apellido,
  id,
  status,
  email,
  puntuacion,
  avatar,
}) {
  //get de usuario (nombre, apellido y valoracion). foto usuario. Provincias/localidades como llegan y si se puede mostras cada una independiente de la otra. Iniciar sesion con aut 0 y con las cuquis trabajar con la info.

  
  return (
    <div className="container-cardviaje">
      <div id="nueva-clase">
        <div class="parent">
          <RiSteering2Fill className="steering" />
          <div class="div1">
            <img src={avatar ? avatar : user} alt="" />
            <div className="info-personal-card">
              <Link to={`/perfil/${email}`}>
                <span>
                  {nombre + " "} {apellido}
                </span>
              </Link>
              <div className="puntuacion">
                {puntuacion === 5 ? (
                  <>
                    <ImStarFull className="black" />
                    <ImStarFull className="black" />
                    <ImStarFull className="black " />
                    <ImStarFull className="black" />
                    <ImStarFull className="black " />
                  </>
                ) : puntuacion === 4 ? (
                  <>
                    {" "}
                    <ImStarFull className="black" />
                    <ImStarFull className="black " />
                    <ImStarFull className="black" />
                    <ImStarFull className="black " />
                    <ImStarEmpty className="black" />
                  </>
                ) : puntuacion === 3 ? (
                  <>
                    <ImStarFull className="black " />
                    <ImStarFull className="black" />
                    <ImStarFull className="black " />
                    <ImStarEmpty className="black" />
                    <ImStarEmpty className="black" />
                  </>
                ) : puntuacion === 2 ? (
                  <>
                    <ImStarFull className="black" />
                    <ImStarFull className="black " />
                    <ImStarEmpty className="black" />
                    <ImStarEmpty className="black" />
                    <ImStarEmpty className="black" />
                  </>
                ) : puntuacion === 1 ? (
                  <>
                    <ImStarFull className="black " />
                    <ImStarEmpty className="black" />
                    <ImStarEmpty className="black" />
                    <ImStarEmpty className="black" />
                    <ImStarEmpty className="black" />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
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
            {aceptaMascota ? <MdPets className="line-through" /> : <></>}
            {aceptaFumador ? <MdSmokingRooms /> : <MdSmokeFree />}
            {aceptaEquipaje ? (
              <FaSuitcaseRolling className="decoration-double" />
            ) : (
              <></>
            )}
            {usaBarbijo ? <MdMasks /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}
