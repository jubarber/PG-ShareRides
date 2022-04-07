import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetalleViaje } from "../../../redux/actions/actions";
import Navbar from "../../NavBar/NavBar";
import "./DetalleViaje.css";
import link from "../../CardViaje/Links";
import { MdSmokeFree, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";
import { VscLocation } from "react-icons/vsc";
import fondo from "../../../assets/fondo perfil.jpg";
<<<<<<< HEAD
=======
import NavBar from "../../NavBar/NavBar";
>>>>>>> develop

export const DetalleViaje = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const viaje = useSelector((state) => state.viajePorId);
  const { id } = useParams();
  // console.log(id)
  // console.log(viaje);

  useEffect(() => {
    //   //para que sea dinamico, descomentar linea 8 y linea 18
    //   //hacerlo SOLO cuando el componente de la tarjeta del viaje YA TENGA el Link to hecho que redireccione a este componente.
    //   //sino no funcionará jeje

    dispatch(getDetalleViaje(id));
  }, [dispatch, id]);

  return (
<<<<<<< HEAD
    <div className="container-detalle font-mono">
=======
    <div className="container-detalle">
      <NavBar />
>>>>>>> develop
      <div className="card-detalle">
        <div className="card-usuario-detalle">
          <div className="card-usuario-infper-detalle">
            <div className="card-usuario-img-detalle">
              <img src={link} alt="" />
            </div>
            <div className="card-usuario-nombre-val-detalle text-xl">
              <span className="text-white my-9">
                Hard code{viaje.nombre} {viaje.apellido}
              </span>
              <span>Valoracion estrellas</span>
            </div>
          </div>
          <span className="ml-4 text-xl">Acerca de mi</span>
          <div className="card-usuario-resumen-detalle rounded-sm">
            <span className="m-2">
              Trabajo en un local, que queda en rosario y necesito viajar
              seguido a funes
            </span>
          </div>
          <div className="card-usuario-resumen-detalle rounded-sm">
            <span className="m-2">
              Viajo con dos valijas y un perrito chiquito, estoy dispuesto a
              compartir gastos! vamos a escrtibir mucho para ver como queda esto
              creo que son demasiados caracteres
            </span>
          </div>
          <div className="btn-detalle">
            <button className="detalle-mensaje">
              <Link to="/login">Enviar mensaje</Link>
            </button>
          </div>
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
              Fecha: <span className="font-bold">{viaje.fecha}</span>
            </span>
            <span>
              Hora: <span className="font-bold">{viaje.hora}</span>
            </span>
          </div>
          <div className="flex flex-col justify-evenly w-full ml-4">
            <span>
              Cantidad de asientos disponibles:{" "}
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
              Forma de pago:{" "}
              <span className="font-bold">
                {/* no llega bien forma de pago */}
                {viaje.formaDePago ? viaje.formaDePago : "no"}
              </span>
            </span>
            <span>
              Comparte gastos:
              <span className="font-bold">
                {viaje.pagoCompartido ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <MdSmokeFree className="mx-2" />
              Acepta Fumadorxs:{" "}
              <span className="font-bold">
                {viaje.aceptaFumador ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <MdPets className="mx-2" />
              Acepta Mascota(s):{" "}
              <span className="font-bold">
                {viaje.aceptaMascota ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <FaSuitcaseRolling className="mx-2" /> Acepta Equipaje:{" "}
              <span className="font-bold">
                {viaje.aceptaEquipaje ? "sí" : "no"}
              </span>
            </span>
            <span className="flex items-center">
              <MdMasks className="mx-2" />
              Usa obligatorio de Barbijo:{" "}
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
  );
};
