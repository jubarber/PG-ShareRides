import React from "react";
import s from "./AdminViajes.module.css";

export default function AdminViajes(viaje) {
  console.log("OBJETOVIAJE", viaje);
  let {
    usuarioEmail,
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
  /* const toName = (e) =>{
  let content = e.target.textContent?.split(" ")[0];
  console.log("conteeeeeent to name", content)
} */
  return (
    <div className={s.mainContainer}>
      <ul className={s.ulContainer}>
        <li>
          <span>Email usuario: </span> {usuarioEmail}
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
          <span>Estado del viaje:</span> {status || "-"}
        </li>
        <li>
          <span>Detalles:</span> {detalles || "-"}
        </li>
      </ul>
    </div>
  );
}
