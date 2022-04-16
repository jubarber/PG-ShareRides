import {
  GET_DETALLE_VIAJE,
  GET_VIAJES_TOTAL,
  FILTRO_CHECKS,
  REGISTRO_USUARIO,
  SEARCHORIGEN,
  SEARCHDESTINO,
  GET_USUARIOS,
  USUARIO_MAIL,
  FILTERTYPE,
  GET_COMENTARIOS,
  GET_LOCALIDADES,
  GET_COLABORACIONES,
} from "../actions/actions.js";

const initialState = {
  viajePorId: [],
  viajes: [],
  viajesFiltrados: [],
  usuarios: [],
  usuario: [],
  error: "",
  comentarios: [],
  localidades: [],
  colaboraciones: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETALLE_VIAJE:
      return {
        ...state,
        viajePorId: action.payload,
      };
    case GET_VIAJES_TOTAL:
      return {
        ...state,
        viajes: action.payload,
        viajesFiltrados: action.payload,
      };
    case GET_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };
    case FILTRO_CHECKS:
      return {
        ...state,
        viajesFiltrados: action.payload,
      };
    case REGISTRO_USUARIO:
      return {
        ...state,
        usuarios: action.payload,
      };
    case SEARCHDESTINO:
      return {
        ...state,
        viajesFiltrados: action.payload,
      };
    case SEARCHORIGEN:
      return {
        ...state,
        viajesFiltrados: action.payload,
      };
    case USUARIO_MAIL:
      // console.log(action.payload)
      if (action.payload === "error") {
        return { ...state, error: action.payload, usuario: {} };
      } else {
        return { ...state, usuario: action.payload };
      }
    case GET_COMENTARIOS:
      return {
        ...state,
        comentarios: action.payload,
      };
    case FILTERTYPE:
      const viajes_usuario = state.viajes.filter(
        (e) => e.status === action.payload
      );
      return {
        ...state,
        viajesFiltrados: viajes_usuario,
      };
    case GET_LOCALIDADES:
      return {
        ...state,
        localidades: action.payload,
      };
    case GET_COLABORACIONES:
      return {
        ...state,
        colaboraciones: action.payload
      }
    default:
      return { ...state };
  }
}
export default rootReducer;
