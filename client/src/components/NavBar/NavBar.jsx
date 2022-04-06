import React, { useEffect } from "react";
import { Filtros } from "../Filtros/Filtros";
import "./NavBar.css";
import userRojo from "../../assets/userRojo.jpg";
import logo from "../../assets/Icono shareRides.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsuariosById, getUsuarios } from "../../redux/actions/actions";
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

export default function NavBar() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const cookieNombre = cookies.get("nombre");
  const cookieAvatar = cookies.get("avatar");

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
    <div className="contenedor-NavBar">
      <div className="contenedor-titulo">
        <div className="titulo-NavBar">
          <h1>
            <img src={logo} alt="" />
            Share Rides
          </h1>
        </div>
        <div className="panel-botones">
          <button class="btn btn-outline-primary" type="button">
            <Link to="/home">Home</Link>
          </button>
          <button type="button" class="btn btn-outline-primary">
            <Link to="/formviaje">Crear Viaje</Link>
          </button>
        </div>
        <div className="info-usuario">
          <h3>Hola, {cookieNombre}</h3>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Perfil">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <img
                  src={cookieAvatar === "null" ? user : cookieAvatar}
                  alt=""
                  style={{ width: 52, height: 52 }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <BiLogOut fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
