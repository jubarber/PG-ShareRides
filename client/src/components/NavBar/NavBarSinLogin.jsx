import React, { useEffect } from "react";
import "./NavBar.css";
import logo from "../../assets/Icono shareRides.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { BiLogOut } from "react-icons/bi";
import user from "../../assets/user.png";
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
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
