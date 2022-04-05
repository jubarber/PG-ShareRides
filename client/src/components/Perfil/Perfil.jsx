import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../assets/fondo perfil.jpg";
import "./Perfil.css";
import { FaEdit } from "react-icons/fa";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import PaginacionComentarios from "./PaginacionComentarios";
import foto from "../../assets/userRojo.jpg";
import { getUsuarios } from "../../redux/actions/actions";

export default function Perfil() {
  const dispatch = useDispatch();
  const miUsuario = useSelector((state) => state.usuarios);
  console.log(miUsuario);
  const [usuario, setUsuario] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Telefono: "",
    DNI: "",
    AcercaDeMi: "",
    Imagen: "",
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

  const handleCheck = (e) => {
    setCheck(!check);
  };

  const clickTelefono = (e) => {
    e.preventDefault();
    setHabilitarTelefono(!habilitarTelefono);
  };
  const clickDNI = (e) => {
    e.preventDefault();
    setHabilitarDNI(!habilitarDNI);
  };
  const clickAcercaDeMi = (e) => {
    e.preventDefault();
    setHabilitarAcercaDeMi(!habilitarAcercaDeMi);
  };
  const clickImagen = (e) => {
    e.preventDefault();
    setHabilitarImagen(!habilitarImagen);
  };

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="perfil" class="font-mono">
      <div className="contenedor-perfil">
        <div className="contenedor-imagen">
          <div className="img-perfil">
            <img src={foto} alt="" />
          </div>
          <div className="bio-perfil">
            <h1>
              {miUsuario[0]?.nombre} {miUsuario[0]?.apellido}
            </h1>
            <input
              type="text"
              onChange={handleChange}
              name="AcercaDeMi"
              value={usuario.AcercaDeMi}
              disabled={habilitarAcercaDeMi}
            />{" "}
            <button onClick={clickAcercaDeMi}>
              <FaEdit />
            </button>
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
          <form className="contenedor-form">
            <div className="nombre">
              <h5>Nombre__</h5>
              <input
                type="text"
                className="input-perfil"
                onChange={handleChange}
                name="Nombre"
                value={miUsuario[0]?.nombre}
                disabled
              />
              <button disabled>
                <FaEdit />
              </button>
            </div>
            <div className="nombre">
              <h5>Apellido</h5>
              <input
                type="text"
                className="input-perfil"
                name="Apellido"
                value={miUsuario[0]?.apellido}
                disabled
              />
              <button disabled>
                <FaEdit />
              </button>
            </div>
            <div className="nombre">
              <h5>Email___</h5>
              <input
                type="text"
                className="input-perfil"
                onChange={handleChange}
                name="Email"
                value={miUsuario[0]?.email}
                disabled
              />
              <button disabled>
                <FaEdit />
              </button>
            </div>
            <div className="nombre">
              <h5>Telefono</h5>
              <input
                type="text"
                className="input-perfil"
                onChange={handleChange}
                name="Telefono"
                value={usuario.Telefono}
                disabled={habilitarTelefono}
              />
              <button onClick={clickTelefono}>
                <FaEdit />
              </button>
            </div>
            <div className="nombre">
              <h5>DNI_____</h5>
              <input
                type="text"
                className="input-perfil"
                onChange={handleChange}
                name="DNI"
                value={usuario.DNI}
                disabled={habilitarDNI}
              />
              <button onClick={clickDNI}>
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
