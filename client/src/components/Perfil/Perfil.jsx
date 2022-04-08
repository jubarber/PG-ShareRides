import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../assets/fondo perfil.jpg";
import "./Perfil.css";
import { FaEdit } from "react-icons/fa";
import { AiFillCheckSquare } from "react-icons/ai";
import Button from "@mui/material/Button";
import {
  getUsuarioByEmail,
  modificacionPerfil,
} from "../../redux/actions/actions";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";
import user from "../../assets/user.png";

export default function Perfil() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const nombre = cookies.get("nombre");
  const apellido = cookies.get("apellido");
  const email = cookies.get("email");
  const DNI = cookies.get("dni");
  const avatar = cookies.get("avatar");
  const acercaDeMi = cookies.get("acercaDeMi");

  const miUsuario = useSelector((state) => state.usuario);
  useEffect(() => {
    dispatch(getUsuarioByEmail(email));
  }, []);

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: email,
    telefono: "",
    dni: "",
    acercaDeMi: "",
    imagen: "",
  });

  const [check, setCheck] = useState(false);
  const [habilitarTelefono, setHabilitarTelefono] = useState(true);
  const [habilitarDNI, setHabilitarDNI] = useState(true);
  const [habilitarAcercaDeMi, setHabilitarAcercaDeMi] = useState(true);
  const [habilitarImagen, setHabilitarImagen] = useState(true);

  // const [pagina, setPagina] = useState(1);
  // const [comentariosPorPagina, setComentariosPorPagina] = useState(3);
  // const ultimoComentario = pagina * comentariosPorPagina;
  // const primerComentario = ultimoComentario - comentariosPorPagina;
  // const personitas = array?.slice(primerComentario, ultimoComentario);

  // const paginacion = (pageNum) => {
  //   setPagina(pageNum);
  // };

  const habilitarInputs = (e) => {
    e.preventDefault();
    setHabilitarDNI(!habilitarDNI);
    setHabilitarTelefono(!habilitarTelefono);
    setHabilitarAcercaDeMi(!habilitarAcercaDeMi);
  };
  const deshabilitarInputs = (e) => {
    e.preventDefault();
    setHabilitarDNI(!habilitarDNI);
    setHabilitarTelefono(!habilitarTelefono);
  };

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
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
            <div className="nombre">
              <h5>Nombre</h5>
              <input
                type="text"
                className="input-perfil"
                name="nombre"
                value={miUsuario.nombre}
                disabled
              />
            </div>
            <div className="nombre">
              <h5>Apellido</h5>
              <input
                type="text"
                className="input-perfil"
                name="apellido"
                value={miUsuario.apellido}
                disabled
              />
            </div>
            <div className="nombre">
              <h5>Email</h5>
              <input
                type="text"
                className="input-perfil"
                name="email"
                value={miUsuario.email}
                disabled
              />
            </div>
            <div className="nombre">
              <h5>Telefono</h5>
              <input
                type="text"
                className="input-perfil"
                onChange={handleChange}
                name="telefono"
                value={usuario.telefono ? usuario.telefono : miUsuario.telefono}
                disabled={habilitarTelefono}
              />
            </div>
            <div className="nombre">
              <h5>DNI</h5>
              <input
                type="text"
                className="input-perfil"
                onChange={handleChange}
                name="dni"
                value={usuario.dni ? usuario.dni : miUsuario.dni}
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
        <form>
          <div className="comentarios">
            <h1>Comentarios</h1>
            <div className="comentarios-card">
              <label>
                Punturacion:
                <input
                  type="number"
                  min="1"
                  max="10"
                  classname="input-number"
                />{" "}
              </label>
            </div>
            <div className="comentario">
              <label>Deja tu comentario:</label>
              <input type="text" />
            </div>
            <Button color="secondary" size="medium" className="btn-enviar">
              Enviar
            </Button>
          </div>
        </form>
        {/* {personitas &&
          personitas.map((e) => (
            <div className="resenas-card">
              <div className="encabezado">
                <img src={foto} alt="" />
                <h1>{e.Nombre}</h1>
              </div>
              <h3>Punturacion: {e.Estrellas}</h3>
              <div className="texto">
                <p>{e.Comentario}</p>
              </div>
            </div>
          ))} */}
      </div>
      <div className="pag">
        {/* <PaginacionComentarios
          comentariosPorPagina={comentariosPorPagina}
          array={array.length}
          paginacion={paginacion}
          pagina={pagina}
          setPagina={setPagina}
        /> */}
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
