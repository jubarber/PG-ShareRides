import React from "react";
import { Link } from "react-router-dom";
import "./CardViaje.css";
import { VscLocation } from "react-icons/vsc";
import { MdSmokeFree, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";

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
}) {
  return (
    <div className="container-card font-mono italic">
      <div className="data-card">
        <div className="prueba">
          <i className="text-xs text-left w-full flex flex-col-reverse w-4/12">
            <VscLocation className="icono text-green-400" />
            origen
          </i>
          <i className="text-base w-full text-green-400">{origen}</i>
        </div>
        <i className="text-right w-full text-sm	">{origen}</i>
        <div className="prueba">
          <i className="text-xs text-left w-full flex flex-col-reverse w-4/12">
            <VscLocation className="icono text-red-600" />
            destino
          </i>
          <i className="text-base w-full text-red-600">{destino} </i>
        </div>
        <i className="text-right w-full text-sm	">{destino}</i>
        <h5 className="text-center text-xs">
          {hora} hs <p className="text-right text-xs">{fecha}</p>
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
          <Link to={"/viajes/"} id="ver">
            <div>
              <button className="ver-button">Ver</button>
            </div>
          </Link>
        ) : (
          <h5>Lleno</h5>
        )}
      </div>
    </div>
  );
}
