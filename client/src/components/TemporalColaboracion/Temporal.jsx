import React, { useEffect } from "react";
import { actualizarColaboracion } from "../../redux/actions/actions";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Temporal() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const cookieMail = cookies.get("email");
  const navigate = useNavigate();

  useEffect(
    () => {
      dispatch(actualizarColaboracion(cookieMail));
      setTimeout(() => {
        window.location.href = "/home";
      }, 2500);
    },
    [cookieMail]
  );

  return (
    <div className="font-semibold text-2xl dark:text-gray-500">
      <h2> Por favor, espere. Será redireccionade en momentos...</h2>
    </div>
  );
}
