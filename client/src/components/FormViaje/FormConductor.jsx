import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { postViajeConductor } from "../../redux/actions/actions";
import fondo from "../../assets/fondo perfil.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./FormConductor.css";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

export default function FormPasajero() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(new Array(5).fill(false));
  const [errors, setErrors] = useState({});
  const cookieMail = cookies.get("email");
  const [viaje, setViaje] = useState({
    nombre: cookies.get("nombre"),
    fecha: "",
    hora: "",
    origen: "",
    destino: "",
    dni: cookies.get("dni"),
    asiento: "",
    formaDePago: "",
    email: cookieMail,
    detalles: "",
  });
  const expresiones = {
    fecha: /^.{4,18}$/,
    hora: /^.{4,12}$/,
    asiento: /^.{1,7}$/,
    origen: /^[a-zA-ZÀ-ÿ\s]{4,30}$/,
    destino: /^[a-zA-ZÀ-ÿ\s]{4,30}$/,
    dni: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
  };

  function validacion(viaje) {
    let errors = {};

    if (!viaje.hora) {
      errors.hora = "Debes ingresar la hora del viaje";
    } else if (!expresiones.hora.test(viaje.hora)) {
      errors.hora = "Ingresa una hora valida";
    }
    if (!viaje.fecha) {
      errors.fecha = "Debes ingresar la fecha del viaje";
    } else if (!expresiones.fecha.test(viaje.fecha)) {
      errors.fecha = "Ingresa una fecha valida";
    }
    if (!viaje.origen) {
      errors.origen = "Debes ingresar el origen del viaje";
    } else if (!expresiones.origen.test(viaje.origen)) {
      errors.origen = "Ingrese un origen valido";
    }
    if (!viaje.destino) {
      errors.destino = "Debes ingresar el destino del viaje";
    } else if (!expresiones.destino.test(viaje.destino)) {
      errors.destino = "Ingrese un destino valido";
    }
    if (!viaje.asiento) {
      errors.asiento = "Debes ingresar la fecha del viaje";
    } else if (!expresiones.asiento.test(viaje.asiento)) {
      errors.asiento = "Ingresa una fecha valida";
    }
    return errors;
  }
  const filtrosArray = [
    {
      id: 1,
      name: "Acepto fumador",
    },
    {
      id: 2,
      name: "Acepto mascota",
    },
    {
      id: 3,
      name: "Acepto equipaje",
    },
    {
      id: 4,
      name: "Uso de barbijo",
    },
    {
      id: 5,
      name: "Quiero compartir gastos",
    },
  ];

  function handleOnChange(e) {
    e.preventDefault();
    console.log(viaje);
    setViaje({
      ...viaje,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validacion({
        ...viaje,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleCheckBox = (position) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !viaje.fecha ||
      !viaje.hora ||
      !viaje.origen ||
      !viaje.destino ||
      !viaje.asiento
    ) {
      e.preventDefault();
      swal({
        title: "Alto!",
        text: "Por favor completá todos los campos",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    } else {
      swal({
        title: "El registro ha sido exitoso!",
        icon: "success",
        button: "Buen viaje!",
      }).then(function () {
        navigate("/home");
      });
      dispatch(postViajeConductor(isChecked, viaje));

      setViaje({
        fecha: "",
        hora: "",
        origen: "",
        destino: "",
        dni: "",
        asiento: "",
        formaDePago: "A charlar",
        email: "",
        detalles: "",
      });
    }
  }
  console.log("esto llega a viaje", viaje);
  return (
    <div>
      <NavBar />
      <div className="Conductore__nav">
        <Link to="/formvehiculo">
          <button className="Conductore__btn_volver">Volver</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="order-form">
          <div className="Conductore__form">
            <div className="Conductore__input_1">
              <label className="Conductore__formulario_label">Fecha</label>
              <input
                className="Conductore__input"
                type="text"
                name="fecha"
                value={viaje.fecha}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.fecha && (
                <span className="Conductore__error">{errors.fecha}</span>
              )}

              <label className="Conductore__formulario_label">Hora</label>
              <input
                className="Conductore__input"
                type="text"
                name="hora"
                value={viaje.hora}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.hora && (
                <span className="Conductore__error">{errors.hora}</span>
              )}

              <label className="Conductore__formulario_label">Origen</label>
              <input
                className="Conductore__input"
                type="text"
                name="origen"
                value={viaje.origen}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.origen && (
                <span className="Conductore__error">{errors.origen}</span>
              )}

              <label className="Conductore__formulario_label">Destino</label>
              <input
                className="Conductore__input"
                type="text"
                name="destino"
                value={viaje.destino}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.destino && (
                <span className="Conductore__error">{errors.destino}</span>
              )}

              <label className="Conductore__formulario_label">
                Dni/Pasaporte
              </label>
              <input
                className="Conductore__input"
                type="text"
                name="dni"
                value={viaje.dni}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="Conductore__input_2">
              <div>
                <label className="Conductore__formulario_label">
                  Asientos disponibles
                </label>
                <input
                  className="Conductore__input"
                  type="number"
                  name="asiento"
                  placeholder="entre 1 y 7"
                  value={viaje.asiento}
                  onChange={(e) => handleOnChange(e)}
                />
                {errors.asiento && (
                  <span className="Conductore__error">{errors.asiento}</span>
                )}
              </div>

              {filtrosArray.map((e, index) => {
                return (
                  <div>
                    <label className="Conductore__mycheckbox">
                      {e.name}
                      <input
                        type="checkbox"
                        key={e.id}
                        name={e.name}
                        value={e.name}
                        checked={isChecked[index]}
                        onChange={() => {
                          handleCheckBox(index);
                        }}
                      />
                      <span></span>
                    </label>
                  </div>
                );
              })}
              {isChecked[4] && (
                <select
                  name="formaDePago"
                  value={viaje.formaDePago}
                  onChange={(e) => handleOnChange(e)}
                >
                  <option value="Efectivo">Efectivo</option>
                  <option value="Mercado Pago">Mercado Pago</option>
                </select>
              )}
            </div>
          </div>

          <div className="label-detalles">
            <label className="Conductore__formulario_label">
              Detalles del viaje
            </label>
            <textarea
              type="text"
              name="detalles"
              value={viaje.detalles}
              onChange={(e) => handleOnChange(e)}
              className="input-text-detalle"
            />
          </div>
        </div>
        <div className="Conductore_btn">
          {!errors.hora &&
          !errors.destino &&
          !errors.origen &&
          !errors.fecha &&
          !errors.asiento ? (
            <input
              type="submit"
              value="Registrar viaje"
              name="Registrar viaje"
              className="Conductore__btn_registro"
            />
          ) : (
            <input
              type="submit"
              value="Registrar viaje"
              name="Registrar viaje"
              disabled="disabled"
              className="Conductore__disabled"
            />
          )}
        </div>
      </form>

      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
