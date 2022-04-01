import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardViajeUsuario.css";
import { VscLocation } from "react-icons/vsc";
import { MdSmokeFree, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";
import link from "../Links";

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
}) {
  //get de usuario (nombre, apellido y valoracion). foto usuario. Provincias/localidades como llegan y si se puede mostras cada una independiente de la otra. Iniciar sesion con aut 0 y con las cuquis trabajar con la info.
  return (
    <div className="container-card-total font-mono italic">
      <div className="perfil-card">
        <div className="img-perfil-card">
          <img src={link} alt="" />
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
          {console.log(id)}
          {viajeDisponible ? (

            <Link to={"/detalle/" + id} id="ver">

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
