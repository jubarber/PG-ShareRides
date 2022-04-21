import React, { useEffect } from "react";
import s from "./admincard.module.css";
import altImg from "../../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsuarios,
  getUsuarioReportado,
  getReporte,
} from "../../../redux/actions/actions";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function AdminCard(props) {
  const dispatch = useDispatch();
  const usuariosReportados = useSelector((state) => state.usuariosReportados);
  const userRedux = useSelector((state) => state.usuarios);

  const reportes = useSelector((state) => state.reportes);

  useEffect(() => {
    dispatch(getUsuarioReportado());
    dispatch(getReporte());
  }, []);

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
    eliminado,
  } = props.user;

  async function eliminarUsuario(email) {
    return await axios({
      method: "put",
      url: `http://localhost:3001/api/admin/delete/${email}`,
    });
  }

  async function eliminarComentario(id) {
    return await axios({
      method: "delete",
      url: `http://localhost:3001/api/admin/deletecomentario/${id}`,
    });
  }

  function deleteUsuarioHandle() {
    Swal.fire({
      title: "Estas Seguro?🥺",
      text: "Luego podras restaurar su cuenta!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    });
    try {
      let eliminadi = eliminarUsuario(email);
      dispatch(getUsuarios());
      console.log("USUARIO", eliminadi);
    } catch (err) {
      console.log(err);
    }
  }

  function deleteComentarioHandle(id) {
    //console.log(comentarios)
    Swal.fire({
      title: "Estas Seguro?🥺",
      text: "No podras recuperar el comentario!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
       eliminarComentario(id).then(()=> dispatch(getUsuarios()))
        console.log("ISCONFIRM")
        /* Swal.fire(
          "Borrado!",
          "Tu Comentario ha sido eliminado con exito.",
          "success"
        ).then(() => {
          dispatch(getUsuarios());
        }); */
      }
    });
  };

  return (
    <div className={s.mainContainer}>
      <ul className={s.ulContainer}>
        <li className={s.imageLi}>
          <img className={s.profileAdmin} src={avatar || altImg} alt="perfil" />
        </li>
        <li>
          <span>Bloqueado:</span> {eliminado ? "Eliminado por admin" : "no"}
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
          <span>Acerca de mi:</span> {acercaDeMi || "-"}
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
            <div key={com.id}>
              <h5>
                {" "}
                {com.nombre} {com.apellido}
              </h5>
              <p>{com.dia}</p>
              <p>{com.comentarios}</p> <p>{com.id}</p>
              <button
                className={s.deleteButton}
                onClick={()=> deleteComentarioHandle(com.id)}
              >
                Eliminar Comentario
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={s.comentariosContainer}>
        <h4>Justificacion de reportes recibidos</h4>
        <div>
          {props.user.reportados?.map((rep) => (
            <div key= {rep.id}>
              <span>{rep.dia}:</span> <span>{rep.email}:</span>{" "}
              <span>{rep.justificacion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
