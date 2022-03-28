import axios from "axios";

export const GET_DETALLE_VIAJE = "GET_DETALLE_VIAJE";

export function getDetalleViaje(viajeId) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/api/viaje/${viajeId}`)
      .then((viaje) =>
        dispatch({ type: "GET_DETALLE_VIAJE", payload: viaje.data })
      )
      .catch((err) => console.log(err));
  };
}
