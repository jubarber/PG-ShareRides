import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardViajeUsuario.css";
import { VscLocation } from "react-icons/vsc";
import { MdSmokeFree, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";


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
}) {
  //get de usuario (nombre, apellido y valoracion). foto usuario. Provincias/localidades como llegan y si se puede mostras cada una independiente de la otra. Iniciar sesion con aut 0 y con las cuquis trabajar con la info.

  return (
    <div className="container-card-total font-mono italic">
      <div className="perfil-card">
        <div className="img-perfil-card">
          <img
            src="data:image/png;base64,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"
            alt=""
          />
        </div>
        <div className="perfil-card-usuario">
          <i className="">
            {nombre} {apellido}
          </i>
          <div className="puntuacion">
            <ImStarFull className="text-yellow-50" />
            <ImStarFull className="text-yellow-50" />
            <ImStarFull className="text-yellow-50 " />
            <ImStarHalf className="text-yellow-50" />
            <ImStarEmpty className="text-yellow-50" />
          </div>
        </div>
      </div>
      <div className="container-card">
        <div className="data-card">
          <div className="prueba">
            <i className="text-orange-600 text-xs text-left w-full flex flex-col-reverse w-4/12">
              <VscLocation className="icono text-purple-600" />
              origen
            </i>

            <i className="text-base w-full">{origen}</i>
          </div>
          <i className="text-right w-full text-sm	">{origen}</i>
          <div className="prueba">
            <i className="text-sky-400 text-xs text-left w-full flex flex-col-reverse w-4/12">
              <VscLocation className="icono text-purple-600" />
              destino
            </i>

            <i className="text-base w-full">{destino}</i>
          </div>
          <i className="text-right w-full text-sm	">{destino}</i>
          <h5 className="text-center text-xs">
            {hora} <p className="text-right text-xs">{fecha}</p>
          </h5>
          <div className="dos">
            <h5 className="text-left">
              {asientosAOcupar > 1
                ? `${asientosAOcupar} lugares libres`
                : asientosAOcupar === 1
                ? `${asientosAOcupar} lugar libre`
                : ""}
            </h5>
          </div>
        </div>
        <div className="icon-card">
          <div className="iconos">
            {aceptaMascota ? <MdPets /> : <></>}
            {aceptaFumador ? <MdSmokeFree /> : <></>}
            {aceptaEquipaje ? <FaSuitcaseRolling /> : <></>}
            {usaBarbijo ? <MdMasks /> : <></>}
          </div>
          {viajeDisponible ? (
            <Link to={"/viajes/detalle"} id="ver">
              <div>
                <button className="ver-button">Ver</button>
              </div>
            </Link>
          ) : (
            <h5>Lleno</h5>
          )}
        </div>
      </div>
    </div>
  );
}
