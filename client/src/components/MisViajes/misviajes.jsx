import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getViajesTotalUsuario } from "../../redux/actions/actions";
import fondo from "../../assets/fondo perfil.jpg";
import "./misviajes.css";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import CardConductoreMisViajes from "./CardViajeUsuarioConductor"
import CardPasajeroMisViajes from "./CardPasajeroMisViajes"

export const Misviajes = () => {
  const viajes = useSelector((state) => state.viajesPorUsuario);
  const { id } = useParams();
  const dispatch = useDispatch();
  const viajesDisponibles = viajes.filter(v => v.viajeDisponible === true)
  const mailUsuarioCreador = viajesDisponibles.map(v => v.usuarios)
  // ?.map(u=>u?.usuario_viaje?.map(e=>e.usuarioEmail)));
  console.log(mailUsuarioCreador)
  console.log(viajes)
  useEffect(() => {
    dispatch(getViajesTotalUsuario(id));
  }, [id]);

  return (
    <div>
      <NavBar />
      <div className="container-cards">
        {viajesDisponibles.length !== 0 ? (
          viajesDisponibles.map((e) => (
            <div className="card-home">
              {e.status === "pasajero" ? (
                <CardPasajeroMisViajes
                  origen={e.origen}
                  destino={e.destino}
                  fecha={
                    e.fecha.includes("T")
                      ? e.fecha.substring(0, 10).split("-").reverse().join("-")
                      : e.fecha
                  }
                  hora={e.hora}
                  asientosAOcupar={e.asientosAOcupar}
                  aceptaEquipaje={e.aceptaEquipaje}
                  aceptaFumador={e.aceptaFumador}
                  aceptaMascota={e.aceptaMascota}
                  usaBarbijo={e.usaBarbijo}
                  viajeDisponible={e.viajeDisponible}
                  detalles={e.detalles}
                  key={e.id}
                  id={e.id}
                  avatar={
                    e.usuarios.length > 0 ? e.usuarios[0].avatar : <div />
                  }
                  nombre={
                    e.usuarios.length > 0 ? e.usuarios[0].nombre : <div />
                  }
                  apellido={
                    e.usuarios.length > 0 ? e.usuarios[0].apellido : <div />
                  }
                  email={e.usuarios.length > 0 ? e.usuarios[0].email : <div />}
                  puntuacion={
                    e.usuarios.length > 0 ? e.usuarios[0].puntuacion : <div />
                  }
                />
              ) : (
                <CardConductoreMisViajes
                  origen={e.origen}
                  destino={e.destino}
                  fecha={
                    e.fecha.includes("T")
                      ? e.fecha.substring(0, 10).split("-").reverse().join("-")
                      : e.fecha
                  }
                  hora={e.hora}
                  asientosAOcupar={e.asientosAOcupar}
                  aceptaEquipaje={e.aceptaEquipaje}
                  aceptaFumador={e.aceptaFumador}
                  aceptaMascota={e.aceptaMascota}
                  usaBarbijo={e.usaBarbijo}
                  viajeDisponible={e.viajeDisponible}
                  key={e.id}
                  id={e.id}
                  avatar={
                    e.usuarios.length > 0 ? e.usuarios[0].avatar : <div />
                  }
                  nombre={
                    e.usuarios.length > 0 ? e.usuarios[0].nombre : <div />
                  }
                  apellido={
                    e.usuarios.length > 0 ? e.usuarios[0].apellido : <div />
                  }
                  email={e.usuarios.length > 0 ? e.usuarios[0].email : <div />}
                  puntuacion={
                    e.usuarios.length > 0 ? e.usuarios[0].puntuacion : <div />
                  }
                />
              )}
            </div>
          ))
        ) : (
          <>"No tenes viajes disponibles"</>
        )}
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
};
