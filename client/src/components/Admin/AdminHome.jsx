import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./AdminHome.css";
import logo from "../../assets/Icono shareRides.png";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { getUsuarios, getViajesTotal, getReporte} from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AdminCard from "./AdminCards/AdminCard";
import AdminViajes from "./AdminViajes/AdminViajes";
import Calendar from "../Calendar/Calendar";
import fondo from "../../assets/fondo perfil.jpg";
import AdminEstadisticas from "./AdminEstadisticas/AdminEstadisticas";

const AdminHome = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [usuario, setUsuario] = useState([]);
  let usuario= useSelector((state) => state.usuarios);
  const [filtro, setFiltro] = useState("Activo")
  const viajes = useSelector((state) => state.viajes);
  const reportes = useSelector(state => state.reportes)

  const [panel, setPanel] = useState({
    Calendario: true,
    Usuarios: false,
    Viajes: false,
    Estadisticas: false,
  });
  const panelHandler = (e) => {
    let li = e.target.textContent;
    setPanel({ [li]: true });
  };

  if(filtro === "Activos") usuario= usuario.filter(user => user&& !user.eliminado)
  if(filtro === "Bloqueados") usuario = usuario.filter(user => user&&  user.eliminado)
  if(filtro === "Reportados") usuario = usuario.filter(user => user&&  user.reportado)
  
  const userStatusHandler = async (value) => {
    /* let data = await axios.get("http://localhost:3001/api/usuario/usuarios");
    data = data.data;
    setUsuario(data); */
    

    //filtra con los estados de redux porque no se ven modificadoas ante el filter
    
    
    console.log("USUARIO", usuario)
  }

  //console.log("panel", panel)

  useEffect(async () => {
    if (cookies.get("admin") !== "true") {
      navigate("/admin");
    }
    /* let data = await axios.get("http://localhost:3001/api/usuario/usuarios");
    data = data.data;
    setUsuario(data.filter(u => !u.eliminado)); */
    dispatch(getViajesTotal());
    dispatch(getUsuarios());
  }, []);

  const logout = () => {
    cookies.remove("admin");
    navigate("/admin");
  };

  return (
    <div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
      <div className="contenedor-NavBar">
        <div className="contenedor-titulo">
          <div className="titulo-NavBar">
            <h1>
              <img src={logo} alt="" />
              Share Rides
            </h1>
          </div>
          <div className="panel-botones">
            <Link to="/home">
              <button className="btn btn-outline-primary" type="button">
                <FaHome />
              </button>
            </Link>
            <button className="btn btn-outline-primary" onClick={logout}>
              LogOut
            </button>
          </div>
          <div className="info-usuario">
            <h3>Hola, Admin</h3>
          </div>
        </div>
      </div>
      {/* Contenedor principal  */}
      <div className="adminMainContainer">
        <ul className="admin__navegador">
          <li onClick={(e) => panelHandler(e)} className={panel.Calendario && "admin__li-active"}>Calendario</li>
          <li onClick={(e) => panelHandler(e)} className={panel.Usuarios && "admin__li-active"}>Usuarios</li>
          <li onClick={(e) => panelHandler(e)} className={panel.Viajes && "admin__li-active"}>Viajes</li>
          <li onClick={(e) => panelHandler(e)} className={panel.Estadisticas && "admin__li-active"}>Estadisticas</li>
        </ul>
        {panel.Calendario && (
          <div>
            <Calendar />
          </div>
        )}
        {panel.Usuarios && (
          <div>
            <div className="admin__selectContainer">
              
            <div className="admin__selectUsuarios" >
              <span onClick={(e)=> setFiltro(e.target.textContent)}>Activos</span>
              <span onClick={(e)=> setFiltro(e.target.textContent)}>Bloqueados</span>
              <span onClick={(e)=> setFiltro(e.target.textContent)}>Reportados</span>
            </div>
            </div>
         
          <div className="filaUsuarios">

            {usuario.length? usuario.map((u) => <AdminCard key={u.id} user={u} />): <p className="noLoaded" >No se pudo cargar lo solicitado :(</p>}
          </div>
          </div>
        )}
      </div>
      {panel.Viajes && (
        <div>
          {viajes.length && viajes.map((v) => <AdminViajes key={v.id} viaje={v} />)}
        </div>
      )}
      {
        panel.Estadisticas && <AdminEstadisticas/>
      }
    </div>
  );
};

export default AdminHome;
