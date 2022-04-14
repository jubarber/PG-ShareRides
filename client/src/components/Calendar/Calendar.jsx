import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getViajesTotal, getUsuarios } from "../../redux/actions/actions";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import swal from "sweetalert";
import Swal from 'sweetalert2'
import axios from "axios";
// import "./Calendar.css"
require("moment/locale/es.js");

export default function Calendario() {

  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  const viajes = useSelector(state => state.viajesFiltrados);
  const usuarios = useSelector(state=> state.usuarios)
  const [fecha, setFecha] = useState(new Date());

  useEffect(
    () => {
      dispatch(getViajesTotal());
      dispatch(getUsuarios());
    },
    [dispatch]
  );
  moment().format("dd mm yyyy");

  console.log("viajes", viajes[0]?.fecha
  // .split("-").reverse().join("-") + " " + viajes[0]?.hora
  )

  let eventos = [];
  viajes.map(v =>
    eventos.push({
      title: `De ${v.origen} a ${v.destino}`,
      start: new Date(v.fecha.split("-").reverse().join("-") + " " + v.hora),
      end: new Date(v.fecha.split("-").reverse().join("-") + " " + v.hora),
      participantes: v.usuarios.map(v => [
        { nombre: v.nombre, apellido: v.apellido, email: v.email, dni: v.dni }
      ])
    })
  );
  console.log(viajes)
  console.log(eventos);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventos}
        culture="es"
        dateFormat="dd/mm/yyyy"
        // formats={{formatoFecha}}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, margin: "50px" }}
        onSelectEvent={e => {
          // swal({
          //   title: e.title,
            // text: `El viaje sale el ${e.start.getDate()} del mes ${e.start.getMonth()} del año ${e.start.getFullYear()}. Les participantes son: ${e.participantes
            //   .flat()
            //   .map(
            //     p =>
            //       `${p.nombre} ${p.apellido} con mail ${p.email} y dni ${p.dni}`
            //   )}`,
          //   button: "Ok!"
          // })
          Swal.fire({
            title: e.title,
            icon: "info",
            html: `El viaje sale el ${e.start.getDate()} del mes ${e.start.getMonth()} del año ${e.start.getFullYear()}. Les participantes son: ${e.participantes.flat().map(p =>
                  `${p.nombre} ${p.apellido} con mail <a href="/perfil/${p.email}">${p.email}</a> y dni ${p.dni}`
              )}`
          })
        }}
        messages={{
          next: "Sig",
          previous: "Ant",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día"
        }}
      />
      <br />
      {fecha.toString()}
    </div>
  );
}
