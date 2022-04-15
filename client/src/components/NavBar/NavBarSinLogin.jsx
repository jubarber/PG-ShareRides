import React, { useEffect } from "react";
import "./NavBar.css";
import logo from "../../assets/Icono shareRides.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { logout } from "../../redux/actions/actions";
import { FaHome } from "react-icons/fa";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieNombre = cookies.get("nombre");
  const cookieAvatar = cookies.get("avatar");
  const cookieEmail = cookies.get("email");

  // ------Menu------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout(cookieEmail));
    navigate("/");
  };

  return (
    <div className="contenedor-NavBar">
      <div className="contenedor-titulo">
        <div className="titulo-NavBar">
          <h1>
            <img src={logo} alt="" />
            Share Rides
          </h1>
        </div>
        <div className="panel-botones">
          <button className="btn btn-outline-primary" type="button">
            <Link to="/home">
              <FaHome />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
