import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardViajeUsuario.css";
import { VscLocation } from "react-icons/vsc";
import { MdSmokeFree, MdSmokingRooms, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";
import link from "../../Links";

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
    <div className="container-cardviaje font-mono">
      <div id="nueva-clase">
        <div class="parent">
          {/* <div class="div1">
            <img src={link} alt="" />
            <div className="info-personal-card">
              <span>nombre apellido</span>
              <div className="puntuacion">
                <ImStarFull className="black" />
                <ImStarFull className="black" />
                <ImStarFull className="black " />
                <ImStarHalf className="black" />
                <ImStarEmpty className="black" />
              </div>
            </div>
          </div> */}
          <div class="div2">
            <i className="flex">
              <VscLocation className="text-green-400" />
              <i>
                CABA/Buenos aires <p>{">"}</p> Mar del plata/Buenos aires
              </i>
            </i>
            <i>08/12/2022 - 12:00 hs</i>
            <i>2 logares libres</i>
          </div>
          <div class="div3">
            <MdPets />
            <FaSuitcaseRolling />
            <MdMasks />
            <MdSmokingRooms />
            {/* {aceptaMascota ? <MdPets /> : <></>}
              {aceptaFumador ? <MdSmokingRooms /> : <MdSmokeFree />}
              {aceptaEquipaje ? <FaSuitcaseRolling /> : <></>}
              {usaBarbijo ? <MdMasks /> : <></>} */}
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="card-usuario-infper-detalle">
          <div className="card-usuario-img-detalle">
            <img src={link} alt="" />
          </div>
          <div className="card-usuario-nombre-val-detalle text-xl">
            <span className="text-white">Jorge Martin</span>
            <span>Valoracion estrellas</span>
          </div>
          <div className="detalle-cardviaje">
            
          </div>
        </div>         
      </div>
      <div id="nueva-clase">
        <div className="card-usuario-infper-detalle">
          <div className="card-usuario-img-detalle">
            <img src={link} alt="" />
          </div>
          <div className="card-usuario-nombre-val-detalle">
            <span className="text-white my-9">Jorge Martin</span>
            <span>Valoracion estrellas</span>
          </div>
        </div>
      </div>
      <div id="nueva-clase">
        <div className="card-usuario-infper-detalle">
          <div className="card-usuario-img-detalle">
            <img src={link} alt="" />
          </div>
          <div className="card-usuario-nombre-val-detalle text-xl">
            <span className="text-white my-9">Jorge Martin</span>
            <span>Valoracion estrellas</span>
          </div>
        </div>
      </div> */
}
