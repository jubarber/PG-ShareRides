import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { registroUsuario } from "../../redux/actions/actions";
import "./FormRegistro.css";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function FormRegistro() {
  const dispatch = useDispatch();
  const [stateContraseña, setStateContraseña] = useState(false);
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    contraseña: "",
    confirmar_contraseña: "",
    terminos: "",
  });

  const [errors, setErrors] = useState({});

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    contraseña: /^.{4,12}$/, // acepta cualquier digito - longitud de 4 a 12 digitos.
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
    if (!input.dni) {
      errors.dni = "Debes ingesar DNI/Pasaporte";
    }
    if (!input.contraseña) {
      errors.contraseña = "Debe ingresar una contraseña";
    } else if (!expresiones.contraseña.test(input.contraseña)) {
      errors.contraseña = "La contraseña debe ser de 4 a 12 digitos";
    }
    if (!input.terminos) {
      errors.terminos = "Para continuar debes aceptar los terminos de uso";
    }
    return errors;
  }

  function handleEye(e) {
    e.preventDefault();
    setStateContraseña((prevStateContraseña) => !prevStateContraseña);
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
    if (Object.keys(errors).length !== 0) {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Por favor completá todos los campos",
        icon: "warning",
        button: true,
        dangerMode: true
      });
    } else {
      dispatch(registroUsuario(input));
      swal({
        title: "El registro ha sido exitoso!",
        icon: "success",
        button: "Crea tu viaje!",
      })
      setInput({
        nombre: "",
        apellido: "",
        dni: "",
        contraseña: "",
        confirmar_contraseña: "",
        terminos: "",
      });
    }
    //history.push('/') //quiero q me envie a la seccion completar mi perfil?
  }

  return (
    <div className="font-mono">
      <div className="contenedorRegistro">
        <div>
          <Link to="/">
            <button className="Registro__btn_volver">Volver</button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="Registro__formulario">
          {/* grupo nombre */}
          <div>
            <label htmlFor="nombre" className="Registro__formulario_label">
              {" "}
              Nombre:
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
              Apellido:
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
              {errors.dni && (
                <span className="Registro__error">{errors.dni}</span>
              )}
            </div>
          </div>
          {/* grupo email*/}
          <div>
            <label htmlFor="email" className="Registro__formulario_label">
              {" "}
              E-mail:
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
            <label htmlFor="contraseña" className="Registro__formulario_label">
              Contraseña:
            </label>
            <div>
              <input
                type={stateContraseña ? "text" : "password"}
                name="contraseña"
                id="contraseña"
                value={input.contraseña}
                placeholder="Ingresar contraseña"
                onChange={handleChange}
                className="Registro__input"
              />
                <button className="Registro__ojo" onClick={handleEye}>
                  {stateContraseña ? <BsEye /> : <BsEyeSlash />}
                </button>
              {errors.contraseña && (
                <span className="Registro__error">{errors.contraseña}</span>
              )}
            </div>
          </div>
          {/* grupo confirmar contraseña*/}
          <div>
            <label htmlFor="confirmar_contraseña" className="Registro__formulario_label">
              Confirmar Contraseña:
            </label>
            <div>
              <input
                type={stateContraseña ? "text" : "password"}
                name="confirmar_contraseña"
                id="confirmar_contraseña"
                value={input.nueva_contraseña}
                placeholder="Confirmar contraseña"
                onChange={handleChange}
                className="Registro__input"
              />
              <button className="Registro__ojo" onClick={handleEye}>
                {stateContraseña ? <BsEye /> : <BsEyeSlash />}
              </button>
              {input.contraseña === input.nueva_contraseña ? (
                ""
              ) : (
                <p className="Registro__error">No coincide con su contraseña</p>
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
              <span className="registro__error">{errors.terminos}</span>
            )}
          </div>
          <div className="grupo_btn">
            {!errors.nombre &&
            !errors.apellido &&
            !errors.dni &&
            !errors.contraseña &&
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
    </div>
  );
}
