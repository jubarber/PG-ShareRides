import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { postViajePasajero } from "../../redux/actions/actions";
import "./FormPasajero.css";
import fondo from "../../assets/fondo perfil.jpg";

export default function FormPasajero() {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(new Array(5).fill(false));
  const [errors, setErrors] = useState({});
  const [viaje, setViaje] = useState({
    fecha: "",
    hora: "",
    origen: "",
    destino: "",
    email: "",
    dni: "",
    asiento: "",
    formaDePago: "A coordinar",
  });

  const expresiones = {
    fecha: /^.{4,18}$/,
    hora: /^.{4,12}$/,
    origen: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    destino: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
    email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    asiento: /^.{1,7}$/,
  };

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
      errors.asiento = "Debes selecionar entre 1 y 7";
    } else if (!expresiones.asiento.test(viaje.asiento)) {
      errors.asiento = "Ingrese cuantos asientos ocupará";
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
      name: "Pago compartido",
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
        window.location = "/home";
      });
      dispatch(postViajePasajero(isChecked, viaje));

      setViaje({
        fecha: "",
        hora: "",
        origen: "",
        destino: "",
        email: "",
        dni: "",
        asiento: "",
        formaDePago: "A coordinar",
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-formpasajero">
          <div className="form-parte-1">
            <label className="label-formpasajero">Fecha</label>

            <input
              type="text"
              name="fecha"
              value={viaje.fecha}
              onChange={(e) => handleOnChange(e)}
              className="input-text"
            />
            {errors.fecha && (
              <span className="Registro__error">{errors.fecha}</span>
            )}

            <label className="label-formpasajero">Hora</label>

            <input
              type="text"
              name="hora"
              value={viaje.hora}
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
                      <span></span>
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
                  >
                    <MenuItem value="">Acordar</MenuItem>
                    <MenuItem value="Efecto">Efectivo</MenuItem>
                    <MenuItem value="MP">Mercado Pago</MenuItem>
                  </Select>
                </FormControl>
              )}
            </div>
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
