import React from 'react'
import s from "./admincard.module.css"
import altImg from "../../../assets/user.png";

export default function AdminCard(user) {
 let {acercaDeMi,  apellido, avatar, comentarios, dni, email,
    logueado, nombre, puntuacion, reportado, telefono, vehiculo} = user.user
/* const toName = (e) =>{
  let content = e.target.textContent?.split(" ")[0];
  console.log("conteeeeeent to name", content)
} */
  return (
    <div className={s.mainContainer}> 
        <ul className={s.ulContainer}>
            <li className={s.imageLi}><img className={s.profileAdmin} src={(avatar || altImg)} alt="perfil" /></li>
            <li><span>Nombre:</span> {nombre}</li>
            <li><span>Apellido:</span> {(apellido || "-")}</li>
            <li><span>Email:</span> {(email || "-")}</li>
            <li><span>Tel:</span> {(telefono || "-")}</li>
            <li><span>DNI:</span> {(dni || "-")}</li>
            <li><span>Acerca:</span> {(acercaDeMi || "-")}</li> 
           {/*  <li><span>Puntuación:</span> {(puntuacion || "-")}</li> */}
            <li><span>Logueado:</span> {(`${logueado}` || "-")}</li>
            <li><span>Reportado:</span> {(`${reportado}` || "-")}</li>
            <li><span>Vehiculo:</span> {(vehiculo || "-")}</li>

        </ul>
        <div className={s.comentariosContainer}><h4>Comentarios Recibidos</h4>
        //agregar key
         <div>{comentarios?.map(com => <div><h5 >{com.nombre} {com.apellido}</h5>
         <p>{com.dia}</p>
         <p>{com.comentarios}</p>
         </div>)}</div>
         </div>
    </div>
  )
}
