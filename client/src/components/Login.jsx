import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/actions";
import swal from "sweetalert";

export default function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    usuario: "",
    password: ""
  });
  const [inicioSesion, setInicioSesion] = useState("");

  function iniciarSesion(input) {
    axios({
      method: "get",
      url: `http://localhost:3001/api/usuario/iniciarsesion/${input.email}/${input.password}`
    }).then((r) => setInicioSesion(r.data));
  }
  useEffect(() => {
    console.log("USE EFFECT")
    if (inicioSesion === "contraseña incorrecta") {
      setError({ ...error, password: "Contraseña incorrecta" });
      swal("Contraseña incorrecta");
    } else if (inicioSesion === "usuario no encontrado") {
      setError({ ...error, usuario: "Usuario no registrado" });
      swal("El mail ingresado no es válido");
    } else if (inicioSesion === "ok") {
      dispatch(login(input.email));
      window.location.href = "/home";
    }
  }, [inicioSesion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    iniciarSesion(input);
    // setError({ usuario: "", password: "" });
    setInput({ email: "", password: "" });
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese su Email"
          value={input.email}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          placeholder="Ingrese su contraseña"
          value={input.password}
          onChange={handleChangePassword}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}
