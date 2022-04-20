import React from "react";
import { getViajesTotal } from "../../../redux/actions/actions";
import s from "./AdminViajes.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function AdminViajes(viaje) {
  const dispatch = useDispatch();

  let {
    usuarios,
    id,
    fecha,
    hora,
    origen,
    destino,
    asientosAOcupar,
    formaDePago,
    pagoCompartido,
    aceptaFumador,
    aceptaMascota,
    usaBarbijo,
    aceptaEquipaje,
    viajeDisponible,
    status,
    detalles,
  } = viaje.viaje;
 
  async function deleteViaje(id){
    return await axios({
      method: "delete",
      url: `http://localhost:3001/api/admin/deleteviaje/${id}`,
    });
  }

  function deleteViajeHandle(){
    console.log("ENTRA???")
    try {
      let eliminadi = deleteViaje(id);
      dispatch(getViajesTotal());
      console.log("VIAJE", eliminadi)
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div className={s.mainContainer}>
      <ul className={s.ulContainer}>
        <li>
          <span>Email usuario: </span> {usuarios[0].email}
        </li>
        <li>
          <span>Nombre usuario: </span> {usuarios[0].nombre}
        </li>
        <li>
          <span>Apellido usuario: </span> {usuarios[0].apellido}
        </li>
        <li>
          <span>Conductore? Pasajere?:</span> {status || "-"}
        </li>
        <li>
          <span>ID: </span> {id}
        </li>
        <li>
          <span>Fecha:</span> {fecha || "-"}
        </li>
        <li>
          <span>Hora:</span> {hora || "-"}
        </li>
        <li>
          <span>Origen:</span> {origen || "-"}
        </li>
        <li>
          <span>Destino:</span> {destino || "-"}
        </li>
        <li>
          <span>Asientos a ocupar:</span> {asientosAOcupar || "-"}
        </li>
        <li>
          <span>Formas de pago:</span> {formaDePago || "-"}
        </li>
        <li>
          <span>PagoCompartido:</span> {`${pagoCompartido}` || "-"}
        </li>
        <li>
          <span>Acepta fumador:</span> {`${aceptaFumador}` || "-"}
        </li>
        <li>
          <span>Acepta Mascota:</span> {`${aceptaMascota}` || "-"}
        </li>
        <li>
          <span>Usa Barbijo:</span> {`${usaBarbijo}` || "-"}
        </li>
        <li>
          <span>Acepta equipaje:</span> {`${aceptaEquipaje}` || "-"}
        </li>
        <li>
          <span>Viaje disponible:</span> {`${viajeDisponible}` || "-"}
        </li>
        <li>
          <span>Detalles del viaje:</span> {detalles || "-"}
        </li>
        <button className={s.deleteButton} onClick={deleteViajeHandle}>
        Eliminar Viaje
      </button>
      </ul>
    </div>
  );
}
