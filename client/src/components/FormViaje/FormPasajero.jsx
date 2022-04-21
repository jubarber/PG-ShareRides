import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  postViajePasajero,
  getViajesTotalUsuario,
} from "../../redux/actions/actions";
import "./FormPasajero.css";
import fondo from "../../assets/fondo perfil.jpg";
import NavBar from "../NavBar/NavBar";
import "./FormPasajero.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);

export default function FormPasajero() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viajesUsuario = useSelector((state) => state.viajesPorUsuario);
  const [isChecked, setIsChecked] = useState(new Array(5).fill(false));
  const [errors, setErrors] = useState({});
  const cookieMail = cookies.get("email");
  const [viaje, setViaje] = useState({
    nombre: cookies.get("nombre"),
    fecha: null,
    hora: "",
    origen: "",
    destino: "",
    email: cookieMail,
    dni: "",
    asiento: "",
    formaDePago: "A coordinar",
    detalles: "",
  });

  const expresiones = {
    // fecha: /^.{4,18}$/,
    hora: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    origen: /^[a-zA-ZÀ-ÿ\s]{4,30}$/,
    destino: /^[a-zA-ZÀ-ÿ\s]{4,30}$/,
    email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    // asiento: /^.{1,7}$/
  };

  useEffect(() => {
    dispatch(getViajesTotalUsuario(cookieMail));
  }, []);

  let viajesDisponiblesUsuario = [];
  useEffect(() => {
    if (
      viajesUsuario &&
      viajesUsuario.length !== 0 &&
      viaje &&
      viaje.fecha &&
      viaje.fecha.length !== 0
    ) {
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
      {
        viaje.length !== 0 &&
          viajesDisponiblesUsuario.map((e) =>
            e.fecha.substring(6, 10) ===
            mes + "-" + viaje.fecha.toString().substring(8, 10)
              ? fechaSi.push(e)
              : console.log("no hay nada")
          );

        // console.log(fechaSi, viaje.fecha)
        if (fechaSi.length !== 0) {
          Swal.fire({
            title: "Ya tienes un viaje programado para este día",
            icon: "warning",
            text: "No puedes programar dos viajes para el mismo día. Por favor, selecciona otra fecha.",
            confirmButtonText: "Ok",
          }) && setViaje({ ...viaje, fecha: "", hora: "" });
        }
      }
    }
  }, [viaje.fecha]);

  function validacion(viaje) {
    let errors = {};

    if (!viaje.email) {
      errors.email = "Debes completar el email";
    } else if (!expresiones.email.test(viaje.email)) {
      errors.email = "El email no es valido";
    }
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
      errors.asiento = "Ingrese cuantos asientos ocupará";
    } else if (viaje.asiento > 7 || viaje.asiento < 1) {
      errors.asiento = "Debes selecionar entre 1 y 7";
    }

    return errors;
  }
  const filtrosArray = [
    {
      id: 1,
      name: "Soy fumador",
    },
    {
      id: 2,
      name: "Llevo mascota",
    },
    {
      id: 3,
      name: "Llevo equipaje",
    },
    {
      id: 4,
      name: "Uso de barbijo",
    },
    {
      id: 5,
      name: "Puedo colaborar",
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
      !viaje.asiento ||
      !viaje.email
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
      dispatch(postViajePasajero(isChecked, viaje));
      setViaje({
        fecha: null,
        hora: "",
        origen: "",
        destino: "",
        email: "",
        dni: "",
        asiento: "",
        formaDePago: "A coordinar",
        detalles: "",
      });
    }
  }

  return (
    <div>
      <NavBar />
      <div>
        <button className="Registro__btn_volver" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="order-form">
          <div className="form-formpasajero">
            <div className="form-parte-1">
              <label className="label-formpasajero">Fecha</label>
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
                <span className="Registro__error">{errors.fecha}</span>
              )}

              <label className="label-formpasajero">Hora</label>

              <input
                type="text"
                name="hora"
                value={viaje.hora}
                placeholder="00:00 - 24:00"
                onChange={(e) => handleOnChange(e)}
                className="input-text"
              />
              {errors.hora && (
                <span className="Registro__error">{errors.hora}</span>
              )}

              <label className="label-formpasajero">Origen</label>

              <input
                type="text"
                name="origen"
                value={viaje.origen}
                onChange={(e) => handleOnChange(e)}
                className="input-text"
              />
              {errors.origen && (
                <span className="Registro__error">{errors.origen}</span>
              )}

              <label className="label-formpasajero">Destino</label>
              <input
                type="text"
                name="destino"
                value={viaje.destino}
                onChange={(e) => handleOnChange(e)}
                className="input-text"
              />
              {errors.destino && (
                <span className="Registro__error">{errors.destino}</span>
              )}

              <label className="label-formpasajero">Email</label>
              <input
                type="text"
                name="email"
                value={viaje.email}
                onChange={(e) => handleOnChange(e)}
                className="input-text"
              />
              {errors.email && (
                <span className="Registro__error">{errors.email}</span>
              )}

              <label className="label-formpasajero">Dni/Pasaporte</label>
              <input
                type="text"
                name="dni"
                value={viaje.dni}
                onChange={(e) => handleOnChange(e)}
                className="input-text"
              />
            </div>
            <div className="form-parte-2">
              <label className="label-formpasajero">Asientos a ocupar</label>
              <input
                type="number"
                name="asiento"
                placeholder="entre 1 y 7"
                value={viaje.asiento}
                onChange={(e) => handleOnChange(e)}
                className="input-text"
              />
              {errors.asiento && (
                <span className="Registro__error">{errors.asiento}</span>
              )}

              <div className="Pasajere__checkboxes">
                {filtrosArray.map((e, index) => {
                  return (
                    <div>
                      <label className="Pasajere__mycheckbox">
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
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel
                      id="demo-simple-select-standard-label"
                      sx={{ color: "white" }}
                    >
                      Medio de pago
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="formaDePago"
                      value={viaje.formaDePago}
                      onChange={(e) => handleOnChange(e)}
                    >
                      <MenuItem value="A coordinar">Acordar</MenuItem>
                      <MenuItem value="Efectivo">Efectivo</MenuItem>
                      <MenuItem value="Mercado Pago">Mercado Pago</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
          </div>
          <div className="label-detalles">
            <label className="label-formpasajero">Detalles del viaje</label>
            <textarea
              name="detalles"
              value={viaje.detalles}
              onChange={(e) => handleOnChange(e)}
              className="input-text-detalle"
            />
          </div>
        </div>
        <div className="btn-registrar-formpasajero">
          {!errors.email &&
          !errors.hora &&
          !errors.destino &&
          !errors.origen &&
          !errors.fecha &&
          !errors.asiento ? (
            <button
              type="submit"
              name="Registrar viaje"
              className="btn-formpasajero"
            >
              Registrar viaje
            </button>
          ) : (
            <button
              type="submit"
              value="Registrar viaje"
              name="Registrar viaje"
              disabled="disabled"
              className="btn-formpasajero-disable"
            >
              Registrar Viaje
            </button>
          )}
        </div>
      </form>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
