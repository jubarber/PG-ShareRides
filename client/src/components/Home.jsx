
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getViajesTotal } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import { DetalleViaje } from "../DetalleViaje";
import CardViajeUsuario from "../CardViaje/CardViajeUsuario/CardViajeUsuario";
import "./Home.css";


//cambio inutil, fui yo gabriel!
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
    <div id="general-card">
      <div>
        <NavBar />
      </div>
      <div className="container-cards">
        <div className="card-home">
          {viajes.map((e) => (
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
              nombre={e.usuarios[0].nombre}
              apellido={e.usuarios[0].apellido}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
