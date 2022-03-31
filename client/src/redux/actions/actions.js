import axios from "axios";

export const GET_DETALLE_VIAJE = "GET_DETALLE_VIAJE";
export const INICIAR_SESION = "INICIAR_SESION";
export const GET_VIAJES_TOTAL = "GET_VIAJES_TOTAL";
export const FILTRO_ORIGEN = "FILTRO_ORIGEN";
export const FILTRO_DESTINO = "FILTRO_DESTINO";
export const FILTRO_ASIENTOS = "FILTRO_ASIENTOS";
export const FILTRO_CHECKS_FUMADOR = "FILTRO_CHECKS_FUMADOR";
export const FILTRO_CHECKS_EQUIPAJE = "FILTRO_CHECKS_EQUIPAJE";
export const FILTRO_CHECKS_MASCOTA = "FILTRO_CHECKS_MASCOTA";
export const FILTRO_CHECKS_BARBIJO = "FILTRO_CHECKS_BARBIJO";
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
        "http://localhost:3001/api/viaje/viajestotal"
      );
      return dispatch({ type: "GET_VIAJES_TOTAL", payload: viajesTotal.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export const filtroOrigen = (payload) => {
  return {
    type: "FILTRO_ORIGEN",
    payload
  };
};
export const filtroDestino = (payload) => {
  return {
    type: "FILTRO_DESTINO",
    payload
  };
};
export const filtroAsientos = (payload) => {
  return {
    type: "FILTRO_ASIENTOS",
    payload
  };
};

export function filtroChecksFumador(payload) {
  // console.log(payload);
  return {
    type: "FILTRO_CHECKS_FUMADOR",
    payload
  };
}

export function filtroChecksEquipaje(payload) {
  // console.log(payload);
  return {
    type: "FILTRO_CHECKS_EQUIPAJE",
    payload
  };
}
export function filtroChecksMascota(payload) {
  // console.log(payload);
  return {
    type: "FILTRO_CHECKS_MASCOTA",
    payload
  };
}
export function filtroChecksBarbijo(payload) {
  // console.log(payload);
  return {
    type: "FILTRO_CHECKS_BARBIJO",
    payload
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

