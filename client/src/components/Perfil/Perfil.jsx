import React, { useState } from "react";
import { Link } from "react-router-dom";
import fondo from "../../assets/fondo perfil.jpg";
import "./Perfil.css";
import { FaEdit } from "react-icons/fa";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import PaginacionComentarios from "./PaginacionComentarios";
import foto from "../../assets/foto perfil.jfif";

export default function Perfil() {
  const [usuario, setUsuario] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Telefono: "",
    DNI: "",
    AcercaDeMi: "",
    Imagen: "",
    Patente: "",
    Modelo: "",
  });

  const [check, setCheck] = useState(false);
  const [habilitarTelefono, setHabilitarTelefono] = useState(true);
  const [habilitarDNI, setHabilitarDNI] = useState(true);
  const [habilitarAcercaDeMi, setHabilitarAcercaDeMi] = useState(true);
  const [habilitarImagen, setHabilitarImagen] = useState(true);
  const [habilitarMarca, setHabilitarMarca] = useState(true);
  const [habilitarPatente, setHabilitarPatente] = useState(true);
  const [habilitarModelo, setHabilitarModelo] = useState(true);

  let array = [
    {
      Nombre: "Julio",
      Puntuacion: 4,
      Comentario: "sfsofsifisfhsfihsifoshfoshfsofhsofhs",
    },
    {
      Nombre: "Julio",
      Puntuacion: 4,
      Comentario: "sfsofsifisfhsfihsifoshfoshfsofhsofhs",
    },
    {
      Nombre: "Julio",
      Puntuacion: 4,
      Comentario:
        "Holaaaa no me voy a arreglar, sufri aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
      Nombre: "Julio",
      Puntuacion: 4,
      Comentario: "sfsofsifisfhsfihsifoshfoshfsofhsofhs",
    },
    {
      Nombre: "Julio",
      Puntuacion: 4,
      Comentario: "sfsofsifisfhsfihsifoshfoshfsofhsofhs",
    },
    {
      Nombre: "Julio",
      Puntuacion: 4,
      Comentario: `sfsofsifis
      fhsfihsifoshfoshfsofhsofhs`,
    },
    {
      Nombre: "Julio",
      Puntuacion: 4,
      Comentario: `sfsofsifisfhsfihsifoshfo
      shfsofhsofhs`,
    },
  ];

  const [pagina, setPagina] = useState(1);
  const [comentariosPorPagina, setComentariosPorPagina] = useState(3);
  const ultimoComentario = pagina * comentariosPorPagina;
  const primerComentario = ultimoComentario - comentariosPorPagina;
  const personitas = array?.slice(primerComentario, ultimoComentario);

  console.log(array);

  const paginacion = (pageNum) => {
    setPagina(pageNum);
  };

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
  const clickMarca = (e) => {
    e.preventDefault();
    setHabilitarMarca(!habilitarMarca);
  };
  const clickPatente = (e) => {
    e.preventDefault();
    setHabilitarPatente(!habilitarPatente);
  };

  const clickModelo = (e) => {
    e.preventDefault();
    setHabilitarModelo(!habilitarModelo);
  };

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
            <h1>Julio Humere</h1>
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
                value={usuario.Nombre}
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
                onChange={handleChange}
                name="Apellido"
                value={usuario.Apellido}
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
                value={usuario.Email}
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
            <div className="nombre">
              <label>
                <Checkbox
                  aria-label="Tengo Auto!"
                  color="secondary"
                  onChange={handleCheck}
                />
                Tengo Auto!
              </label>
            </div>
            {check ? (
              <>
                {" "}
                <div className="nombre">
                  <h5>Marca___</h5>
                  <input
                    type="text"
                    className="input-perfil"
                    onChange={handleChange}
                    name="Patente"
                    value={usuario.Patente}
                    disabled={habilitarPatente}
                  />
                  <button onClick={clickPatente}>
                    <FaEdit />
                  </button>
                </div>
                <div className="nombre">
                  <h5>Patente_</h5>
                  <input
                    type="text"
                    className="input-perfil"
                    onChange={handleChange}
                    name="Patente"
                    value={usuario.Patente}
                    disabled={habilitarPatente}
                  />
                  <button onClick={clickPatente}>
                    <FaEdit />
                  </button>
                </div>
                <div className="nombre">
                  <h5>Modelo__</h5>
                  <input
                    type="text"
                    className="input-perfil"
                    onChange={handleChange}
                    name="Modelo"
                    value={usuario.Modelo}
                    disabled={habilitarModelo}
                  />
                  <button onClick={clickModelo}>
                    <FaEdit />
                  </button>
                </div>
              </>
            ) : null}
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
              <label>Deja tu comentario</label>
              <input type="text" />
            </div>
            <Button color="secondary" size="medium" className="btn-enviar">
              Enviar
            </Button>
          </div>
        </form>
        {personitas &&
          personitas.map((e) => (
            <div className="resenas-card">
              <div className="encabezado">
                <img src={e.Foto} alt="" />
                <h1>{e.Nombre}</h1>
              </div>
              <h3>Punturacion: {e.Estrellas}</h3>
              <div className="texto">
                <p>{e.Comentario}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="pag">
        <PaginacionComentarios
          comentariosPorPagina={comentariosPorPagina}
          array={array.length}
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
