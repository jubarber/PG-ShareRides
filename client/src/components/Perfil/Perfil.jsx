import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../assets/fondo perfil.jpg";
import "./Perfil.css";
import { FaEdit } from "react-icons/fa";
import Button from "@mui/material/Button";
import {
  eliminarComentarios,
  eliminarPerfil,
  getComentarios,
  getComentariosById,
  getUsuarioByEmail,
  getViajesTotal,
  logout,
  modificacionPerfil,
  postComentarios,
  postReporte,
  reportarComentarios,
} from "../../redux/actions/actions";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";
import user from "../../assets/user.png";
import Rating from "@mui/material/Rating";
import PaginacionComentarios from "./PaginacionComentarios";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
    avatar: "",
  });

  // console.log("miUsuario", cookieEmail);
  // console.log("usuario", usuario);

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

  const [reportes, setReportes] = useState({
    justificacion: "",
    email: email,
    nombre: cookieNombre,
    apellido: cookieApellido,
  });

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
  const ComentariosTotales =
    miUsuario.comentarios &&
    miUsuario.comentarios.length !== 0 &&
    miUsuario.comentarios.slice(primerComentario, ultimoComentario);

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
    setCount(e.target.value.length !== 0);
  };

  const handleChangeReportes = (e) => {
    setReportes({
      ...reportes,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitReportes = (e) => {
    dispatch(postReporte(reportes));
    setReportes({
      justificacion: "",
    });
    navigate("/home");
  };

  const handleSubmitComentarios = (e) => {
    dispatch(postComentarios(reviews));
    setReviews({
      calificacion: "",
      comentarios: "",
    });
  };

  const handleUpdate = (e) => {
    dispatch(modificacionPerfil(usuario));
    navigate("/home");
  };

  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dvmrweg0f/image/upload";
  const CLOUDINARY_UPLOAD_PRESETS = "sharerides";

  const handleChangeUpdateImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESETS);

    const response = await axios
      .post(CLOUDINARY_URL, data)
      .then((res) => res.data);
    setUsuario({
      ...usuario,
      avatar: response.url,
    });
  };

  const handleEliminado = (e) => {
    Swal.fire({
      title: "Estas Seguro?🥺",
      text: "Luego podras restaurar tu cuenta!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarPerfil(cookieEmail));
        dispatch(logout(cookieEmail));
         Swal.fire("Borrada!", "Tu cuenta ha sido eliminada!", "success");
         navigate("/")
      }
    });
  };

  const handleBorrarComentario = (e) => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "No podras revertir la decision!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarComentarios(e.target.value));
        Swal.fire(
          "Borrado!",
          "Tu Comentario ha sido eliminado con exito.",
          "success"
        ).then(() => {
          navigate("/home");
        });
      }
    });
  };

  let [countReportes, setCountNumReportes] = useState(0);

  const [numReportes, setNumReportes] = useState({
    reportes: countReportes + 1,
  });

  console.log("comentarios", ComentariosTotales);

  const handleReportarComentario = (e) => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "No podras revertir la decision!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reportar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(reportarComentarios(e.target.value));
        Swal.fire(
          "Reportado!",
          "El comentario ha sido reportado con exito!",
          "success"
        ).then(() => {
          // navigate("/home");
        });

      }
    });
  };

  return (
    <div className="perfil">
      <NavBar />
      <div className="contenedor-perfil">
        <div className="contenedor-imagen">
          <div className="img-perfil">
            <img src={miUsuario.avatar} alt="" />
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
            <div className="btn-perfil">
              {cookieEmail === email ? (
                <Button
                  onClick={handleEliminado}
                  type="submit"
                  variant="contained"
                  color="error"
                  size="medium"
                >
                  Eliminar cuenta
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Reportar Usuario
                </Button>
              )}
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
                <div>
                  <input
                    type="file"
                    name="avatar"
                    onChange={(e) => handleChangeUpdateImage(e)}
                  />
                </div>
              ) : (
                <label className="overflow-hidden">{miUsuario.avatar}</label>
              )}
            </div>
            {cookieEmail !== email ? null : (
              <div className="btn-modificacion-perfil">
                <div className="btn-mis-viajes">
                  <Link to={"/misviajes/" + cookieEmail}>
                    <button className="btn-modificacion-perfil-active">
                      Mis Viajes
                    </button>
                  </Link>
                </div>
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
            )}
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
              ComentariosTotales.map((e) =>
                e.disponible === true ? (
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
                    <div className="comentarios-abajo">
                      <button
                        type="submit"
                        value={e.id}
                        onClick={(e) => handleBorrarComentario(e)}
                      >
                        Eliminar
                      </button>
                      <button
                        type="submit"
                        value={e.id}
                        onClick={(e) => handleReportarComentario(e)}
                      >
                        Reportar
                      </button>

                      <p>{e.dia}</p>
                    </div>
                  </div>
                ) : null
              )}
          </div>
          <div className="pag">
            {comentarios.length !== 0 && (
              <PaginacionComentarios
                comentariosPorPagina={comentariosPorPagina}
                comentarios={comentarios.length}
                paginacion={paginacion}
                pagina={pagina}
                setPagina={setPagina}
              />
            )}
          </div>
        </div>
      </div>

      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" />
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div class="modal-body">
              <h3>
                Reportando a {miUsuario.nombre} {miUsuario.apellido}
              </h3>
              <br />
              <textarea
                class="form-control"
                type="text"
                placeholder="Escriba aqui su justificacion del reporte"
                name="justificacion"
                value={reportes.justificacion}
                onChange={(e) => handleChangeReportes(e)}
              />
            </div>
            <div class="modal-footer">
              <form onSubmit={(e) => handleSubmitReportes(e)}>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Continuar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
