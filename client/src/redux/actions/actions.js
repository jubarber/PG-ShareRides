import axios from "axios";

export const GET_DETALLE_VIAJE = "GET_DETALLE_VIAJE";
export const INICIAR_SESION = "INICIAR_SESION";
export const GET_VIAJES_TOTAL = "GET_VIAJES_TOTAL";
export const FILTRO_CHECKS = "FILTRO_CHECKS";
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

export async function inicioSesion(payload) {
  //va a recibir el estado de react donde tengo guardadas las cookies de inicio de sesion
  let usuario = await axios({
    method: "get",
    url: "http://localhost:3001/api/usuario/iniciarsesion",
    data: {
      dni: payload.dni,
      password: payload.password
    }
  });
}

export function getViajesTotal() {
  return async function (dispatch) {
    try {
      let viajesTotal = await axios.get(
        "http://localhost:3001/api/viaje/totalviajes"
      );
      return dispatch({ type: "GET_VIAJES_TOTAL", payload: viajesTotal.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function filtroChecks(payload, asiento) {
  return async function (dispatch) {
    let viajes = await axios({
      method: "get",
      url: `http://localhost:3001/api/viaje/filtro/${payload[0]}/${payload[1]}/${payload[2]}/${payload[3]}?asientosAOcupar=${asiento}`
    });
    return dispatch({ type: "FILTRO_CHECKS", payload: viajes.data });
  };
}

//registro usuario nuevo
export function registroUsuario(payload) {
  return async function (dispatch) {
    try {
      const nuevoUsuario = await axios.post("http://localhost:3001/", payload);
      return dispatch({
        type: "REGISTRO_USUARIO",
        nuevoUsuario
      });
    } catch (error) {
      console.log(error);
    }
  };
}
