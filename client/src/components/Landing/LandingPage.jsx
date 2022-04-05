import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const [menu, SetMenu] = useState(false);
  const responseGoogle = (response) => {
    console.log("Este es el nombre: " + response.profileObj.name);
    console.log("Este es el email: " + response.profileObj.email);
    console.log("Esta es la foto: " + response.profileObj.imageUrl);
    window.location.href="/home"
  };

  const handleMenu = () => {
    SetMenu(!menu);
  };
  return (
    <div>
      <div className="page">
        <div className="card">
          <div className="container">
            <div className="menu">
              <h3>Share Rides</h3>
              <button onClick={handleMenu} className="btn-menu">
                <i class="fas fa-bars"></i>
              </button>
              {menu && (
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
                  <div className="animation start-home"></div>
                </nav>
              )}
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
          <div className="photo"></div>
        </div>
      </div>
    </div>
  );
}
