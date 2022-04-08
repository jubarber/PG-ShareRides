import axios from "axios";
export const GET_DETALLE_VIAJE = "GET_DETALLE_VIAJE";
export const INICIAR_SESION = "INICIAR_SESION";
export const GET_VIAJES_TOTAL = "GET_VIAJES_TOTAL";
export const FILTRO_CHECKS = "FILTRO_CHECKS";
export const REGISTRO_USUARIO = "REGISTRO_USUARIO";
export const LOGGED = "LOGGED";
export const SEARCHORIGEN = "SEARCHORIGEN";
export const SEARCHDESTINO = "SEARCHDESTINO";
export const GET_USUARIOS = "GET_USUARIOS";
export const USUARIO_MAIL = "USUARIO_MAIL";
export const FILTERTYPE = "FILTERTYPE";
export const MODIFICAR_PERFIL = "MODIFICAR_PERFIL";
export const COMENTARIOS = "COMENTARIOS";
export const GET_COMENTARIOS = "GET_COMENTARIOS";

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

export function filtroChecks(payload, asiento) {
  //console.log(payload, asiento);
  return async function (dispatch) {
    let viajes = await axios({
      method: "get",
      url: `http://localhost:3001/api/viaje/filtro/${payload[0]}/${payload[1]}/${payload[2]}/${payload[3]}?asientosAOcupar=${asiento}`,
    });
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
          avatar: payload.avatar,
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
  console.log(viaje);
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
          nombre: viaje.nombre,
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
          nombre: viaje.nombre,
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

export function mailNuevaPassword(payload) {
  return async function (dispatch) {
    try {
      let mail = await axios({
        method: "post",
        url: "http://localhost:3001/api/usuario/mailnuevapassword",
        data: {
          email: payload.email,
          nombre: payload.nombre,
        },
      });
      return dispatch({ type: "MAIL_PASS", payload: mail.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function mailModificarPerfil(payload) {
  return async function (dispatch) {
    try {
      let modificarPerfil = await axios({
        method: "post",
        url: "http://localhost:3001/api/usuario/emailmodificarperfil",
        data: {
          email: payload.email,
          nombre: payload.nombre,
        },
      });
      return dispatch({
        type: "MAIL_MOD_PERFIL",
        payload: modificarPerfil.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function modificacionPerfil(payload) {
  return async function (dispatch) {
    console.log("perfil", payload);
    try {
      let perfilModificado = await axios({
        method: "put",
        url: "http://localhost:3001/api/usuario/modificarperfil",
        data: {
          email: payload.email,
          acercaDeMi: payload.acercaDeMi,
          telefono: payload.telefono,
          avatar: payload.avatar,
          dni: payload.dni,
        },
      });
      return dispatch({
        type: "MODIFICAR_PERFIL",
        payload: perfilModificado.data,
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

export function logout(payload) {
  return async function (dispatch) {
    try {
      let deslogueado = await axios({
        method: "put",
        url: "http://localhost:3001/api/usuario/deslogueado",
        data: {
          email: payload,
        },
      });
      console.log("deslogueado");
      return dispatch({ type: "LOGGED_OUT", payload: deslogueado.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function searchOrigen(origen) {
  return async function (dispatch) {
    console.log("action origen", origen);
    try {
      console.log("action origen", origen);
      let search = await axios.get(
        `http://localhost:3001/api/viaje/searchorigen?origen=${origen}`
      );
      return dispatch({ type: "SEARCHORIGEN", payload: search.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function searchDestino(destino) {
  return async function (dispatch) {
    console.log("action destino", destino);
    try {
      let search = await axios.get(
        `http://localhost:3001/api/viaje/searchdestino?destino=${destino}`
      );
      return dispatch({ type: "SEARCHDESTINO", payload: search.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsuarioByEmail(email) {
  return async function (dispatch) {
    try {
      let usuario = await axios({
        method: "get",
        url: `http://localhost:3001/api/usuario/usuarios/${email}`,
      });
      return dispatch({ type: "USUARIO_MAIL", payload: usuario.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postComentarios(payload) {
  return async function (dispatch) {
    console.log("post comentarios action", payload);
    try {
      let comentario = await axios({
        method: "post",
        url: "http://localhost:3001/api/comentarios/postComentarios",
        data: {
          email: payload.email,
          calificacion: payload.calificacion,
          comentarios: payload.comentarios,
        },
      });
      return dispatch({ type: "COMENTARIOS", payload: comentario.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getComentarios() {
  return async function (dispatch) {
    try {
      let comentarios = await axios(
        "http://localhost:3001/api/comentarios/comentarios"
      );
      return dispatch({ type: "GET_COMENTARIOS", payload: comentarios.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterPerCard(payload) {
  return {
    type: FILTERTYPE,
    payload,
  };
}
