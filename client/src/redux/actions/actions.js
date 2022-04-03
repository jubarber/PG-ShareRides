import axios from "axios";

export const GET_DETALLE_VIAJE = "GET_DETALLE_VIAJE";
export const INICIAR_SESION = "INICIAR_SESION";
export const GET_VIAJES_TOTAL = "GET_VIAJES_TOTAL";
export const FILTRO_CHECKS = "FILTRO_CHECKS";
export const REGISTRO_USUARIO = "REGISTRO_USUARIO";
export const LOGGED = "LOGGED";

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
      const nuevoUsuario = await axios.post("http://localhost:3001api/usuario/registro/", payload);
      return dispatch({
        type: "REGISTRO_USUARIO",
        nuevoUsuario
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export  async function postViajePasajero(payload, payload2) {
  try {
    let pasajero = await axios({
      method: "post",
      url: "http://localhost:3001/api/viaje/pasajero",
      data: {
        payload,
        payload2
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export async function postViajeConductor(payload, payload2) {
  try {
    let conductor = await axios({
      method: "post",
      url: "http://localhost:3001/api/viaje/conductor",
      data: {
        payload,
        payload2
      }
    });
  } catch (err) {
    console.log(err);
  }
}
export function login(payload) {
  return async function (dispatch){
    try{
      let logueado = await axios({
        method: "put",
        url: "http://localhost:3001/api/usuario/logueado",
        data:{
          email: payload
        }
        
      })
    }catch(err){
      console.log(err);
    }
  }
}
