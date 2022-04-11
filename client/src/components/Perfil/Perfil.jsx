import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../assets/fondo perfil.jpg";
import "./Perfil.css";
import { FaEdit } from "react-icons/fa";
import { AiFillCheckSquare } from "react-icons/ai";
import Button from "@mui/material/Button";
import {
  getComentarios,
  getUsuarioByEmail,
  modificacionPerfil,
  postComentarios,
} from "../../redux/actions/actions";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";
import user from "../../assets/user.png";
import Rating from "@mui/material/Rating";
import PaginacionComentarios from "./PaginacionComentarios";

export default function Perfil() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const nombre = cookies.get("nombre");
  const apellido = cookies.get("apellido");
  const email = cookies.get("email");
  const DNI = cookies.get("dni");
  const avatar = cookies.get("avatar");
  const acercaDeMi = cookies.get("acercaDeMi");
  const [count, setCount] = useState(0);

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: email,
    telefono: "",
    dni: "",
    acercaDeMi: "",
    imagen: "",
  });

  const [reviews, setReviews] = useState({
    calificacion: "",
    comentarios: "",
    email: email,
  });

  const comentarios = useSelector((state) => state.comentarios);

  const miUsuario = useSelector((state) => state.usuario);

  useEffect(() => {
    dispatch(getComentarios());
  }, [reviews]);

  useEffect(() => {
    dispatch(getUsuarioByEmail(email));
  }, []);

  const [habilitarTelefono, setHabilitarTelefono] = useState(true);
  const [habilitarDNI, setHabilitarDNI] = useState(true);
  const [habilitarAcercaDeMi, setHabilitarAcercaDeMi] = useState(true);

  const habilitarInputs = (e) => {
    e.preventDefault();
    setHabilitarDNI(!habilitarDNI);
    setHabilitarTelefono(!habilitarTelefono);
    setHabilitarAcercaDeMi(!habilitarAcercaDeMi);
  };

  //--------------Paginado--------------------

  const [pagina, setPagina] = useState(1);
  const [comentariosPorPagina, setComentariosPorPagina] = useState(3);
  const ultimoComentario = pagina * comentariosPorPagina;
  const primerComentario = ultimoComentario - comentariosPorPagina;
  const ComentariosTotales = comentarios?.slice(
    primerComentario,
    ultimoComentario
  );

  const paginacion = (pageNum) => {
    setPagina(pageNum);
  };

  //-----------------------------------

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeReviews = (e) => {
    setReviews({
      ...reviews,
      [e.target.name]: e.target.value,
    });
    setCount(e.target.value.length);
  };

  const handleSubmitComentarios = (e) => {
    e.preventDefault();
    dispatch(postComentarios(reviews));
    setReviews({
      calificacion: "",
      comentarios: "",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(modificacionPerfil(usuario));
  };

  return (
    <div className="perfil">
      <NavBar />
      <div className="contenedor-perfil">
        <div className="contenedor-imagen">
          <div className="img-perfil">
            <img src={avatar === "null" ? user : avatar} alt="" />
          </div>
          <div className="bio-perfil">
            <h1>
              {nombre} {apellido}
            </h1>{" "}
            <textarea
              type="text"
              onChange={handleChange}
              name="acercaDeMi"
              value={
                miUsuario.acercaDeMi ? miUsuario.acercaDeMi : usuario.acercaDeMi
              }
              disabled={habilitarAcercaDeMi}
            />{" "}
            <div className="btn-perfil">
              <Button color="secondary" size="medium">
                Seguir
              </Button>

              <Button color="secondary" size="medium">
                Mensaje
              </Button>
            </div>
          </div>
        </div>

        <div>
          <form className="contenedor-form" onSubmit={(e) => handleUpdate(e)}>
            <div className="contenedor-input">
              <h5>Nombre</h5>
              <input
                type="text"
                className="input-perfil"
                name="nombre"
                value={miUsuario.nombre || ""}
                disabled
              />
            </div>
            <div className="contenedor-input">
              <h5>Apellido</h5>
              <input
                type="text"
                className="input-perfil"
                name="apellido"
                value={miUsuario.apellido || ""}
                disabled
              />
            </div>
            <div className="contenedor-input">
              <h5>Email</h5>
              <input
                type="text"
                className="input-perfil"
                name="email"
                value={miUsuario.email || ""}
                disabled
              />
            </div>
            <div className="contenedor-input">
              <h5>Telefono</h5>
              <input
                type="text"
                className="input-perfil"
                onChange={handleChange}
                name="telefono"
                value={
                  (usuario.telefono ? usuario.telefono : miUsuario.telefono) ||
                  ""
                }
                disabled={habilitarTelefono}
              />
            </div>
            <div className="contenedor-input">
              <h5>DNI</h5>
              <input
                type="text"
                className="input-perfil"
                onChange={handleChange}
                name="dni"
                value={(usuario.dni ? usuario.dni : miUsuario.dni) || ""}
                disabled={habilitarDNI}
              />
            </div>
            <div className="btn-modificacion-perfil">
              {habilitarTelefono === false &&
              habilitarDNI === false &&
              habilitarAcercaDeMi === false ? (
                <input
                  type="submit"
                  value="Guardar Cambios"
                  className="btn-modificacion-perfil-active"
                ></input>
              ) : (
                <input
                  type="button"
                  value="Guardar Cambios"
                  disabled
                  className="btn-modificacion-perfil-disabled"
                />
              )}
              <button onClick={(e) => habilitarInputs(e)}>
                <FaEdit />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="resenas">
        <form onSubmit={handleSubmitComentarios}>
          <div className="comentarios">
            <h1>Comentarios</h1>
            <div className="comentarios-card">
              <Rating
                onChange={handleChangeReviews}
                name="calificacion"
                value={parseInt(reviews.calificacion)}
              />
            </div>
            <div className="comentario">
              <label>Deja tu comentario:</label>
              <textarea
                type="text"
                onChange={handleChangeReviews}
                name="comentarios"
                value={reviews.comentarios}
                maxLength="144"
              />
              <p>{count}/144</p>
            </div>
            <Button color="secondary" size="medium" type="submit">
              {" "}
              Enviar{" "}
            </Button>
          </div>
        </form>
        {ComentariosTotales &&
          ComentariosTotales.map((e) => (
            <div className="resenas-card">
              <div className="encabezado">
                <img src={avatar} alt="" />
                <h1>
                  {nombre} {apellido}
                </h1>
              </div>
              <Rating
                className="calificacion"
                value={e.calificacion}
                readOnly
              />
              <div className="texto">
                <p>{e.comentarios}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="pag">
        <PaginacionComentarios
          comentariosPorPagina={comentariosPorPagina}
          comentarios={comentarios.length}
          paginacion={paginacion}
          pagina={pagina}
          setPagina={setPagina}
        />
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
