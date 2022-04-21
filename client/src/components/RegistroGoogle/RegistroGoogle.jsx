import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { registroUsuario, login } from "../../redux/actions/actions";
import Swal from "sweetalert2";
import fondo from "../../assets/fondo perfil.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./RegistroGoogle.css";
import NavBarSinLogin from "../NavBar/NavBarSinLogin";

export default function RegistroGoogle() {
  const cookies = new Cookies();
  const [statePassword, setStatePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let cookieEmail = cookies.get("email");
  let cookieNombre = cookies.get("nombre");
  let cookieApellido = cookies.get("apellido");
  let cookieAvatar = cookies.get("avatar");
  const [input, setInput] = useState({ password: "", confirmPassword: "" });
  const [usuario, setUsuario] = useState({
    email: cookieEmail,
    nombre: cookieNombre,
    apellido: cookieApellido,
    avatar: cookieAvatar,
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
    } else if (input.password !== input.confirmPassword) {
      e.preventDefault();
      Swal.fire({
        title: "Alto!",
        text: "Las contraseñas no coinciden",
        icon: "warning",
      });
    } else {
      dispatch(registroUsuario(usuario));
      dispatch(login(cookieEmail))
      Swal.fire({
        title: "El registro ha sido exitoso!",
        icon: "success",
        confirmButtonText: "Bienvenidx!",
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
          <h1>Coloca una contraseña para usar la plataforma</h1>
          <h2>Será tu contraseña de Share Rides</h2>
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
