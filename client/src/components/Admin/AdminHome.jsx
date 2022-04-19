import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./AdminHome.css";
import logo from "../../assets/Icono shareRides.png";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { getUsuarios, getViajesTotal } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AdminCard from "./AdminCards/AdminCard";
import AdminViajes from "./AdminViajes/AdminViajes";
import Calendar from "../Calendar/Calendar";

const AdminHome = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState([]);
  const usuariosRedux = useSelector((state) => state.usuarios);
  const viajes = useSelector((state) => state.viajes);

  useEffect(async () => {
    if (cookies.get("admin") !== "true") {
      navigate("/admin");
    }
    let data = await axios.get("http://localhost:3001/api/usuario/usuarios");
    data = data.data;
    setUsuario(data);
    dispatch(getViajesTotal());
  }, []);
  console.log("VIAJES", viajes);

  const logout = () => {
    cookies.remove("admin");
    navigate("/admin");
  };

  return (
    <div>
      {console.log("USUARIOS", usuario)}
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
        <div className="filaUsuarios">
          USUARIOS //agregar key
          {usuario.length && usuario.map((u) => <AdminCard user={u} />)}
        </div>
      </div>
      <div>
        <Calendar />
      </div>
      <div>{viajes.length && viajes.map((v) => <AdminViajes viaje={v} />)}</div>
    </div>
  );
};

export default AdminHome;
