import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../assets/fondo perfil.jpg";
import "./Perfil.css";
import { FaEdit } from "react-icons/fa";
import { AiFillCheckSquare } from "react-icons/ai";
import Button from "@mui/material/Button";
import {
  getComentarios,
  getUsuarioByEmail,
  getViajesTotal,
  modificacionPerfil,
  postComentarios,
} from "../../redux/actions/actions";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";
import user from "../../assets/user.png";
import Rating from "@mui/material/Rating";
import PaginacionComentarios from "./PaginacionComentarios";
import axios from "axios";



export default function Perfil() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieNombre = cookies.get("nombre");
  const cookieApellido = cookies.get("apellido");
  const cookieEmail = cookies.get("email");
  const cookieAvatar = cookies.get("avatar");
  const [count, setCount] = useState(0);
  const miUsuario = useSelector((state) => state.usuario);
  const comentarios = useSelector((state) => state.comentarios);
  const viajes = useSelector((state) => state.viajes);
  const { email } = useParams();
  useEffect(() => {
    if (email) {
      dispatch(getUsuarioByEmail(email));
    }
    dispatch(getViajesTotal());
  }, [email]);


  const [subiendo, setSubiendo] = useState("");
  const [imagen, setImagen] = useState("");
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: miUsuario.email,
    telefono: miUsuario.telefono,
    dni: miUsuario.dni,
    acercaDeMi: miUsuario.acercaDeMi,
    avatar: cookieAvatar,
  });

  let viajesUsuarios = viajes.map((e) => e.usuarios.map((e) => e.email));

  let viajesTotales = viajesUsuarios.map(
    (e) => e.includes(cookieEmail) && e.includes(email)
  );

  const [reviews, setReviews] = useState({
    calificacion: "",
    comentarios: "",
    email: email,
    nombre: cookieNombre,
    apellido: cookieApellido,
  });

  useEffect(() => {
    dispatch(getComentarios());
  }, [reviews]);

  //-----------------------Inputs--------------------------

  const [habilitarTelefono, setHabilitarTelefono] = useState(true);
  const [habilitarDNI, setHabilitarDNI] = useState(true);
  const [habilitarAcercaDeMi, setHabilitarAcercaDeMi] = useState(true);
  const [habilitarAvatar, setHabilitarAvatar] = useState(true);

  const habilitarInputs = (e) => {
    e.preventDefault();
    setHabilitarDNI(!habilitarDNI);
    setHabilitarTelefono(!habilitarTelefono);
    setHabilitarAcercaDeMi(!habilitarAcercaDeMi);
    setHabilitarAvatar(!habilitarAvatar);
  };
  //----------------------------------------------------------

  //--------------Paginado--------------------

  const [pagina, setPagina] = useState(1);
  const [comentariosPorPagina, setComentariosPorPagina] = useState(3);
  const ultimoComentario = pagina * comentariosPorPagina;
  const primerComentario = ultimoComentario - comentariosPorPagina;
  const ComentariosTotales = miUsuario.comentarios?.slice(
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
    // navigate("/home");
    console.log("datitaaa", subiendo);
    const data = new FormData();
    data.append("file", subiendo);
    data.append("upload_preset", "sharerides");
    // setLoading(true)
    axios
      .post("https://api.cloudinary.com/v1_1/dvmrweg0f/image/upload", data)
      .then((r) => {
        setImagen(r.data.url);
        setUsuario({ avatar: r.data.url });
      });
  };

  const onChangeSubiendo = (e) => {
    e.preventDefault();
    setSubiendo(e.target.files[0]);
  };

  return (
    <div className="perfil">
      <NavBar />
      <div className="contenedor-perfil">
        <div className="contenedor-imagen">
          <div className="img-perfil">
            <img src={miUsuario.avatar ? miUsuario.avatar : user} alt="" />
          </div>
          <div className="bio-perfil">
            <h1>
              {miUsuario.nombre} {miUsuario.apellido}
            </h1>{" "}
            {!habilitarAcercaDeMi ? (
              <textarea
                type="text"
                onChange={handleChange}
                name="acercaDeMi"
                value={usuario.acercaDeMi}
                disabled={habilitarAcercaDeMi}
              />
            ) : (
              <label>{miUsuario.acercaDeMi}</label>
            )}
            {/* <div cla}ssName="btn-perfil">
              <Button color="secondary" size="medium">
                Seguir
              </Button>

              <Button color="secondary" size="medium">
                Mensaje
              </Button>
            </div> */}
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
              {!habilitarTelefono ? (
                <input
                  type="text"
                  className="input-perfil"
                  onChange={handleChange}
                  name="telefono"
                  value={usuario.telefono}
                  disabled={habilitarTelefono}
                />
              ) : (
                <label>{miUsuario.telefono}</label>
              )}
            </div>
            <div className="contenedor-input">
              <h5>DNI</h5>
              {!habilitarDNI ? (
                <input
                  type="text"
                  className="input-perfil"
                  onChange={handleChange}
                  name="dni"
                  value={usuario.dni}
                  disabled={habilitarDNI}
                />
              ) : (
                <label>{miUsuario.dni}</label>
              )}
            </div>
            <div className="contenedor-input">
              <h5>Avatar</h5>
              {!habilitarAvatar ? (
                <>
                  <input
                    type="file"
                    className="input-perfil"
                    onChange={onChangeSubiendo}
                    name="avatar"
                    disabled={habilitarAvatar}
                  />
                  {/* <input
                    type="submit"
                    onClick={uploadImage}
                    value="Cargar imagen"
                  /> */}
                </>
              ) : (
                <label>{miUsuario.avatar}</label>
              )}
            </div>
            <div className="btn-modificacion-perfil">
              {habilitarTelefono === false &&
              habilitarDNI === false &&
              habilitarAcercaDeMi === false &&
              habilitarAvatar === false ? (
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
        <div className="form">
          {cookieEmail !== email && viajesTotales.includes(true) ? (
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
          ) : null}
        </div>
        <div className="tableroComentarios">
          <div className="contenedor-comentarios">
            {ComentariosTotales &&
              ComentariosTotales.map((e) => (
                <div className="resenas-card">
                  <div className="encabezado">
                    <img src={e.avatar ? e.avatar : user} alt="" />
                    <h1>
                      {e.nombre} {e.apellido}
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
                  <p className="dia">{e.dia}</p>
                </div>
              ))}
          </div>
          <div className="pag">
            <PaginacionComentarios
              comentariosPorPagina={comentariosPorPagina}
              comentarios={comentarios?.length}
              paginacion={paginacion}
              pagina={pagina}
              setPagina={setPagina}
            />
          </div>
        </div>
      </div>

      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
