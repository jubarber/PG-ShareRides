import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const [menu, SetMenu] = useState(false);
  const responseGoogle = (response) => {
    console.log(response);
  };
  const responseFacebook = (response) => {
    console.log("Este es el nombre: " + response.name);
    console.log("Este es el email: " + response.email);
    console.log("Esta es la foto: " + response.picture.data.url);
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
                <nav>
                  <Link to={"#"}>Acerca De</Link>
                  <Link to={"#"}>Contacto</Link>
                  <Link to={"#"}>Donacion</Link>
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
                  <Link to="#">Inciar Sesion</Link>
                  <Link to="#">Registrarse</Link>
                  <GoogleLogin
                    clientId="217227520954-k6ikmp0j3ksrgf2r0s1vtg0aifpn5e0p.apps.googleusercontent.com"
                    buttonText="Iniciar sesion"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
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
