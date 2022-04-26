import React from "react";
import { useEffect } from "react";
import fondo from "../../../assets/fondo perfil.jpg";
import {
  getUsuarios,
  getComentarios,
  getViajesTotal,
  getColaboraciones,
  getVehiculosTotales,
} from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import "./AdminEstadisticas.css";

export default function AdminEstadisticas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(async () => {
    if (cookies.get("admin") !== "true") {
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    dispatch(getViajesTotal());
    dispatch(getUsuarios());
    dispatch(getComentarios());
    dispatch(getVehiculosTotales());
    dispatch(getColaboraciones());
  }, [dispatch]);

  const usuarios = useSelector((state) => state.usuarios);
  const viajes = useSelector((state) => state.viajes);
  const vehiculos = useSelector((state) => state.vehiculosTotales);
  const colaboraciones = useSelector((state) => state.colaboraciones);
  const comentarios = useSelector((state) => state.comentarios);
  console.log("me traigo los estados", viajes);

  

  return (
    <div className="container__table">
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
      <table>
        <tr>
          <th>Usuarios</th>
          <th>Total</th>
        </tr>
        <tr>
          <td>Activos</td>
          <td>{usuarios.filter((u) => u.logueado).length}</td>
        </tr>
        <tr>
          <td>Reportes</td>
          <td>{usuarios.filter((u) => u.reportados.length>0).length}</td>
        </tr>
        <tr>
          <td>Eliminados</td>
          <td>{usuarios.filter((u) => !u.disponible).length}</td>
        </tr>
        <tr className="resaltar">
          <td>Total usuarios</td>
          <td>{usuarios && usuarios.length}</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>Comentarios</th>
          <th>Total</th>
        </tr>
        <tr>
          <td>Activos</td>
          <td>
            {comentarios && comentarios.filter((c) => !c.reportes).length}
          </td>
        </tr>
        <tr>
          <td>Reportados</td>
          <td>{comentarios && comentarios.filter((c) => c.reportes).length}</td>
        </tr>
        <tr className="resaltar">
          <td>Total comentarios</td>
          <td>{comentarios && comentarios.length}</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>Viajes</th>
          <th>Total</th>
        </tr>
        <tr>
          <td>Viajes Activos</td>
          <td>{viajes.filter((v) => v.viajeDisponible).length}</td>
        </tr>
        <tr>
          <td>Viajes finalizados</td>
          <td>{viajes.filter((v) => !v.viajeDisponible).length}</td>
        </tr>
        <tr>
          <td>Viajes como pasajero</td>
          <td>{viajes && viajes.filter(e=>e.status==="pasajero").length}</td>
        </tr>
        <tr>
          <td>Viajes como conductor</td>
          <td>{viajes && viajes.filter(e=>e.status==="conductor").length}</td>
        </tr>
        <tr className="resaltar">
          <td>Viajes Totales</td>
          <td>{viajes && viajes.length}</td>
        </tr>
        </table>
        <table>
        <tr>
          <th>Vehiculos</th>
          <th>Total</th>
        </tr>
        <tr>
          <td>Vehiculos registrados</td>
          <td>{vehiculos && vehiculos.length}</td>
        </tr>
        <tr>
          <td>Colaboraciones</td>
          <td>{colaboraciones && colaboraciones.length}</td>
        </tr>
      </table>
    </div>
  );
}