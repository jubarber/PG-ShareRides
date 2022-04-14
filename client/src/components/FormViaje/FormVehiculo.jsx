import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { postVehiculo } from "../../redux/actions/actions";
import fondo from "../../assets/fondo perfil.jpg";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./FormVehiculo.css";
import Cookies from "universal-cookie"

export default function FormVehiculo() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auto, setAuto] = useState({
    patente: "",
    marca: "",
    modelo: "",
    dni: "",
    email: cookies.get("email"),
  });
  const [errors, setErrors] = useState({});

  const expresiones = {
    patente: /^.{4,12}$/,
    marca: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    modelo: /^[0-9]*$/,
    email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    dni: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
  };

  function validacion(auto) {
    let errors = {};

    if (!auto.email) {
      errors.email = "Debes completar el email";
    } else if (!expresiones.email.test(auto.email)) {
      errors.email = "El email no es valido";
    }
    if (!auto.marca) {
      errors.marca = "Debes ingresar la marca";
    } else if (!expresiones.marca.test(auto.marca)) {
      errors.marca = "Ingresa una marca valida";
    }
    if (!auto.modelo) {
      errors.modelo = "Debes ingresar el modelo del vehiculo";
    } else if (!expresiones.modelo.test(auto.modelo)) {
      errors.modelo = "Ingrese un modelo valido";
    }
    if (!auto.dni) {
      errors.dni = "Debes ingesar DNI/Pasaporte";
    }
    if (!auto.patente) {
      errors.patente = "Debe ingresar la patente del vehiculo";
    } else if (!expresiones.patente.test(auto.patente)) {
      errors.patente = "Ingresar una patente válida";
    }

    return errors;
  }

  function handleOnChange(e) {
    setAuto({
      ...auto,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validacion({
        ...auto,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!auto.patente) {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Por favor completá todos los campos",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else if (Object.keys(errors).length !== 0) {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Por favor completá todos los campos",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    } else {
      // swal("Registro exitoso");
      dispatch(postVehiculo(auto));
      swal({
        title: "El registro ha sido exitoso!",
        icon: "success",
        button: "Crea tu viaje!",
      })
      .then(cookies.set("dni", auto.dni, { path: "/" }))
      .then(function () {
        navigate("/formconductor");
      });
      setAuto({
        patente: "",
        marca: "",
        modelo: "",
        dni: "",
        email: "",
      });
    }
    //history.push('/') //quiero q me envie a la seccion completar mi perfil?
  }

  return (
    <div>
      <NavBar />
      <div className="Vehiculo__nav">
        <Link to="/formviaje">
          <button className="Vehiculo__btn_volver">Volver</button>
        </Link>
      </div>
      <div>
        <h1 className="Vehiculo__titulo">Registrá tu vehículo</h1>
        <form className="Vehiculo__formulario" onSubmit={handleSubmit}>
          <div className="Vehiculo__grupo_input">
            <div>
              <label className="Vehiculo__formulario_label">Patente</label>
              <input
                className="Vehiculo__input"
                type="text"
                name="patente"
                value={auto.patente}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.patente && (
                <span className="Vehiculo__error">{errors.patente}</span>
              )}
            </div>
            <div>
              <label className="Vehiculo__formulario_label">Marca</label>
              <input
                className="Vehiculo__input"
                type="text"
                name="marca"
                value={auto.marca}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.marca && (
                <span className="Vehiculo__error">{errors.marca}</span>
              )}
            </div>
            <div>
              <label className="Vehiculo__formulario_label">Modelo (año)</label>
              <input
                className="Vehiculo__input"
                type="text"
                name="modelo"
                value={auto.modelo}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.modelo && (
                <span className="Vehiculo__error">{errors.modelo}</span>
              )}
            </div>
            <div>
              <label className="Vehiculo__formulario_label">
                DNI/Pasaporte conductore
              </label>
              <input
                className="Vehiculo__input"
                type="text"
                name="dni"
                value={auto.dni}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.dni && (
                <span className="Vehiculo__error">{errors.dni}</span>
              )}
            </div>
            <div>
              <label className="Vehiculo__formulario_label">
                Email conductore
              </label>
              <input
                className="Vehiculo__input"
                type="text"
                name="email"
                value={auto.email}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.email && (
                <span className="Vehiculo__error">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="Vehiculo__grupo_btn">
            {!errors.email &&
            !errors.marca &&
            !errors.dni &&
            !errors.modelo &&
            !errors.patente ? (
              <button type="submit" className="Vehiculo__btn_registro">
                Registrar vehículo
              </button>
            ) : (
              <button type="submit" disabled className="Vehiculo__disabled">
                Registrar vehículo
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
