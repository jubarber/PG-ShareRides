import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import fondo from "../../assets/fondo perfil.jpg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Admin() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [statePassword, setStatePassword] = useState(false);

  async function iniciarSesion(input) {
    const response = await axios({
      method: "post",
      url: `http://localhost:3001/api/admin/sesionadmin`,
      data: {
        email: input.email,
        password: input.password,
      },
    });
    if (response.data === "Admin inicia sesion") {
      navigate("/adminhome");
      cookies.set("admin", "true");
    } else {
      swal({
        title: "Alto!",
        text: response.data,
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    }
    console.log(response);
  }

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
        text: "Campo vacío o email incorrecto",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else if (Object.values(input)[1] === "") {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Por favor ingrese correctamente la contraseña",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else {
      iniciarSesion(input);
    }
  };

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
      <form className="Admin__formulario-login" onSubmit={handleSubmit}>
        <div className="Admin__input_box">
          <input
            className="Admin__input_login"
            type="text"
            placeholder="Ingrese su Email"
            value={input.email}
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="Admin__input_box">
          <input
            className="Admin__input_login"
            type={statePassword ? "text" : "password"}
            placeholder="Ingrese su contraseña"
            value={input.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button className="Admin__ojo" onClick={handleEye}>
            {statePassword ? <BsEye /> : <BsEyeSlash />}
          </button>
        </div>
        <button className="Admin__btn_login" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
