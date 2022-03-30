import axios from "axios";

export const GET_DETALLE_VIAJE = "GET_DETALLE_VIAJE";
export const REGISTRO_USUARIO = "REGISTRO_USUARIO";

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

//registro usuario nuevo
export function registroUsuario(payload) {
  return async function (dispatch) {
    try {
      const nuevoUsuario = await axios.post("http://localhost:3001/", payload);
      return dispatch({
        type: "REGISTRO_USUARIO",
        nuevoUsuario,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
