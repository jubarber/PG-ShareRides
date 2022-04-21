import React, { useEffect, useState } from "react";
import "./NavBar.css";
import logo from "../../assets/Icono shareRides.png";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { getUsuarioByEmail, logout } from "../../redux/actions/actions";
import { FaHome } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();
  const cookies = new Cookies();
  const cookieNombre = cookies.get("nombre");
  const cookieAvatar = cookies.get("avatar");
  const cookieEmail = cookies.get("email");
  const miUsuario = useSelector((state) => state.usuario);

  useEffect(() => {
    dispatch(getUsuarioByEmail(cookieEmail));
  }, []);

  // ------Menu------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // -------------Menu sin login --------------------
  const [toggle, setToggle] = React.useState(null);
  const openToggle = Boolean(anchorEl);
  const handleClickToggle = (event) => {
    setToggle(event.currentTarget);
  };
  const handleCloseToggle = () => {
    setToggle(null);
  };

  const handleLogout = () => {
    dispatch(logout(cookieEmail));
    navigate("/");
  };

  console.log("COOKIEAVATAR", cookieAvatar);
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
          <Link to="/home">
            <button className="btn btn-outline-primary" type="button">
              <FaHome />
            </button>
          </Link>
          {cookieEmail !== "undefined" && cookieEmail !== "" ? (
            <Link to="/formviaje">
              <button type="button" className="btn btn-outline-primary">
                Crear Viaje
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        {cookieEmail === "undefined" || cookieEmail === "" ? (
          <>
            <div className="navBar-Completa">
              <div className="IniciarSesion-y-Registrar">
                <Link to="/login">
                  <button type="button" className="btn btn-outline-primary">
                    Iniciar Sesion
                  </button>
                </Link>
                <Link to="/registro">
                  <button type="button" className="btn btn-outline-primary">
                    Registrarse
                  </button>
                </Link>
              </div>
            </div>
            <div className="navBar-Responsive">
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <div className="IniciarSesion-y-Registrar__Responsive">
                  <Link to="/login">
                    <MenuItem>
                      <button type="button" className="btn btn-outline-primary">
                        Iniciar Sesion
                      </button>
                    </MenuItem>
                  </Link>
                  <Link to="/registro">
                    <MenuItem>
                      {" "}
                      <button type="button" className="btn btn-outline-primary">
                        Registrarse
                      </button>
                    </MenuItem>
                  </Link>
                </div>
              </Menu>
            </div>
          </>
        ) : (
          <>
            <div className="info-usuario">
              <div className="navbar-completa-completa">
                <div>
                  <h3>Hola, {cookieNombre}</h3>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
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
                          src={cookieAvatar}
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
                    <Link to={`/perfil/${cookieEmail}`}>
                      <MenuItem>
                        <img
                          src={cookieAvatar}
                          alt=""
                          style={{
                            width: 32,
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                          }}
                        />{" "}
                        Mi Perfil
                      </MenuItem>
                    </Link>

                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <BiLogOut style={{ width: 32, height: 32 }} />
                      </ListItemIcon>
                      Cerrar Sesion
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="navbar-completa-responsive">
                <div>
                  <button>
                    <Link to={`/perfil/${cookieEmail}`}>
                      <img
                        src={cookieAvatar ? cookieAvatar : miUsuario.avatar}
                        alt=""
                        style={{ width: 52, height: 52 }}
                      />
                    </Link>
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleLogout}
                  >
                    Cerrar Sesion
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
