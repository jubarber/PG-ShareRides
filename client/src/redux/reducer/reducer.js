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
  GET_COMENTARIO_BY_ID,
  GET_COLABORACIONES,
  GET_VIAJES_TOTAL_USUARIO,
  GET_VEHICULOS,
  ACTIVAR_USUARIO,
  VEHICULOS_TOTALES,
  PAUSAR_VIAJE,
  REACTIVAR_VIAJE,
  USUARIO_REPORTADO,
  REPORTES,
} from "../actions/actions.js";

const initialState = {
  viajes: [],
  viajesFiltrados: [],
  viajePorId: [],
  viajesPorUsuario: [],
  viajesPausados: [],
  usuarios: [],
  usuario: [],
  comentarios: [],
  comentarioPorId: [],
  localidades: [],
  colaboraciones: [],
  vehiculos: [],
  error: "",
  vehiculosTotales: [],
  usuariosReportados: [],
  reportes: []
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
    case GET_COMENTARIO_BY_ID: {
      return {
        ...state,
        comentarioPorId: action.payload,
      };
    }
    case GET_COLABORACIONES:
      return {
        ...state,
        colaboraciones: action.payload
      }
      case GET_VIAJES_TOTAL_USUARIO:
        return{
          ...state,
          viajesPorUsuario: action.payload
        }
      case GET_VEHICULOS:
        return {
          ...state,
          vehiculos: action.payload
        }
      case ACTIVAR_USUARIO:
        return {
          ...state,
          usuario: action.payload
        }
      case VEHICULOS_TOTALES:
        return{
          ...state,
          vehiculosTotales: action.payload
        }
      case PAUSAR_VIAJE:
        return{
          ...state,
          viajesPausados: [...state.viajesPausados, action.payload]
        }
      case REACTIVAR_VIAJE:
        return {
          ...state,
          viajesFiltrados: [...state.viajesFiltrados, action.payload]
        }
      case USUARIO_REPORTADO:
        return{
          ...state,
          usuariosReportados: action.payload
        }
      case REPORTES:
        return{
          ...state,
          reportes: action.payload
        }
    default:
      return { ...state };
  }
}
export default rootReducer;