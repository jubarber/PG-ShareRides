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
    <div className="contenedorRegistro">
      
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
            />
            {errors.nombre && (<span>{errors.nombre}</span>)}
          </div>
        </div>

        {/* apellido */}
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <div>
            <input
              type="text"
              name="apellido"
              id="apellido"
              value={input.apellido}
              placeholder="Apellido"
              onChange={handleChange}
            />
            {errors.apellido && (<span>{errors.apellido}</span>)}
          </div>
        </div>
        {/* grupo dni*/}
        <div>
          <label htmlFor="dni"> DNI/PASAPORTE:</label>
          <div>
            <input
              type="number"
              name="dni"
              id="dni"
              value={input.dni}
              placeholder="numero de documento"
              onChange={handleChange}
            />
            {errors.dni && <span>{errors.dni}</span>}
          </div>
        </div>
        {/* grupo  contraseña */}
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <div>
            <input
              type="password"
              name="contraseña"
              id="contraseña"
              value={input.contraseña}
              placeholder="ingresar contraseña"
              onChange={handleChange}
            />
            {errors.contraseña && (<span>{errors.contraseña}</span>)}
          </div>
        </div>
        {/* grupo confirmar contraseña*/}
        <div>
          <label htmlFor="contraseña2">Confirmar Contraseña:</label>
          <div>
            <input
              type="password"
              name="contraseña2"
              id="contraseña2"
              value={input.contraseña2}
              placeholder="confirmar contraseña"
              onChange={handleChange}
            />
            {input.contraseña === input.contraseña2? "" : 
            <p>No coincide con su contraseña</p>
            }
          </div>
        </div>
        {/* grupo terminos y condiciones */}
        <div>
          <label>
            <input type="checkbox"  name="terminos" onChange={handleCheck}/>
            Acepto los terminos y condiciones.
            {/* <a href="#terminosYCondiciones">ver</a> */}
            <p onClick={handleConfirmar}>ver mas</p>
          </label>
          {errors.terminos && (<span>{errors.terminos}</span>)}
        </div>
        <div>
          <button type="submit">Registrarme</button>
        </div>
      </form>
    </div>
  );
}
