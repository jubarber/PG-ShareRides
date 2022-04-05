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
      alert("Por favor, completa todos los campos solicitados");
    } else {
      alert("Registro exitoso");
      window.location.href = "/home";
      dispatch(postViajePasajero(isChecked, viaje));

      setViaje({
        fecha: "",
        hora: "",
        origen: "",
        destino: "",
        email: "",
        dni: "",
        asiento: "",
      });
      
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>Fecha</span>

        <input
          type="text"
          name="fecha"
          value={viaje.fecha}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.fecha && <span>{errors.fecha}</span>}

        <br></br>
        <span>Hora</span>

        <input
          type="text"
          name="hora"
          value={viaje.hora}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.hora && <span>{errors.hora}</span>}
        <br></br>
        <span>Origen</span>

        <input
          type="text"
          name="origen"
          value={viaje.origen}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.origen && <span>{errors.origen}</span>}
        <br></br>

        <span>Destino</span>
        <input
          type="text"
          name="destino"
          value={viaje.destino}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.destino && <span>{errors.destino}</span>}
        <br></br>
        <span>Email</span>
        <input
          type="text"
          name="email"
          value={viaje.email}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.email && <span>{errors.email}</span>}
        <br></br>
        <span>Dni/Pasaporte</span>
        <input
          type="text"
          name="dni"
          value={viaje.dni}
          onChange={(e) => handleOnChange(e)}
        />

        <br></br>
        <span>Asientos a ocupar</span>
        <input
          type="number"
          name="asiento"
          placeholder="entre 1 y 7"
          value={viaje.asiento}
          onChange={(e) => handleOnChange(e)}
        />
        {errors.asiento && <span>{errors.asiento}</span>}

        <div>
          {filtrosArray.map((e, index) => {
            return (
              <div>
                <label>{e.name}</label>
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
              </div>
            );
          })}

          {isChecked[4] && (
            <select>
              <option value="Efecto">Efectivo</option>
              <option value="MP">Mercado Pago</option>
            </select>
          )}
        </div>

        {!errors.email &&
        !errors.hora &&
        !errors.destino &&
        !errors.origen &&
        !errors.fecha &&
        !errors.asiento ? (
          <input
            type="submit"
            value="Registrar viaje"
            name="Registrar viaje"
            className="btn_registro"
          />
        ) : (
          <input
            type="submit"
            value="Registrar viaje"
            name="Registrar viaje"
            disabled="disabled"
            className="disabled"
          />
        )}
      </form>
    </div>
  );
}
