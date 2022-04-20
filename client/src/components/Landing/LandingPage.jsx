import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Cookies from "universal-cookie";
import { getUsuarioByEmail } from "../../redux/actions/actions";
import NavBarSinLogin from "../NavBar/NavBarSinLogin";
import Swal from "sweetalert2";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.error);
  const usuarioReducer = useSelector(state => state.usuario);
  const [menu, SetMenu] = useState(false);
  const cookies = new Cookies();
  const [usuario, setUsuario] = useState("hola soy usuario de google");

  const responseGoogle = response => {
    setUsuario({
      nombre: response.profileObj.givenName,
      apellido: response.profileObj.familyName,
      email: response.profileObj.email,
      avatar: response.profileObj.imageUrl
    });
  };

  useEffect(
    () => {
      cookies.set("email", usuario.email, { path: "/" });
      cookies.set("nombre", usuario.nombre, { path: "/" });
      cookies.set("apellido", usuario.apellido, { path: "/" });
      cookies.set("avatar", usuario.avatar, { path: "/" });

      if (usuario.email) {
        if (Object.values(usuarioReducer).length > 0) {
          Swal.fire({
            title: "Bienvenide!" ,
            text:"En instantes serás redirigide al inicio",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {Swal.showLoading()}
          }).then(() => {
          navigate("/home");
        })
        } else {
          Swal.fire({
            title: "Bienvenide!" ,
            text:"En instantes serás redirigide a la creación de una contraseña",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {Swal.showLoading()}
          }).then(() => {
          navigate("/registrogoogle");
        })
        }
      }
    },
    [usuarioReducer]); 

  useEffect(
    () => {
      dispatch(getUsuarioByEmail(usuario.email));
    },
    [usuario, dispatch]
  );

  const handleMenu = () => {
    SetMenu(!menu);
  };
  return (
    <div>
      <NavBarSinLogin />
      <div className="page">
        <div className="card">
          <div className="container">
            <div className="menu">
              <h3>Share Rides</h3>
              <button onClick={handleMenu} className="btn-menu">
                <i className="fas fa-bars" />
              </button>
              {menu &&
                <nav className="desplegable">
                  <Link to={"#"} className="login-registro">
                    Acerca De
                  </Link>
                  <Link to={"#"} className="login-registro">
                    Contacto
                  </Link>
                  <Link to={"#"} className="login-registro">
                    Donacion
                  </Link>
                  <div className="animation start-home" />
                </nav>}
            </div>
            <div className="content">
              <div className="text">
                <h2>Viajes compartidos inclusivos</h2>
                <p>
                  Share Rides es una plataforma destinada a mujeres y
                  disidencias que necesiten realizar un viaje. Vamos a ayudarte
                  a encontrar con quien compartir la experiencia de viajar
                  sintiéndote segura y libre de prejuicios!
                </p>
                <div className="btn">
                  <button className="login-registro">
                    <Link to="/login">Inciar Sesion</Link>
                  </button>
                  <button className="login-registro">
                    <Link to="/registro">Registrarse</Link>
                  </button>

                  <GoogleLogin
                    clientId="217227520954-k6ikmp0j3ksrgf2r0s1vtg0aifpn5e0p.apps.googleusercontent.com"
                    buttonText="Iniciar sesion"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    className="btn-google"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="photo" />
        </div>
      </div>
    </div>
  );
}
