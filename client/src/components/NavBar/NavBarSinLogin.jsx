import React from "react";
import "./NavBarSinLogin.css";
import logo from "../../assets/Icono shareRides.png";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NavBar() {
  // ------Menu------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navBarSinLogin__contenedor-NavBar">
      <div className="navBarSinLogin__contenedor-titulo">
        <div className="navBarSinLogin__titulo-NavBar">
          <h1>
            <img src={logo} alt="" />
            Share Rides
          </h1>
        </div>
        <div className="navBarSinLogin__panel-botones">
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
