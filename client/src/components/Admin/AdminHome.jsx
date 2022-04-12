import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import "./AdminHome.css";
import logo from "../../assets/Icono shareRides.png";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const AdminHome = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get("admin") !== "true") {
      navigate("/admin");
    }
  }, [cookies]);

  const logout = () => {
    cookies.remove("admin");
    navigate("/admin");
  };


  // ------Menu------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //-----------------------------

  return (
    <div>
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
      <div>
      </div>
    </div>
  );
};

export default AdminHome;
