import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  activarPerfil,
  getUsuarioByEmail,
  login
} from "../../redux/actions/actions";
import Swal from "sweetalert2";
import fondo from "../../assets/fondo perfil.jpg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./Login.css";
import Cookies from "universal-cookie";
import NavBarSinLogin from "../NavBar/NavBarSinLogin";

export default function Login() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("hola soy usuario vacio");
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    usuario: "",
    password: ""
  });
  const [inicioSesion, setInicioSesion] = useState("");
  const [statePassword, setStatePassword] = useState(false);

  function iniciarSesion(input) {
    axios({
      method: "get",
      url: `/api/usuario/iniciarsesion/${input.email}/${input.password}`
    }).then(r => setInicioSesion(r.data));
  }

  function getUsuarioByEmail(email) {
    axios({
      method: "get",
      url: `/api/usuario/usuarios/${email}`
    }).then(r => setUsuario(r.data));
  } //fin function getUsuario

  useEffect(
    () => {
      cookies.set("dni", usuario.dni, { path: "/" });
      cookies.set("email", input.email, { path: "/" });
      cookies.set("nombre", usuario.nombre, { path: "/" });
      cookies.set("apellido", usuario.apellido, { path: "/" });
      cookies.set("logueado", usuario.logueado, { path: "/" });
      cookies.set("vehiculo", usuario.vehiculo, { path: "/" });
      cookies.set("avatar", usuario.avatar, { path: "/" });
      cookies.set("acercaDeMi", usuario.acercaDeMi, { path: "/" });
      cookies.set("calificacion", usuario.calificacion, { path: "/" });
    },
    [usuario]
  );

  useEffect(
    () => {
      if (inicioSesion === "Usuario Eliminado"){
        Swal.fire({
          title: "Usuario eliminado",
          text: "Comunicate con pgsharerides@gmail.com para información",
          icon: "warning",
        });
      }
      if (inicioSesion === "usuario pausado") {
        setError({ ...error, usuario: "El usuario ha sido pausado" });
        Swal.fire({
          title: "Su cuenta ha sido eliminada!",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          denyButtonColor: "#6BFF43 ",
          confirmButtonText: "Conservar contraseña",
          denyButtonText: `Cambiar contraseña`,
          cancelButtonText: "Volver al inicio"
        }).then(result => {
          if (result.isConfirmed) {
            dispatch(activarPerfil(input.email));
            getUsuarioByEmail(input.email);
            dispatch(login(input.email));
            Swal.fire({
              title: "Se ha restaurado exitosamente!",
              icon: "success",
              confirmButtonText: "Bienvenidx de nuevo!",
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false
            }).then(function() {
              navigate("/home");
            });
          } else if (result.isDenied) {
            cookies.set("email", input.email, { path: "/" });
            Swal.fire({
              title:
                "En instantes serás redirigide a la restauración de tu cuenta",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              didOpen: () => {
                Swal.showLoading();
              }
            }).then(() => {
              navigate("/restaurarCuenta");
            });
          } else {
            navigate("/");
          }
        });
      } else if (inicioSesion === "contraseña incorrecta") {
        setError({ ...error, password: "Contraseña incorrecta" });
        Swal.fire({
          title: "Ups!",
          text: "Contraseña incorrecta",
          icon: "warning",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
      } else if (inicioSesion === "usuario no encontrado") {
        setError({ ...error, usuario: "Usuario no registrado" });
        Swal.fire({
          title: "Ups!",
          text: "El email ingresado no es válido",
          icon: "warning",
        });
      } else if (inicioSesion === "ok") {
        getUsuarioByEmail(input.email);
        dispatch(login(input.email));
        Swal.fire({
          title: "El inicio de sesión ha sido exitoso!",
          icon: "success",
          confirmButtonText: "Bienvenidx!"
        }).then(function() {
          navigate("/home");
        });
      }
    },
    [inicioSesion]
  );

  function handleEye(e) {
    e.preventDefault();
    setStatePassword(prevStatePassword => !prevStatePassword);
  }

  const handleSubmit = e => {
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
        text: "Por favor ingrese su contraseña",
        icon: "warning",
      });
    } else {
      iniciarSesion(input);
    }
  };

  function handleChangeEmail(e) {
    e.preventDefault();
    setInput({
      ...input,
      email: e.target.value
    });
  }

  function handleChangePassword(e) {
    e.preventDefault();
    setInput({
      ...input,
      password: e.target.value
    });
  }

  return (
    <div>
      <NavBarSinLogin />
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
      <div className="Login__nav">
        <Link to="/home">
          <button className="Login__btn_volver">Volver</button>
        </Link>
      </div>
      <form className="Login__formulario-login" onSubmit={handleSubmit}>
        <div className="Login__input_box">
          <input
            className="Login__input_login"
            type="text"
            placeholder="Ingrese su Email"
            value={input.email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="Login__input_box">
          <input
            className="Login__input_login"
            type={statePassword ? "text" : "password"}
            placeholder="Ingrese su contraseña"
            value={input.password}
            onChange={handleChangePassword}
          />
          <button className="Login__ojo" onClick={handleEye}>
            {statePassword ? <BsEye /> : <BsEyeSlash />}
          </button>
        </div>
        <button className="Login__btn_login" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
