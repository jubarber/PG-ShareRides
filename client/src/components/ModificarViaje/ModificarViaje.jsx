import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import {
  modificarViaje,
  getViajesTotalUsuario
} from "../../redux/actions/actions";
import fondo from "../../assets/fondo perfil.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./ModificarViaje.css";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import es from "date-fns/locale/es";
registerLocale("es", es);
require("moment/locale/es.js");
  
export default function ModificarViaje() {
  moment().format("dd mm yyyy");
  const { id } = useParams()
  console.log(id)
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState([
    cookies.get("aceptaFumador"),
    cookies.get("aceptaMascota"),
    cookies.get("aceptaEquipaje"),
    cookies.get("usaBarbijo")
  ]);
  const [errors, setErrors] = useState({});
  const viajesUsuario = useSelector(state => state.viajesPorUsuario);
  const cookieMail = cookies.get("email");
  const cookiePatente = cookies.get("patente");
  const cookieFecha = cookies.get("fecha").substring(0, 10).split("-").reverse().join("-");
  const fechaViaje = ""
  const [viaje, setViaje] = useState({
    nombre: cookies.get("nombre"),
    fecha: new Date(cookies.get("fecha")),
    hora: cookies.get("hora"),
    origen: cookies.get("origen"),
    destino: cookies.get("destino"),
    dni: cookies.get("dni"),
    asiento: cookies.get("asientos"),
    email: cookieMail,
    detalles: cookies.get("detalles"),
    patente: cookiePatente
  });

  const expresiones = {
    hora: /^.{4,12}$/,
    asiento: /^.{1,7}$/,
    origen: /^[a-zA-ZÀ-ÿ\s]{4,30}$/,
    destino: /^[a-zA-ZÀ-ÿ\s]{4,30}$/,
    dni: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/
  };

  useEffect(() => {
    dispatch(getViajesTotalUsuario(cookieMail));
  }, []);

  let viajesDisponiblesUsuario = [];

  useEffect(
    () => {
      if (viajesUsuario.length !== 0) {
        viajesUsuario.map(e => {
          e.viajeDisponible === true && viajesDisponiblesUsuario.push(e);
        });
        let mes;
        switch (viaje?.fecha?.toString().substring(4, 7)) {
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
          viajesDisponiblesUsuario.map(
            e =>{
              e.fecha.includes(" ") ?
              (e.fecha.substring(4, 7) ===
              mes + "-" + viaje.fecha.toString().substring(8, 15)
                ? fechaSi.push(e.fecha)
                : console.log("no hay nada")) : fechaSi.push(e.fecha.substring(0, 10).split("-").reverse().join("-"))}
          );
          
          var fechasExcluidas = fechaSi.filter(f => f !== cookieFecha)
          if (fechasExcluidas.length !== 0) {
            if (fechasExcluidas[0].toString().substring(0,5) === viaje?.fecha.toString().substring(8,10)+ "-" + "0"+mes) {
          Swal.fire({
            title: "Ya tienes un viaje programado para este día",
            icon: "warning",
            text:
              "No puedes programar dos viajes para el mismo día. Por favor, selecciona otra fecha.",
            confirmButtonText: "Ok"
          }) && setViaje({ ...viaje, fecha: ""});
        }
        }
      }
    },
    [viaje.fecha]
  );

  function validacion(viaje) {
    let errors = {};

    if (!expresiones.hora.test(viaje.hora)) {
      errors.hora = "Ingresa una hora valida";
    }
    if (!expresiones.origen.test(viaje.origen)) {
      errors.origen = "Ingrese un origen valido";
    }
    if (!expresiones.destino.test(viaje.destino)) {
      errors.destino = "Ingrese un destino valido";
    }
    if (viaje.asiento > 7 || viaje.asiento < 1) {
      errors.asiento = "Debes selecionar entre 1 y 7";
    }
    return errors;
  }

  const filtrosArray = [
    {
      id: 1,
      name: "Acepto/soy fumador"
    },
    {
      id: 2,
      name: "Acepto/llevo mascota"
    },
    {
      id: 3,
      name: "Acepto/llevo equipaje"
    },
    {
      id: 4,
      name: "Uso de barbijo"
    }
  ];

  function handleOnChange(e) {
    e.preventDefault();
    setViaje({
      ...viaje,
      [e.target.name]: e.target.value
    });
    setErrors(
      validacion({
        ...viaje,
        [e.target.name]: e.target.value
      })
    );
  }

  const handleCheckBox = position => {
    const updatedCheckedState = isChecked.map(
      (item, index) => (index === position ? !item : item)
    );
    setIsChecked(updatedCheckedState);
  };

  function handleSubmit(e) {
    e.preventDefault();
    swal({
      title: "La modificación se realizó con éxito!",
      icon: "success",
      button: "Buen viaje!"
    }).then(function() {
      navigate("/home");
    });
    dispatch(modificarViaje(id, isChecked, viaje));
  }

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
              <DatePicker
                className="input-text"
                locale="es"
                dateFormat="dd-MM-yyyy"
                selected={viaje.fecha}
                minDate={new Date()}
                onChange={nuevaFecha =>
                  setViaje({
                    ...viaje,
                    fecha: nuevaFecha
                  })}
              />
              
              <label className="Conductore__formulario_label">Hora</label>
              <input
                className="Conductore__input"
                type="text"
                name="hora"
                value={viaje.hora}
                onChange={e => handleOnChange(e)}
              />
              {errors.hora &&
                <span className="Conductore__error">
                  {errors.hora}
                </span>}

              <label className="Conductore__formulario_label">Origen</label>
              <input
                className="Conductore__input"
                type="text"
                name="origen"
                value={viaje.origen}
                onChange={e => handleOnChange(e)}
              />
              {errors.origen &&
                <span className="Conductore__error">
                  {errors.origen}
                </span>}

              <label className="Conductore__formulario_label">Destino</label>
              <input
                className="Conductore__input"
                type="text"
                name="destino"
                value={viaje.destino}
                onChange={e => handleOnChange(e)}
              />
              {errors.destino &&
                <span className="Conductore__error">
                  {errors.destino}
                </span>}

              <label className="Conductore__formulario_label">
                Dni/Pasaporte
              </label>
              <input
                className="Conductore__input"
                type="text"
                name="dni"
                value={viaje.dni}
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
                  onChange={e => handleOnChange(e)}
                />
                {errors.asiento &&
                  <span className="Conductore__error">
                    {errors.asiento}
                  </span>}
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
              {isChecked[4] &&
                <select
                  name="formaDePago"
                  value={viaje.formaDePago}
                  onChange={e => handleOnChange(e)}
                >
                  <option value="A coordinar">Acordar</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Mercado Pago">Mercado Pago</option>
                </select>}
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
              onChange={e => handleOnChange(e)}
              className="input-text-detalle"
            />
          </div>
        </div>
        <div className="Conductore_btn">
          {!errors.hora &&
          !errors.destino &&
          !errors.origen &&
          !errors.fecha &&
          !errors.asiento
            ? <input
                type="submit"
                value="Modificar viaje"
                name="Modificar viaje"
                className="Conductore__btn_registro"
              />
            : <input
                type="submit"
                value="Modificar viaje"
                name="Modificar viaje"
                disabled="disabled"
                className="Conductore__disabled"
              />}
        </div>
      </form>

      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
