import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postViajeConductor,
  getViajesTotalUsuario,
} from "../../redux/actions/actions";
import fondo from "../../assets/fondo perfil.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./FormConductor.css";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import es from "date-fns/locale/es";
registerLocale("es", es);

export default function FormPasajero() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(new Array(5).fill(false));
  const [errors, setErrors] = useState({});
  const viajesUsuario = useSelector((state) => state.viajesPorUsuario);
  const cookieMail = cookies.get("email");
  const cookiePatente = cookies.get("patente");
  console.log(cookiePatente);
  const [viaje, setViaje] = useState({
    nombre: cookies.get("nombre"),
    fecha: "",
    hora: "",
    origen: "",
    destino: "",
    dni: cookies.get("dni"),
    asiento: "",
    formaDePago: "A coordinar",
    email: cookieMail,
    detalles: "",
    patente: cookiePatente,
    telefono:""
  });
  const expresiones = {
    // fecha: /^.{4,18}$/,
    hora: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    asiento: /^.{1,7}$/,
    origen: /^[a-zA-ZÀ-ÿ\s]{4,30}$/,
    destino: /^[a-zA-ZÀ-ÿ\s]{4,30}$/,
    dni: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
  };
  useEffect(() => {
    dispatch(getViajesTotalUsuario(cookieMail));
  }, []);

  let viajesDisponiblesUsuario = [];

  useEffect(() => {
    if (viajesUsuario.length !== 0) {
      viajesUsuario.map((e) => {
        e.viajeDisponible === true && viajesDisponiblesUsuario.push(e);
      });
      let mes;
      switch (viaje.length !== 0 && viaje.fecha.toString().substring(4, 7)) {
        case "Jan":
          mes = 1;
          break;
        case "Feb":
          mes = 2;
          break;
        case "Mar":
          mes = 3;
          break;
        case "Apr":
          mes = 4;
          break;
        case "May":
          mes = 5;
          break;
        case "Jun":
          mes = 6;
          break;
        case "Jul":
          mes = 7;
          break;
        case "Aug":
          mes = 8;
          break;
        case "Sep":
          mes = 9;
          break;
        case "Oct":
          mes = 10;
          break;
        case "Nov":
          mes = 11;
          break;
        case "Dec":
          mes = 12;
          break;
        default:
          break;
      }

      let fechaSi = [];
      viaje.length !== 0 &&
        viajesDisponiblesUsuario.map((e) =>
          e.fecha.substring(6, 10) ===
          mes + "-" + viaje.fecha.toString().substring(8, 10)
            ? fechaSi.push(e)
            : console.log("no hay nada")
        );
      if (fechaSi.length !== 0) {
        Swal.fire({
          title: "Ya tienes un viaje programado para este día",
          icon: "warning",
          text: "No puedes programar dos viajes para el mismo día. Por favor, selecciona otra fecha.",
          confirmButtonText: "Ok",
        }) && setViaje({ ...viaje, fecha: "", hora: "" });
      }
    }
  }, [viaje.fecha]);

  function validacion(viaje) {
    let errors = {};

    if (!viaje.hora) {
      errors.hora = "Debes ingresar la hora del viaje";
    } else if (!expresiones.hora.test(viaje.hora)) {
      errors.hora = "Ingresa una hora valida";
    }
    if (!viaje.fecha) {
      errors.fecha = "Debes ingresar la fecha del viaje";
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
      errors.asiento = "Ingresá cuantos asientos tenés libres";
    } else if (viaje.asiento > 7 || viaje.asiento < 1) {
      errors.asiento = "Debes selecionar entre 1 y 7";
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
      Swal.fire({
        title: "Alto!",
        text: "Por favor completá todos los campos",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "El registro ha sido exitoso!",
        icon: "success",
        confirmButtonText: "Buen viaje!",
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
        formaDePago: "A coordinar",
        email: "",
        detalles: "",
        telefono:""
      });
    }
  }

  return (
    <div>
      <NavBar />
      <div className="Conductore__nav">
        <button className="Registro__btn_volver" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="order-form">
          <div className="Conductore__form">
            <div className="Conductore__input_1">
              <label className="Conductore__formulario_label">Fecha</label>
              <DatePicker
                className="input-text"
                locale="es"
                dateFormat="dd-MM-yyyy"
                selected={viaje.fecha}
                minDate={new Date()}
                onChange={(nuevaFecha) =>
                  setViaje({
                    ...viaje,
                    fecha: nuevaFecha,
                  })
                }
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
                placeholder="00:00 - 24:00"
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
               <label className="Conductore__formulario_label">
               Numero de telefono
              </label>
              <input
                className="Conductore__input"
                type="text"
                name="telefono"
                value={viaje.telefono}
                onChange={e => handleOnChange(e)}
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
                      <span />
                    </label>
                  </div>
                );
              })}
              {isChecked[4] && (
                <select
                  className="select-formaDePago"
                  name="formaDePago"
                  value={viaje.formaDePago}
                  onChange={(e) => handleOnChange(e)}
                >
                  <option value="A coordinar">Acordar</option>
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
