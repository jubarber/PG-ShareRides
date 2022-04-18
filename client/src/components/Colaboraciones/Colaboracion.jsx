import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { getColaboraciones, getUsuarios, getViajesTotal } from "../../redux/actions/actions";

export default function Colaboracion() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const colaboraciones = useSelector(state => state.colaboraciones);
  const usuarios = useSelector(state => state.usuarios);
  const viajes = useSelector(state => state.viajes);
  const cookieMail = cookies.get("email");

  useEffect(
    () => {
      dispatch(getColaboraciones(cookieMail));
      dispatch(getUsuarios())
      dispatch(getViajesTotal())
    },
    []
    );
    
    // console.log(viajes)

  return (
    <div>
      {colaboraciones.length !== 0
        ? colaboraciones.map(c => {
            let viaje;
            if(viajes.length!==0) viaje = viajes.find(v => v.id === c.viajeId)
            let usuarioCobrador;
           if(usuarios.length!==0) usuarioCobrador = usuarios.find(u => u.email === c.usuarioCobrador)
          if(usuarioCobrador.length !==0 && viaje.length!==0){  
            return (
              <div>
                Monto de la colaboración: ${c.unit_price}
                <br/>
                Persona con quien colaboraste: {usuarioCobrador.nombre} {usuarioCobrador.apellido}
                
                <br/>
                El <a href={`/detallec/${viaje.id}`}> viaje </a> fue de {viaje.origen} a {viaje.destino} el {viaje.fecha}
              </div>
            );
          }
          })
        : <h2>Aún no hay colaboraciones</h2>}
    </div>
  );
}
