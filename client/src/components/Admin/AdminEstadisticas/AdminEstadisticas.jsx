import React from "react";
import { useEffect } from "react";
import fondo from "../../../assets/fondo perfil.jpg";
import { getUsuarios, getComentarios, getViajesTotal, postReporte, reportarComentarios, eliminarComentarios, getVehiculos } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./AdminEstadisticas.css"
//:P 
export default function Tabla() {
  const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(getViajesTotal())
    dispatch(getUsuarios())
    dispatch(getComentarios())
    dispatch(reportarComentarios())
    dispatch(getVehiculos())
  },[dispatch]);
  const usuarios = useSelector((state)=>state.usuarios)
  const viajes=useSelector((state)=>state.viajes)
  const vehiculos=useSelector((state)=>state.vehiculos)
  console.log("me traigo los estados", vehiculos, viajes, usuarios)
  return (
    <div className="container__table">
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
      <table>
        <tr>
          <th>Usuarios</th>
          <th>Cantidad</th>
          <th>%</th>
          <th>Total</th>
        </tr>
        <tr>
          <td>Activos</td>
          <td>Cant total de usuarios activos</td>
          <td>Cant de usuariosactivos/total</td>
          <td></td>
        </tr>
        <tr>
          <td>Baneados</td>
          <td>Cant total de usuarios Baneados</td>
          <td>Cant de usuarios Baneados/total</td>
          <td></td>
        </tr>       
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{usuarios.length}</td>
        </tr>
      </table> 
      <table>
        <tr>
          <th></th> 
          <th>Cantidad de reportes</th>
          <th>reportes/cant de usuarios</th>
        </tr>
        <tr>
          <td>Reportes</td>
          <td>Cant de reportes</td>
          <td></td>
        </tr>
      </table>    
      <table>
        <tr>
          <th>Viajes</th>
          <th>Num</th>
          <th>porcentaje</th>
          <th>total</th>
        </tr>
        <tr>
          <td>Viajes Activos</td>
          <td>Cant viajes actuales</td>
          <td>cant/total</td>
          <td></td>
        </tr>
        <tr>
          <td>Viajes finalizados</td>
          <td>Cant viajes finalizados</td>
          <td>cant/total</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{viajes && viajes.length}</td>
        </tr>
      </table>
      <table>
        <tr>
          <th></th>
          <th>Cantidad</th>
          <th>Autos/Personas</th>
        </tr>
        <td>Vehiculos</td>
        <td>cantidad de vehi</td>
        <td>{vehiculos/usuarios+50}%</td>
      </table>
    </div>
  );
}
