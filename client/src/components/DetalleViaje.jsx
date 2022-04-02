import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetalleViaje } from "../redux/actions/actions";

export const DetalleViaje = () => {
  const dispatch = useDispatch();
  // const params = useParams();
  const viaje = useSelector((state) => state.viajePorId);
  const {id}=useParams()
  // console.log(id)
  // console.log(viaje);

  useEffect(() => {
    //para que sea dinamico, descomentar linea 8 y linea 18
    //hacerlo SOLO cuando el componente de la tarjeta del viaje YA TENGA el Link to hecho que redireccione a este componente.
    //sino no funcionará jeje

    dispatch(getDetalleViaje(id));
  }, [dispatch, id]);


  return (
    <div>
      <nav>
        <Link to="/home">Inicio</Link>
      </nav>
      <div>
        <p>Vamos de </p>
        <h1>{viaje.origen}</h1>
        <p>a</p>
        <h1>{viaje.destino}</h1>
        <p>Fecha: {viaje.fecha}</p>
        <p>Hora: {viaje.hora}</p>
        <p>Cantidad de asientos disponibles: {viaje.asientosAOcupar}</p>
        <p>Forma de pago: {viaje.formaDePago}</p>
        <p>Comparte gastos: {viaje.pagoCompartido ? "sí" : "no"}</p>
        <p>Acepta Fumadorxs: {viaje.aceptaFumador ? "sí" : "no"}</p>
        <p>Acepta Mascota(s): {viaje.aceptaMascota ? "sí" : "no"}</p>
        <p>Acepta Equipaje: {viaje.aceptaEquipaje ? "sí" : "no"}</p>
        <p>Usa Barbijo: {viaje.usaBarbijo ? "sí" : "no"}</p>
      </div>
    </div>
  );
};
