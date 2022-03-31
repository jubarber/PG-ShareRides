import React, { useState } from "react";
import { Link } from "react-router-dom";
import fondo from "../../assets/fondo perfil.jpg";
import "./Perfil.css";
import { FaEdit } from "react-icons/fa";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import PaginacionComentarios from "./PaginacionComentarios";

export default function Perfil() {
  const [usuario, setUsuario] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Telefono: "",
    DNI: "",
    Patente: "",
    Modelo: "",
  });

  const [check, setCheck] = useState(false);
  const [habilitarTelefono, setHabilitarTelefono] = useState(true);
  const [habilitarDNI, setHabilitarDNI] = useState(true);
  const [habilitarPatente, setHabilitarPatente] = useState(true);
  const [habilitarModelo, setHabilitarModelo] = useState(true);

  let array = [
    {
      Nombre: "Julio",
      Estrellas: "3️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
    {
      Nombre: "Camila",
      Estrellas: "9️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
    {
      Nombre: "Juana",
      Estrellas: "6️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
    {
      Nombre: "Carlos",
      Estrellas: "1️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
    {
      Nombre: "Carolina",
      Estrellas: "1️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
    {
      Nombre: "Marcela",
      Estrellas: "1️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
    {
      Nombre: "Enrique",
      Estrellas: "1️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
    {
      Nombre: "Enrique",
      Estrellas: "1️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
    {
      Nombre: "Enrique",
      Estrellas: "1️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
    {
      Nombre: "Enrique",
      Estrellas: "1️⃣",
      Comentario: `ipsum dolor sit, amet consectetur adipisicing elit. Non
        pariatur atque praesentium a doloribus hic incidunt reprehenderit.
        Oditp
        `,
      Foto: "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg",
    },
  ];

  const [pagina, setPagina] = useState(1);
  const [comentariosPorPagina, setComentariosPorPagina] = useState(4);
  const ultimoComentario = pagina * comentariosPorPagina;
  const primerComentario = ultimoComentario - comentariosPorPagina;
  const personitas = array?.slice(primerComentario, ultimoComentario);

  console.log(array);

  const paginacion = (pageNum) => {
    setPagina(pageNum);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    if (check === false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const clickTelefono = (e) => {
    e.preventDefault();
    setHabilitarTelefono(!habilitarTelefono);
  };
  const clickDNI = (e) => {
    e.preventDefault();
    setHabilitarDNI(!habilitarDNI);
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

  console.log(usuario);
  return (
    <div className="perfil" class="font-mono">
      <div className="contenedor-perfil">
        <div className="contenedor-imagen">
          <div className="img-perfil">
            <img
              src="https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"
              alt=""
              width="30"
              height="30"
            />
          </div>
          <div className="bio-perfil">
            <h1>Julio Humere</h1>
            <p>
              {" "}
              ipsum dolor sit, amet consectetur adipisicing elit. Non pariatur
              atque praesentium a doloribus hic incidunt reprehenderit. Oditp
            </p>
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
              <button>
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
              <button>
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
              <button>
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
        {personitas &&
          personitas.map((e) => (
            <div className="resenas-card">
              <div className="encabezado">
                <img src={e.Foto} alt="" />
                <h1>{e.Nombre}</h1>
              </div>
              <h3>Punturacion: {e.Estrellas}</h3>
              <p>{e.Comentario}</p>
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
