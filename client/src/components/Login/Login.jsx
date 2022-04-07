import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/actions";
import swal from "sweetalert";
import fondo from "../../assets/fondo perfil.jpg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./Login.css";
import Cookies from "universal-cookie";
import NavBarSinLogin from "../NavBar/NavBarSinLogin";

export default function Login() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState("hola soy usuario vacio");
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    usuario: "",
    password: "",
  });
  const [inicioSesion, setInicioSesion] = useState("");
  const [statePassword, setStatePassword] = useState(false);

  function iniciarSesion(input) {
    axios({
      method: "get",
      url: `http://localhost:3001/api/usuario/iniciarsesion/${input.email}/${input.password}`,
    }).then((r) => setInicioSesion(r.data));
  }

  function getUsuarioByEmail(email) {
    axios({
      method: "get",
      url: `http://localhost:3001/api/usuario/usuarios/${email}`,
    }).then((r) => setUsuario(r.data));
  } //fin function getUsuario

    useEffect(() => {
      cookies.set("dni", usuario.dni, { path: "/" });
      cookies.set("email", usuario.email, { path: "/" });
      cookies.set("nombre", usuario.nombre, { path: "/" });
      cookies.set("apellido", usuario.apellido, { path: "/" });
      cookies.set("logueado", usuario.logueado, { path: "/" });
      cookies.set("vehiculo", usuario.vehiculo, { path: "/" });
      cookies.set("avatar", usuario.avatar, { path: "/" });
      cookies.set("acercaDeMi", usuario.acercaDeMi, { path: "/" });
      cookies.set("calificacion", usuario.calificacion, { path: "/" });
      console.log(cookies.get("nombre"));
    }, [usuario]);
  
  useEffect(() => {
    if (inicioSesion === "contraseña incorrecta") {
      setError({ ...error, password: "Contraseña incorrecta" });
      swal({
        title: "Ups!",
        text: "Contraseña incorrecta",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else if (inicioSesion === "usuario no encontrado") {
      setError({ ...error, usuario: "Usuario no registrado" });
      swal({
        title: "Ups!",
        text: "El email ingresado no es válido",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else if (inicioSesion === "ok") {
      getUsuarioByEmail(input.email);
      dispatch(login(input.email));
      swal({
        title: "El inicio de sesión ha sido exitoso!",
        icon: "success",
        button: "Bienvenidx!",
      }).then(function () {
        window.location = "/home";
      });
    }
  }, [inicioSesion]);

  function handleEye(e) {
    e.preventDefault();
    setStatePassword((prevStatePassword) => !prevStatePassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(input)[0] === "") {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Por favor complete todos los campos",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else if (Object.values(input)[1] === "") {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Por favor ingrese su contraseña",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else {
      iniciarSesion(input);
    }
  };

  function handleChangeEmail(e) {
    e.preventDefault();
    setInput({
      ...input,
      email: e.target.value,
    });
  }

  function handleChangePassword(e) {
    e.preventDefault();
    setInput({
      ...input,
      password: e.target.value,
    });
  }

  return (
    <div>
      <NavBarSinLogin />
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
      <div className="Login__nav">
        <Link to="/">
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
