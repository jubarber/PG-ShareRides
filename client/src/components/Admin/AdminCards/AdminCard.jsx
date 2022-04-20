import React from "react";
import s from "./admincard.module.css";
import altImg from "../../../assets/user.png";
import { useDispatch } from "react-redux";
import { getUsuarios } from "../../../redux/actions/actions";
import axios from "axios";

export default function AdminCard(user) {
  const dispatch = useDispatch();

  let {
    acercaDeMi,
    apellido,
    avatar,
    comentarios,
    dni,
    email,
    logueado,
    nombre,
    puntuacion,
    reportado,
    telefono,
    vehiculo,
    disponible,
    eliminado
  } = user.user;

  async function eliminarUsuario(email) {
    return await axios({
      method: "put",
      url: `http://localhost:3001/api/admin/delete/${email}`,
    });
  }

  async function eliminarComentario() {
    return await axios({
      method: "delete",
      url: `http://localhost:3001/api/admin/deletecomentario/:id`,
    });
  }

  function deleteUsuarioHandle() {
    try {
     let eliminadi = eliminarUsuario(email);
      dispatch(getUsuarios());
      console.log("USUARIO", eliminadi)
    } catch (err) {
      console.log(err);
    }
  }
  function deleteComentarioHandle() {
    console.log(comentarios)
    try {
      let eliminadi = eliminarComentario(comentarios[0].id);
      dispatch(getUsuarios());
      console.log("COMENTARIO", eliminadi)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={s.mainContainer}>
      <ul className={s.ulContainer}>
        <li className={s.imageLi}>
          <img className={s.profileAdmin} src={avatar || altImg} alt="perfil" />
        </li>
        <li>
          <span>Eliminado:</span> {eliminado? "Eliminado por admin" : "no"}
        </li>
        <li>
          <span>Nombre:</span> {nombre}
        </li>
        <li>
          <span>Apellido:</span> {apellido || "-"}
        </li>
        <li>
          <span>Email:</span> {email || "-"}
        </li>
        <li>
          <span>Tel:</span> {telefono || "-"}
        </li>
        <li>
          <span>DNI:</span> {dni || "-"}
        </li>
        <li>
          <span>Acerca:</span> {acercaDeMi || "-"}
        </li>
        {/*  <li><span>Puntuación:</span> {(puntuacion || "-")}</li> */}
        <li>
          <span>Logueado:</span> {`${logueado}` || "-"}
        </li>
        <li>
          <span>Reportado:</span> {`${reportado}` || "-"}
        </li>
        <li>
          <span>Disponible:</span> {disponible}
        </li>
        <li>
          <span>Vehiculo:</span> {vehiculo || "-"}
        </li>
      </ul>
      <button className={s.deleteButton} onClick={deleteUsuarioHandle}>
        Eliminar Usuario
      </button>

      <div className={s.comentariosContainer}>
        <h4>Comentarios Recibidos</h4>
        <div>
          {comentarios?.map((com) => (
            <div>
              <h5>
                {" "}
                {com.nombre} {com.apellido}
              </h5>
              <p>{com.dia}</p>
              <p>{com.comentarios}</p>
            </div>
          ))}
        </div>
        <button className={s.deleteButton} onClick={deleteComentarioHandle}>
        Eliminar Comentario
      </button>
      </div>
    </div>
  );
}
