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
export const GET_LOCALIDADES = "GET_LOCALIDADES";
export const GET_COMENTARIO_BY_ID = "GET_COMENTARIO_BY_ID";
export const ACTUALIZAR_COLABORACION = "ACTUALIZAR_COLABORACION";
export const GET_COLABORACIONES = "GET_COLABORACIONES";
export const ELIMINADO = "ELIMINADO";
export const GET_VIAJES_TOTAL_USUARIO = "GET_VIAJES_TOTAL_USUARIO";
export const GET_VEHICULOS = "GET_VEHICULOS";
export const ACTIVAR_USUARIO = "ACTIVAR_USUARIO";
export const PAUSAR_VIAJE = "PAUSAR_VIAJE";
export const REACTIVAR_VIAJE = "REACTIVAR_VIAJE";



export function getDetalleViaje(viajeId) {
  return function(dispatch) {
    axios
      .get(`/api/viaje/${viajeId}`)
      .then((viaje) =>

        dispatch({ type: "GET_DETALLE_VIAJE", payload: viaje.data })
      )
      .catch(err => console.log(err));
  };
}

export function getViajesTotal() {
  return async function(dispatch) {
    try {
      let viajesTotal = await axios.get(
        "/api/viaje/totalviajes"
      );
      return dispatch({ type: "GET_VIAJES_TOTAL", payload: viajesTotal.data });
    } catch (err) {
      console.log(err);
    }
  };
}
export function getViajesTotalUsuario(email) {
  return async function(dispatch) {
    try {
      let viajesTotal = await axios.get(
        `/api/viaje/totalviajes/${email}`
      );
      return dispatch({
        type: "GET_VIAJES_TOTAL_USUARIO",
        payload: viajesTotal.data
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function getUsuarios() {
  return async function(dispatch) {
    try {
      let usuarios = await axios.get(
        "/api/usuario/usuarios"
      );
      return dispatch({ type: "GET_USUARIOS", payload: usuarios.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function filtroChecks(payload, asiento) {
  //console.log(payload, asiento);
  return async function(dispatch) {
    let viajes = await axios({
      method: "get",
      url: `/api/viaje/filtro/${payload[0]}/${payload[1]}/${payload[2]}/${payload[3]}?asientosAOcupar=${asiento}`,

    });
    return dispatch({ type: "FILTRO_CHECKS", payload: viajes.data });
  };
}

//registro usuario nuevo
export function registroUsuario(payload) {
  // console.log("soy payload", payload);
  return async function(dispatch) {
    try {
      const nuevoUsuario = await axios({
        method: "post",
        url: "/api/usuario/registro",
        data: {
          email: payload.email,
          nombre: payload.nombre,
          apellido: payload.apellido,
          password: payload.password,
          vehiculo: payload.vehiculo,
          dni: payload.dni,
          avatar: payload.avatar
        }
      });
      return dispatch({
        type: "REGISTRO_USUARIO",
        payload: nuevoUsuario
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postViajePasajero(checkboxes, viaje) {
  // console.log(viaje);
  return async function(dispatch) {
    try {
      let pasajero = await axios({
        method: "post",
        url: "/api/viaje/pasajero",
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
          detalles: viaje.detalles,
          puntuacion: viaje.puntuacion
        }
      });
      return dispatch({ type: "POST_VIAJE_PASAJERO", payload: pasajero.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postVehiculo(payload) {
  return async function(dispatch) {
    try {
      let viaje = await axios({
        method: "post",
        url: "/api/vehiculo/",
        data: {
          patente: payload.patente,
          marca: payload.marca,
          modelo: payload.modelo,
          dni: payload.dni,
          email: payload.email
        }
      });
      return dispatch({ type: "POST_VEHICULO", payload: viaje.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postViajeConductor(checkboxes, viaje) {
  // console.log(checkboxes, viaje);
  return async function(dispatch) {
    try {
      let conductor = await axios({
        method: "post",
        url: "/api/viaje/conductor",
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
          detalles: viaje.detalles,
          puntuacion: viaje.puntuacion,
          patente: viaje.patente
        }
      });
      return dispatch({
        type: "POST_VIASJE_CONDUCTOR",
        payload: conductor.data
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function mailNuevaPassword(payload) {
  return async function(dispatch) {
    try {
      let mail = await axios({
        method: "post",
        url: "/api/usuario/mailnuevapassword",
        data: {
          email: payload.email,
          nombre: payload.nombre
        }
      });
      return dispatch({ type: "MAIL_PASS", payload: mail.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function mailModificarPerfil(payload) {
  return async function(dispatch) {
    try {
      let modificarPerfil = await axios({
        method: "post",
        url: "/api/usuario/emailmodificarperfil",
        data: {
          email: payload.email,
          nombre: payload.nombre
        }
      });
      return dispatch({
        type: "MAIL_MOD_PERFIL",
        payload: modificarPerfil.data
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function modificacionPerfil(payload) {
  return async function(dispatch) {
    // console.log("modificar action", payload);
    try {
      let perfilModificado = await axios({
        method: "put",
        url: "/api/usuario/modificarperfil",
        data: {
          email: payload.email,
          acercaDeMi: payload.acercaDeMi,
          telefono: payload.telefono,
          avatar: payload.avatar,
          dni: payload.dni
        }
      });
      return dispatch({
        type: "MODIFICAR_PERFIL",
        payload: perfilModificado.data
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function login(payload) {
  return async function(dispatch) {
    try {
      let logueado = await axios({
        method: "put",
        url: "/api/usuario/logueado",
        data: {
          email: payload
        }
      });
      return dispatch({ type: "LOGGED", payload: logueado.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function logout(payload) {
  return async function(dispatch) {
    try {
      let deslogueado = await axios({
        method: "put",
        url: "/api/usuario/deslogueado",
        data: {
          email: payload
        }
      });
      // console.log("deslogueado");
      return dispatch({ type: "LOGGED_OUT", payload: deslogueado.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function searchOrigen(origen) {
  return async function(dispatch) {
    // console.log("action origen", origen);
    try {
      // console.log("action origen", origen);
      let search = await axios.get(
        `/api/viaje/searchorigen?origen=${origen}`
      );
      return dispatch({ type: "SEARCHORIGEN", payload: search.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function searchDestino(destino) {
  return async function(dispatch) {
    // console.log("action destino", destino);
    try {
      let search = await axios.get(
        `/api/viaje/searchdestino?destino=${destino}`
      );
      return dispatch({ type: "SEARCHDESTINO", payload: search.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsuarioByEmail(email) {
  // console.log(email)
  return async function(dispatch) {
    try {
      let usuario = await axios({
        method: "get",
        url: `/api/usuario/usuarios/${email}`,

      });
      return dispatch({ type: "USUARIO_MAIL", payload: usuario.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postComentarios(payload) {
  return async function(dispatch) {
    // console.log("post comentarios action", payload);
    try {
      let comentario = await axios({
        method: "post",
        url: "/api/comentarios/postComentarios",
        data: {
          email: payload.email,
          nombre: payload.nombre,
          apellido: payload.apellido,
          calificacion: payload.calificacion,
          comentarios: payload.comentarios
        }
      });
      return dispatch({ type: "COMENTARIOS", payload: comentario.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getComentarios() {
  return async function(dispatch) {
    try {
      let comentarios = await axios(
        "/api/comentarios/comentarios"
      );
      return dispatch({ type: "GET_COMENTARIOS", payload: comentarios.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getComentariosById(id) {
  return async function(dispatch) {
    try {
      let comentarioById = await axios(
        `/api/comentarios/comentarios/${id}`
      );
      return dispatch({
        type: "GET_COMENTARIO_BY_ID",
        payload: comentarioById.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function eliminarComentarios(payload) {
  return async function(dispatch) {
    try {
      let comentarioEliminado = await axios({
        method: "put",
        url: "/api/comentarios/eliminarComentarios",
        data: {
          id: payload
        }
      });
      return dispatch({
        type: "COMENTARIOS_ELIMINADOS",
        payload: comentarioEliminado.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterPerCard(payload) {
  return {
    type: FILTERTYPE,
    payload
  };
}

export function postOrder(usuarioPagador) {
  console.log(usuarioPagador);
  return async function(dispatch) {
    try {
      const newOrder = await axios({
        method: "post",
        url: "/api/order",
        data: { usuarioPagador: usuarioPagador },

      });
      return dispatch({
        type: "NEW_ORDER",
        payload: newOrder.data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function postColaboracion(input) {
  console.log(input);
  return async function(dispatch) {
    try {
      await axios({
        method: "post",
        url: "/api/colaboracion/nuevaColaboracion",
        data: {
          title: input.title,
          unit_price: input.unit_price,
          quantity: input.quantity,
          usuarioPagador: input.usuarioPagador,
          orderId: input.orderId,
          usuarioCobrador: input.usuarioCobrador,
          viajeId: input.viajeId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function actualizarColaboracion(email) {
  console.log("actualizacion", email);
  return async function(dispatch) {
    try {
      const colaboracion = await axios({
        method: "put",
        url: `/api/colaboracion/${email}`,

      });
      return dispatch({
        type: "ACTUALIZAR_COLABORACION",
        payload: colaboracion.data
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getColaboraciones(email) {
  return async function(dispatch) {
    try {
      let colaboraciones = await axios.get(
        `/api/colaboracion/colaboraciones/${email}`
      );
      return dispatch({
        type: "GET_COLABORACIONES",
        payload: colaboraciones.data
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function sumarseAlViaje(payload) {
  // console.log("sumarse", payload);
  return async function(dispatch) {
    try {
      const sumarse = await axios({
        method: "PUT",
        url: "/api/viaje/sumarse",
        data: {
          id: payload.id,
          email: payload.email
        }
      });
      return dispatch({ type: "SUMARSE", payload: sumarse.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function modificarAsiento(payload) {
  return async function() {
    try {
      const viaje = await axios({
        method: "PUT",
        url: "/api/viaje/modificarViaje",

        data: {
          asientosAOcupar: payload.asientosAOcupar,
          id: payload.id
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function eliminarPerfil(payload) {
  return async function(dispatch) {
    // console.log("eliminado", payload);
    try {
      const usuarioEliminado = await axios({
        method: "put",
        url: "/api/usuario/eliminarPerfil",
        data: {
          email: payload
        }
      });
      return dispatch({
        type: "ELIMINAR_PERFIL",
        payload: usuarioEliminado.data
      });
      return dispatch({
        type: "ELIMINAR_PERFIL",
        payload: usuarioEliminado.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function activarPerfil(payload) {
  return async function(dispatch) {

    console.log("activado", payload);
    try {
      const usuarioActivado = await axios({
        method: "put",
        url: "/api/usuario/activarPerfil",
        data: {
          email: payload,
        },
      })
      return dispatch({type:"ACTIVAR_USUARIO", payload: usuarioActivado.data})

    } catch (error) {
      console.log(error);
    }
  };
}

export function postReporte(payload) {
  return async function(dispatch) {
    // console.log("postReporte", payload);
    try {
      const postReporte = await axios({
        method: "post",
        url: "/api/reportes/postReporte",
        data: {
          email: payload.email,
          nombre: payload.nombre,
          apellido: payload.apellido,
          justificacion: payload.justificacion
        }
      });
      return dispatch({ type: "POST_REPORTE", payload: postReporte.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getReporte() {
  return async function(dispatch) {
    try {
      const reportes = await axios(
        "/api/reportes/reportes"
      );
      return dispatch({ type: "REPORTES", payload: reportes.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getVehiculos(email){
  return async function (dispatch){
    try{
      const vehiculos = await axios.get(`/api/vehiculo/${email}`);
      return dispatch({type: "GET_VEHICULOS", payload: vehiculos.data})
    }catch(err){
      console.log(err)

    }
  };
}

export function cambioPassword(email, password) {
  return async function(dispatch) {

    try {
      let cambio = await axios({
        method: "put",
        url: "/api/usuario/cambiopassword",
        data: {
          email: email,
          password: password
        }
      });
      return dispatch({ type: "CAMBIO_PASSWORD", payload: cambio.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function reportarComentarios(payload) {
  console.log("contador", payload);
  return async function(dispatch) {
    try {
      let comentarioReportado = await axios({
        method: "put",
        url: "/api/comentarios/reportarComentarios",
        data: {
          id: payload
        }
      });
      return dispatch({
        type: "COMENTARIO_REPORTADO",
        payload: comentarioReportado.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function pausarViaje(id) {
  console.log("pausar viaje");
  return async function(dispatch) {
    try {
      let viajePausado = await axios({
        method: "put",
        url: `/api/viaje/pausarViaje/${id}`
      });
      return dispatch({ type: "PAUSAR_VIAJE", payload: viajePausado.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function reactivarViaje(id) {
  console.log("reactivar viaje");
  return async function(dispatch) {
    try {
      let viajeReactivado = await axios({
        method: "put",
        url: `/api/viaje/reactivarViaje/${id}`
      });
      return dispatch({ type: "REACTIVAR_VIAJE", payload: viajeReactivado.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function modificarViaje(id, checkboxes, viaje) {
  console.log("modificar viaje", id);
  return async function(dispatch) {
    try {
      let viajeModificado = await axios({
        method: "put",
        url: `http://localhost:3001/api/viaje/modificarViaje/${id}`,
        data: {
          aceptaFumador: checkboxes[0],
          aceptaMascota: checkboxes[1],
          aceptaEquipaje: checkboxes[2],
          usaBarbijo: checkboxes[3],
          nombre: viaje.nombre,
          fecha: viaje.fecha,
          hora: viaje.hora,
          origen: viaje.origen,
          destino: viaje.destino,
          asientosAOcupar: viaje.asiento,
          email: viaje.email,
          dni: viaje.dni,
          detalles: viaje.detalles,
          puntuacion: viaje.puntuacion,
          patente: viaje.patente
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
}
