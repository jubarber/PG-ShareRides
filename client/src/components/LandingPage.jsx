import React from "react";
import GoogleLogin from "react-google-login";

export default function LandingPage() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <h1>WELCOME TO SHARE RIDES</h1>
      <GoogleLogin
        clientId="217227520954-k6ikmp0j3ksrgf2r0s1vtg0aifpn5e0p.apps.googleusercontent.com"
        buttonText="Iniciar sesion"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
