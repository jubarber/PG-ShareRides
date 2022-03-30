import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registroUsuario } from "../../redux/actions/actions";
import "./FormRegistro.css"


export default function FormRegistro() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    contraseña: "",
    contraseña2: "",
    terminos: ""
  });

  const [errors, setErrors] = useState({});

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    apellido:/^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    contraseña: /^.{4,12}$/, // acepta cualquier digito - longitud de 4 a 12 digitos.
    /* dni: /^\d{7,8}\s/, */
  };

  function validacion(input) {
    let errors = {};

    if (!input.nombre) {
      errors.nombre = "debes ingresar tu nombre";
    } else if (!expresiones.nombre.test(input.nombre)) {
      errors.nombre = "ingresa un nombre valido";
    }
    if (!input.apellido) {
     errors.apellido = "Debes ingresar tu apellido";
    } else if (!expresiones.apellido.test(input.apellido)) {
        errors.apellido = "ingrese un apellido valido";
    }
    if (!input.dni) {
      errors.dni = " Dede ingesar su DNI/Pasaporte";
    } 
    if (!input.contraseña) {
      errors.contraseña = "Debe ingresar una contraseña";
    } else if (!expresiones.contraseña.test(input.contraseña)) {
      errors.contraseña = "La contraseña debe ser de 4 a 12 digitos";
    }
    if (!input.terminos) {
      errors.terminos = "Para avanzar debes aceptar los terminos de uso";
    }
    return errors;
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
    alert(
      "En este documento se describen los Términos y Condiciones generales aplicables al uso de los servicios ofrecidos por ShareRide® mediante www.shareRide.com.ar/app. Cualquier persona  que desee usar o utilizar shareRide® podrá hacerlo sujetándose a los Términos y Condiciones respectivos, junto con todas las demás políticas y principios"
    );
  }
  
  function handleCheck(e){
      e.preventDefault()
      if(e.target.checked){
        setInput({
            ...input,
            terminos: e.target.value
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
      alert("Por favor, completa todos los campos solicitados");
    } else {
      dispatch(registroUsuario(input));
      alert("ya estas registrado");
      setInput({
        nombre: "",
        apellido:"",
        dni: "",
        contraseña: "",
        contraseña2: "",
        terminos: ""

      });
    }
    //history.push('/') //quiero q me envie a la seccion completar mi perfil?
  }

  return (
    <div className="font-mono">
    <div className="contenedorRegistro" >
      
      <h1>Registrarse</h1>

      <form onSubmit={handleSubmit} className="formularioRegistro" >
        {/* grupo nombre */}
        <div className="grupo">
          <label htmlFor="nombre" className="formulario_label"> Nombre:</label>
          <div className="grupo_input">
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={input.nombre}
              placeholder="Nombre"
              onChange={handleChange}
              className="input_Registro"
            />
            {errors.nombre && (<span className="error_registro">{errors.nombre}</span>)}
          </div>
        </div>

        {/* apellido */}
        <div>
          <label htmlFor="apellido" className="formulario_label">Apellido:</label>
          <div className="grupo_input">
            <input
              type="text"
              name="apellido"
              id="apellido"
              value={input.apellido}
              placeholder="Apellido"
              onChange={handleChange}
              className="input_Registro"
            />
            {errors.apellido && (<span className="error_registro">{errors.apellido}</span>)}
          </div>
        </div>
        {/* grupo dni*/}
        <div>
          <label htmlFor="dni" className="formulario_label"> DNI/PASAPORTE:</label>
          <div className="grupo_input">
            <input
              type="number"
              name="dni"
              id="dni"
              value={input.dni}
              placeholder="numero de documento"
              onChange={handleChange}
              className="input_Registro"
            />
            {errors.dni && <span className="error_registro">{errors.dni}</span>}
          </div>
        </div>
        {/* grupo  contraseña */}
        <div>
          <label htmlFor="contraseña" className="formulario_label">Contraseña:</label>
          <div className="grupo_input">
            <input
              type="password"
              name="contraseña"
              id="contraseña"
              value={input.contraseña}
              placeholder="ingresar contraseña"
              onChange={handleChange}
              className="input_Registro"
            />
            {errors.contraseña && (<span className="error_registro">{errors.contraseña}</span>)}
          </div>
        </div>
        {/* grupo confirmar contraseña*/}
        <div>
          <label htmlFor="contraseña2" className="formulario_label">Confirmar Contraseña:</label>
          <div className="grupo_input">
            <input
              type="password"
              name="contraseña2"
              id="contraseña2"
              value={input.contraseña2}
              placeholder="confirmar contraseña"
              onChange={handleChange}
              className="input_Registro"
            />
            {input.contraseña === input.contraseña2? "" : 
            <p className="error_registro">No coincide con su contraseña</p>
            }
          </div>
        </div>
        {/* grupo terminos y condiciones */}
        <div className="grupo_terminos">
          <label className="formulario_label">
            <input type="checkbox"  name="terminos" className="checkbox_registro" onChange={handleCheck}/>
            Acepto los terminos y condiciones.
            {/* <a href="#terminosYCondiciones">ver</a> */}
            <p onClick={handleConfirmar}>ver mas</p>
          </label>
          {errors.terminos && (<span>{errors.terminos}</span>)}
        </div>
        <div className="grupo_btn">
          <button type="submit" className="btn_registro">Registrarme</button>
        </div>
      </form>
    </div>
    </div>
  );
}
