import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDetalleViaje,
  getUsuarioByEmail,
  sumarseAlViaje,
} from "../../../redux/actions/actions";
import "./DetalleViaje.css";
import { MdSmokeFree, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { VscLocation } from "react-icons/vsc";
import fondo from "../../../assets/fondo perfil.jpg";
import NavBar from "../../NavBar/NavBar";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FaUserCircle } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2/dist/sweetalert2";

export const DetalleViajep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viaje = useSelector((state) => state.viajePorId);
  const { id } = useParams();
  const { email } = useParams();
  let fechaViaje = "";


  if (viaje.length!==0 && viaje.fecha.length!==0){
    viaje.fecha.includes("T")?fechaViaje = viaje.fecha.substring(0, 10).split("-").reverse().join("-") : fechaViaje=viaje.fecha
  }

  useEffect(() => {
    dispatch(getDetalleViaje(id));
    dispatch(getUsuarioByEmail(email));
  }, [id]);

  let arrayPasajeres;
  if(viaje.length!==0 && viaje.usuarios.length!==0) arrayPasajeres = viaje.usuarios.map((e) => e);

  return (
    <div>
      {arrayPasajeres.length!==0 ? 
    <div className="container-detalle">
      <NavBar />
      <div className="card-detalle">
        <div className="card-usuario-detalle">
          <div className="card-usuario-infper-detalle">
            <div className="card-usuario-img-detalle">
              <img
                src={viaje.usuarios ? viaje.usuarios[0].avatar : null}
                alt=""
              />
            </div>
            <div className="card-usuario-nombre-val-detalle text-xl">
              <span className="text-white my-9">
                {viaje.usuarios ? (
                  viaje.usuarios[0].nombre + " " + viaje.usuarios[0].apellido
                ) : (
                  <></>
                  )}
              </span>
              <span>
                <div className="puntuacion">
                  {viaje.usuarios ? (
                    viaje.usuarios[0].puntuacion === 5 ? (
                      <>
                        <ImStarFull className="black" />
                        <ImStarFull className="black" />
                        <ImStarFull className="black " />
                        <ImStarFull className="black" />
                        <ImStarFull className="black " />
                      </>
                    ) : viaje.usuarios[0].puntuacion === 4 ? (
                      <>
                        {" "}
                        <ImStarFull className="black" />
                        <ImStarFull className="black " />
                        <ImStarFull className="black" />
                        <ImStarFull className="black " />
                        <ImStarEmpty className="black" />
                      </>
                    ) : viaje.usuarios[0].puntuacion === 3 ? (
                      <>
                        <ImStarFull className="black " />
                        <ImStarFull className="black" />
                        <ImStarFull className="black " />
                        <ImStarEmpty className="black" />
                        <ImStarEmpty className="black" />
                      </>
                    ) : viaje.usuarios[0].puntuacion === 2 ? (
                      <>
                        <ImStarFull className="black" />
                        <ImStarFull className="black " />
                        <ImStarEmpty className="black" />
                        <ImStarEmpty className="black" />
                        <ImStarEmpty className="black" />
                      </>
                    ) : viaje.usuarios[0].puntuacion === 1 ? (
                      <>
                        <ImStarFull className="black " />
                        <ImStarEmpty className="black" />
                        <ImStarEmpty className="black" />
                        <ImStarEmpty className="black" />
                        <ImStarEmpty className="black" />
                      </>
                    ) : (
                      <></>
                    )
                    ) : (
                    <></>
                  )}
                </div>
              </span>
            </div>
          </div>
          <span className="ml-4 text-xl">Acerca de mi</span>
          <div className="card-usuario-resumen-detalle rounded-sm">
            <span className="m-2">
              {viaje.usuarios ? viaje.usuarios[0].acercaDeMi : <></>}
            </span>
          </div>
          <span>Detalles del viaje</span>
          <div className="card-usuario-resumen-detalle rounded-sm">
            <span className="m-2">{viaje.detalles}</span>
          </div>
          <div className="btn-detalle">
            <button className="detalle-mensaje">
              <Link to="/login">Enviar mensaje</Link>
            </button>
          </div>
          <br />
        </div>
        <div className="card-viaje-detalle text-xl">
          <div className="flex flex-col justify-evenly w-full ml-4">
            <span>Desde: </span>
            <span className="text-2xl flex items-center text-green-400">
              <VscLocation />
              {viaje.origen}
            </span>
            <span>Hacia:</span>
            <span className="text-2xl flex items-center text-red-600">
              <VscLocation />
              {viaje.destino}
            </span>
            <span>
              Fecha: <span className="font-bold">{fechaViaje}</span>
            </span>
            <span>
              Hora: <span className="font-bold">{viaje.hora}</span>
            </span>
          </div>
          <div className="flex flex-col justify-evenly w-full ml-4">
            <span>
              Cantidad de asientos requeridos:{" "}
              <span
                className={`font-bold text-2xl ${
                  viaje.asientosAOcupar > 3
                  ? "text-sky-600"
                  : viaje.asientosAOcupar < 1
                    ? "text-amber-500"
                    : "text-orange-700"
                  }`}
                  >
                {viaje.asientosAOcupar}
              </span>
            </span>
            <span>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                }}
              >
                {arrayPasajeres.length!==0 && arrayPasajeres.map((e) => (
                  <ListItem
                    key={e.email}
                    disableGutters
                    secondaryAction={
                      <IconButton>
                        <Link to={`/perfil/${e.email}`}>
                          <FaUserCircle />
                        </Link>
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`🔴 ${e.nombre} ${e.apellido}`} />
                  </ListItem>
                ))}
              </List>
            </span>
            <span>
              Medios de pago:{" "}
              <span className="font-bold">{viaje.formaDePago}</span>
            </span>
            <span>
              Puede colaborar con los gastos:
              <span className="font-bold">
                {viaje.pagoCompartido ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <MdSmokeFree className="mx-2" />
              Soy Fumador/a:{" "}
              <span className="font-bold">
                {viaje.aceptaFumador ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <MdPets className="mx-2" />
              Llevo Mascota(s):{" "}
              <span className="font-bold">
                {viaje.aceptaMascota ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <FaSuitcaseRolling className="mx-2" /> Tengo Equipaje:{" "}
              <span className="font-bold">
                {viaje.aceptaEquipaje ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <MdMasks className="mx-2" />
              Uso Barbijo:{" "}
              <span className="font-bold">
                {viaje.usaBarbijo ? "sí" : "no"}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
    : <div>Cargando...</div>
  }
    </div>
  );
};
