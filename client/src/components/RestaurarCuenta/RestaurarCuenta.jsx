import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import {
  cambioPassword,
  getUsuarioByEmail,
  registroUsuario,
} from "../../redux/actions/actions";
import swal from "sweetalert";
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
  const cookieEmail = cookies.get("email");
  const [input, setInput] = useState({ password: "", confirmPassword: "" });
  const [usuario, setUsuario] = useState({
    email: "",
    nombre: "",
    apellido: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });
  
  function handleChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleEye(e) {
    e.preventDefault();
    setStatePassword((prevStatePassword) => !prevStatePassword);
  }

  function handleSubmit(e) {
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
    } else if (input.password !== input.confirmPassword) {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Las contraseñas no coinciden",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else {
      //   dispatch(cambioPassword());
      swal({
        title: "Se ha cambiado exitosamente la contraseña!",
        icon: "success",
        button: "Bienvenidx de nuevo!",
      }).then(function () {
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
          <h1>Coloca una nueva contraseña para usar la plataforma</h1>
          <h2>Estas actualizando tu contraseña de Share Rides</h2>
        </div>
        <form className="Google__formulario-login" onSubmit={handleSubmit}>
          <div className="Google__input_box">
            <input
              className="Google__input_login"
              type={statePassword ? "text" : "password"}
              value={usuario.password}
              name="password"
              placeholder="Contraseña Share Rides"
              onChange={(e) => handleChange(e)}
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
              placeholder="Confirmar contraseña"
              onChange={(e) => handleChange(e)}
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
