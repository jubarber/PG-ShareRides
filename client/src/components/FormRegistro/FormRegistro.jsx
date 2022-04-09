import React, { useState } from "react";
import fondo from "../../assets/fondo perfil.jpg";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { registroUsuario } from "../../redux/actions/actions";
import "./FormRegistro.css";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import NavBarSinLogin from "../NavBar/NavBarSinLogin";
import Cookies from "universal-cookie";

export default function FormRegistro() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statePassword, setStatePassword] = useState(false);
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    password: "",
    nuevo_password: "",
    terminos: "",
  });

  const [errors, setErrors] = useState({});

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    password: /^.{4,12}$/, // acepta cualquier digito - longitud de 4 a 12 digitos.
    /* dni: /^\d{7,8}\s/, */
    email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
  };

  function validacion(input) {
    let errors = {};

    if (!input.email) {
      errors.email = "Debes completar el email";
    } else if (!expresiones.email.test(input.email)) {
      errors.email = "El email no es valido";
    }
    if (!input.nombre) {
      errors.nombre = "Debes ingresar un nombre";
    } else if (!expresiones.nombre.test(input.nombre)) {
      errors.nombre = "Ingresa un nombre valido";
    }
    if (!input.apellido) {
      errors.apellido = "Debes ingresar un apellido";
    } else if (!expresiones.apellido.test(input.apellido)) {
      errors.apellido = "Ingrese un apellido valido";
    }
    if (!input.password) {
      errors.password = "Debe ingresar una contraseña";
    } else if (!expresiones.password.test(input.password)) {
      errors.password = "La contraseña debe ser de 4 a 12 digitos";
    }
    if (!input.terminos) {
      errors.terminos = "Para continuar debes aceptar los terminos de uso";
    }
    return errors;
  }

  function handleEye(e) {
    e.preventDefault();
    setStatePassword((prevStatePassword) => !prevStatePassword);
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validacion({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleConfirmar(e) {
    e.preventDefault();
    swal(
      "En este documento se describen los Términos y Condiciones generales aplicables al uso de los servicios ofrecidos por ShareRide® mediante www.shareRide.com.ar/app. Cualquier persona  que desee usar o utilizar shareRide® podrá hacerlo sujetándose a los Términos y Condiciones respectivos, junto con todas las demás políticas y principios"
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        terminos: e.target.value,
      });
      setErrors(
        validacion({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validacion({ ...input, [e.target.value]: e.target.name }));
    const err = validacion(input);
    if (Object.values(err).length !== 0) {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Por favor completá todos los campos",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else {
        cookies.set("dni", input.dni, { path: "/" });
        cookies.set("email", input.email, { path: "/" });
        cookies.set("nombre", input.nombre, { path: "/" });
        cookies.set("apellido", input.apellido, { path: "/" });
        console.log("COOKIES REGISTRO ", cookies.get("nombre"));
      dispatch(registroUsuario(input));
     let cookieNombre = cookies.get("nombre");
      swal({
        title: "El registro ha sido exitoso!",
        text: `Gracias por registrarte! Bienvenide ${cookieNombre}`,
        icon: "success",
        button: "Ingresar",
      }).then(function () {
        navigate("/home");
      });
      setInput({
        nombre: "",
        apellido: "",
        dni: "",
        password: "",
        nuevo_password: "",
        terminos: "",
      });
    }
    //history.push('/') //quiero q me envie a la seccion completar mi perfil?
  }

  return (
    <div>
      <NavBarSinLogin />
      <div className="contenedorRegistro">
        <div>
          <Link to="/">
            <button className="Registro__btn_volver">Volver</button>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="Registro__formulario">
            {/* grupo nombre */}
            <div>
              <label htmlFor="nombre" className="Registro__formulario_label">
                {" "}
                * Nombre:
              </label>
              <div>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={input.nombre}
                  placeholder="Ingrese su nombre"
                  onChange={handleChange}
                  className="Registro__input"
                />
                {errors.nombre && (
                  <span className="Registro__error">{errors.nombre}</span>
                )}
              </div>
            </div>

            {/* apellido */}
            <div>
              <label htmlFor="apellido" className="Registro__formulario_label">
                * Apellido:
              </label>
              <div>
                <input
                  type="text"
                  name="apellido"
                  id="apellido"
                  value={input.apellido}
                  placeholder="Ingrese su apellido"
                  onChange={handleChange}
                  className="Registro__input"
                />
                {errors.apellido && (
                  <span className="Registro__error">{errors.apellido}</span>
                )}
              </div>
            </div>
            {/* grupo dni*/}
            <div>
              <label htmlFor="dni" className="Registro__formulario_label">
                {" "}
                DNI/Pasaporte:
              </label>
              <div>
                <input
                  type="string"
                  name="dni"
                  id="dni"
                  value={input.dni}
                  placeholder="Ingrese su identificación"
                  onChange={handleChange}
                  className="Registro__input"
                />
              </div>
            </div>
            {/* grupo email*/}
            <div>
              <label htmlFor="email" className="Registro__formulario_label">
                {" "}
                * E-mail:
              </label>
              <div>
                <input
                  type="string"
                  name="email"
                  id="email"
                  value={input.email}
                  placeholder="Ej: hola@hola.com"
                  onChange={handleChange}
                  className="Registro__input"
                />
                {errors.email && (
                  <span className="Registro__error">{errors.email}</span>
                )}
              </div>
            </div>
            {/* grupo  contraseña */}
            <div>
              <label
                htmlFor="contraseña"
                className="Registro__formulario_label"
              >
                * Contraseña:
              </label>
              <div>
                <input
                  type={statePassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={input.contraseña}
                  placeholder="Ingresar contraseña"
                  onChange={handleChange}
                  className="Registro__input"
                />
                <button className="Registro__ojo" onClick={handleEye}>
                  {statePassword ? <BsEye /> : <BsEyeSlash />}
                </button>
                {errors.password && (
                  <span className="Registro__error">{errors.password}</span>
                )}
              </div>
            </div>
            {/* grupo confirmar contraseña*/}
            <div>
              <label
                htmlFor="confirmar_contraseña"
                className="Registro__formulario_label"
              >
                * Confirmar Contraseña:
              </label>
              <div>
                <input
                  type={statePassword ? "text" : "password"}
                  name="nuevo_password"
                  id="nuevo_password"
                  value={input.nueva_contraseña}
                  placeholder="Confirmar contraseña"
                  onChange={handleChange}
                  className="Registro__input"
                />
                <button className="Registro__ojo" onClick={handleEye}>
                  {statePassword ? <BsEye /> : <BsEyeSlash />}
                </button>
                {input.password === input.nuevo_password ? (
                  ""
                ) : (
                  <p className="Registro__error">
                    No coincide con su contraseña
                  </p>
                )}
              </div>
            </div>
            {/* grupo terminos y condiciones */}
            <div className="grupo_terminos">
              <label className="Registro__formulario_label">
                <input
                  type="checkbox"
                  name="terminos"
                  className="Registro__checkbox"
                  onChange={handleCheck}
                />
                Acepto los terminos y condiciones.
                {/* <a href="#terminosYCondiciones">ver</a> */}
                <p onClick={handleConfirmar}>Ver mas</p>
              </label>
              {errors.terminos && (
                <span className="Registro__error">{errors.terminos}</span>
              )}
            </div>
          </div>
          <div className="grupo_btn">
            {!errors.nombre &&
            !errors.apellido &&
            !errors.password &&
            !errors.terminos ? (
              <button type="submit" className="Registro__btn_registro">
                Registrarme
              </button>
            ) : (
              <button type="submit" disabled className="Registro__disabled">
                Registrarme
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
