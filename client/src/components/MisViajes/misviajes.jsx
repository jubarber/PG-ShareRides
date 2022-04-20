import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getViajesTotalUsuario } from "../../redux/actions/actions";
import fondo from "../../assets/fondo perfil.jpg";
import "./misviajes.css";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import CardViajeUsuarioPasajere from "../CardViaje/CardViajeUsuario/Pasajero/CardViajeUsuario";
import CardViajeUsuarioConductore from "../CardViaje/CardViajeUsuario/Conductor/CardViajeUsuario";

export const Misviajes = () => {
  const viajes = useSelector((state) => state.viajesPorUsuario);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getViajesTotalUsuario(id));
  }, [id]);
  console.log(viajes);
  return (
    <div>
      <NavBar />
      <div className="container-cards">
        {viajes.length !== 0 ? (
          viajes.map((e) => (
            <div className="card-home">
              {e.status === "pasajero" ? (
                <CardViajeUsuarioPasajere
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
                <CardViajeUsuarioConductore
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
          <>"No tenes viajes"</>
        )}
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
};
