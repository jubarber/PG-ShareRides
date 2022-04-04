import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getViajesTotal } from "../../redux/actions/actions";
import { Filtros } from "../Filtros/Filtros";
import { DetalleViaje } from "../DetalleViaje";
import CardViajeUsuario from "../CardViaje/CardViajeUsuario/CardViajeUsuario";
import "./Home.css";
import fondo from "../../assets/fondo perfil.jpg";

export default function Home() {
  const dispatch = useDispatch();
  const viajes = useSelector(
    (state) => state.viajesFiltrados //me traigo el estado de los viajes para poder mostrarlos
  );
  useEffect(() => {
    //se monta home y despacho la accion para obtener los viajes
    dispatch(getViajesTotal());
  }, [dispatch]);
  console.log(viajes);
  console.log(viajes[0]);
  return (
    <div>
      <div>
        <Filtros />
      </div>
      <div id="general-card">
        <div className="container-cards">
          {viajes.map(
            (e) =>
              e && (
                <div className="card-home">
                  <CardViajeUsuario
                    origen={e.origen}
                    destino={e.destino}
                    fecha={e.fecha}
                    hora={e.hora}
                    asientosAOcupar={e.asientosAOcupar}
                    aceptaEquipaje={e.aceptaEquipaje}
                    aceptaFumador={e.aceptaFumador}
                    aceptaMascota={e.aceptaMascota}
                    usaBarbijo={e.usaBarbijo}
                    viajeDisponible={e.viajeDisponible}
                    key={e.id}
                    id={e.id}
                    //nombre={e.usuarios[0].nombre}
                    //apellido={e.usuarios[0].apellido}
                  />
                </div>
              )
          )}
        </div>
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
