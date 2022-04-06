import axios from "axios";

export const GET_DETALLE_VIAJE = "GET_DETALLE_VIAJE";
export const INICIAR_SESION = "INICIAR_SESION";
export const GET_VIAJES_TOTAL = "GET_VIAJES_TOTAL";
export const FILTRO_CHECKS = "FILTRO_CHECKS";
export const REGISTRO_USUARIO = "REGISTRO_USUARIO";
export const LOGGED = "LOGGED";
export const GET_USUARIOS = "GET_USUARIOS";
export const GET_USUARIOS_BY_ID = "GET_USUARIOS_BY_ID";

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

export function getUsuarios() {
  return async function (dispatch) {
    try {
      let usuarios = await axios.get(
        "http://localhost:3001/api/usuario/usuarios"
      );
      return dispatch({ type: "GET_USUARIOS", payload: usuarios.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUsuariosById(email) {
  return async function (dispatch) {
    try {
      let usuarioID = await axios.get(
        `http://localhost:3001/api/usuario/usuarios/${email}`
      );
      console.log("action", usuarioID.data);
      return dispatch({
        type: "GET_USUARIOS_BY_ID",
        payload: usuarioID.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function filtroChecks(payload, asiento) {
  //console.log(payload, asiento);
  return async function (dispatch) {
    let viajes = await axios({
      method: "get",
      url: `http://localhost:3001/api/viaje/filtro/${payload[0]}/${payload[1]}/${payload[2]}/${payload[3]}?asientosAOcupar=${asiento}`,
    });
    console.log("Este console", viajes.data);
    return dispatch({ type: "FILTRO_CHECKS", payload: viajes.data });
  };
}

//registro usuario nuevo
export function registroUsuario(payload) {
  console.log("soy payload", payload);
  return async function (dispatch) {
    try {
      const nuevoUsuario = await axios({
        method: "post",
        url: "http://localhost:3001/api/usuario/registro",
        data: {
          email: payload.email,
          nombre: payload.nombre,
          apellido: payload.apellido,
          password: payload.password,
          vehiculo: payload.vehiculo,
          dni: payload.dni,
        },
      });
      return dispatch({
        type: "REGISTRO_USUARIO",
        payload: nuevoUsuario,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postViajePasajero(checkboxes, viaje) {
  return async function (dispatch) {
    try {
      let pasajero = await axios({
        method: "post",
        url: "http://localhost:3001/api/viaje/pasajero",
        data: {
          aceptaFumador: checkboxes[0],
          aceptaMascota: checkboxes[1],
          aceptaEquipaje: checkboxes[2],
          usaBarbijo: checkboxes[3],
          pagoCompartido: checkboxes[4],
          formaDePago: viaje.formaDePago,
          fecha: viaje.fecha,
          hora: viaje.hora,
          origen: viaje.origen,
          destino: viaje.destino,
          asientosAOcupar: viaje.asiento,
          email: viaje.email,
          dni: viaje.dni,
        },
      });
      return dispatch({ type: "POST_VIAJE_PASAJERO", payload: pasajero.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postVehiculo(payload) {
  return async function (dispatch) {
    try {
      let viaje = await axios({
        method: "post",
        url: "http://localhost:3001/api/vehiculo/",
        data: {
          patente: payload.patente,
          marca: payload.marca,
          modelo: payload.modelo,
          dni: payload.dni,
          email: payload.email,
        },
      });
      return dispatch({ type: "POST_VEHICULO", payload: viaje.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postViajeConductor(checkboxes, viaje) {
  console.log(checkboxes, viaje);
  return async function (dispatch) {
    try {
      let conductor = await axios({
        method: "post",
        url: "http://localhost:3001/api/viaje/conductor",
        data: {
          aceptaFumador: checkboxes[0],
          aceptaMascota: checkboxes[1],
          aceptaEquipaje: checkboxes[2],
          usaBarbijo: checkboxes[3],
          pagoCompartido: checkboxes[4],
          formaDePago: viaje.formaDePago,
          fecha: viaje.fecha,
          hora: viaje.hora,
          origen: viaje.origen,
          destino: viaje.destino,
          asientosAOcupar: viaje.asiento,
          email: viaje.email,
          dni: viaje.dni,
        },
      });
      return dispatch({
        type: "POST_VIASJE_CONDUCTOR",
        payload: conductor.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function login(payload) {
  return async function (dispatch) {
    try {
      let logueado = await axios({
        method: "put",
        url: "http://localhost:3001/api/usuario/logueado",
        data: {
          email: payload,
        },
      });
      return dispatch({ type: "LOGGED", payload: logueado.data });
    } catch (err) {
      console.log(err);
    }
  };
}
