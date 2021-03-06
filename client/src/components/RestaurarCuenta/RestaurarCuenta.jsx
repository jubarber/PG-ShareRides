import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import {
  cambioPassword,
  getUsuarioByEmail,
  registroUsuario,
  activarPerfil
} from "../../redux/actions/actions";
import Swal from "sweetalert2";
import fondo from "../../assets/fondo perfil.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./RestaurarCuenta.css";
import NavBarSinLogin from "../NavBar/NavBarSinLogin";

export default function RestaurarCuenta() {
  const cookies = new Cookies();
  const [statePassword, setStatePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookieMail = cookies.get("email");
  const [input, setInput] = useState({ password: "", confirmPassword: "" });
  const [usuario, setUsuario] = useState({
    email: cookieMail,
    nombre: "",
    apellido: "",
    avatar: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    dispatch(getUsuarioByEmail(cookieMail)).then(r => {
      cookies.set("dni", r.payload.dni, { path: "/" });
      cookies.set("nombre", r.payload.nombre, { path: "/" });
      cookies.set("apellido", r.payload.apellido, { path: "/" });
      cookies.set("logueado", r.payload.logueado, { path: "/" });
      cookies.set("vehiculo", r.payload.vehiculo, { path: "/" });
      cookies.set("avatar", r.payload.avatar, { path: "/" });
      cookies.set("acercaDeMi", r.payload.acercaDeMi, { path: "/" });
      cookies.set("calificacion", r.payload.calificacion, { path: "/" });
      console.log("nombre", cookies.get("nombre"));
    });
  }, []);

  function handleChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  function handleEye(e) {
    e.preventDefault();
    setStatePassword(prevStatePassword => !prevStatePassword);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(input)[0] === "") {
      e.preventDefault();
      Swal.fire({
        title: "Alto!",
        text: "Por favor complete todos los campos",
        icon: "warning",
      });
    } else if (Object.values(input)[1] === "") {
      e.preventDefault();
      Swal.fire({
        title: "Alto!",
        text: "Por favor ingrese su contrase??a",
        icon: "warning",
      });
    } else if (input.password !== input.confirmPassword) {
      e.preventDefault();
      Swal.fire({
        title: "Alto!",
        text: "Las contrase??as no coinciden",
        icon: "warning",
      });
    } else {
      dispatch(cambioPassword(cookieMail, input.password)).then(
        dispatch(activarPerfil(cookieMail))
      );
      Swal.fire({
        title: "Se ha cambiado exitosamente la contrase??a!",
        icon: "success",
        confirmButtonText: "Bienvenidx de nuevo!"
      }).then(function() {
        navigate("/home");
      });
    }
  }

  return (
    <div>
      <NavBarSinLogin />
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
      <div className="Google__nav">
        <Link to="/">
          <button className="Google__btn_volver">Volver</button>
        </Link>
      </div>
      <div>
        <div className="Google__titulos">
          <h1>Coloca una nueva contrase??a para usar la plataforma</h1>
          <h2>Estas actualizando tu contrase??a de Share Rides</h2>
        </div>
        <form className="Google__formulario-login" onSubmit={handleSubmit}>
          <div className="Google__input_box">
            <input
              className="Google__input_login"
              type={statePassword ? "text" : "password"}
              value={usuario.password}
              name="password"
              placeholder="Contrase??a Share Rides"
              onChange={e => handleChange(e)}
            />
            <button className="Google__ojo" onClick={handleEye}>
              {statePassword ? <BsEye /> : <BsEyeSlash />}
            </button>
          </div>
          <div className="Google__input_box">
            <input
              className="Google__input_login"
              type={statePassword ? "text" : "password"}
              value={usuario.confirmPassword}
              name="confirmPassword"
              placeholder="Confirmar contrase??a"
              onChange={e => handleChange(e)}
            />
            <button className="Google__ojo" onClick={handleEye}>
              {statePassword ? <BsEye /> : <BsEyeSlash />}
            </button>
          </div>
          <button className="Google__btn_entrar" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
