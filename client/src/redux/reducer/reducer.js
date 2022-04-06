import {
  GET_DETALLE_VIAJE,
  GET_VIAJES_TOTAL,
  FILTRO_CHECKS,
  REGISTRO_USUARIO,
  SEARCHORIGEN,
  SEARCHDESTINO,
  GET_USUARIOS,
} from "../actions/actions.js";

const initialState = {
  viajePorId: [],
  viajes: [],
  viajesFiltrados: [],
  usuarios: [],
  usuario: [],
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
    case GET_USUARIOS_EMAIL:
      return {
        ...state,
        usuario: action.payload,
      }
    case FILTRO_CHECKS:
      return {
        ...state,
        viajesFiltrados: action.payload,
      };

    case REGISTRO_USUARIO:
      return {
        ...state,
      };
    case SEARCHDESTINO:
      console.log(" llegue al reducer destino", action.payload)
      return {
        ...state,
        viajesFiltrados: action.payload,
      };
      case SEARCHORIGEN:
        console.log(" llegue al reducer origen", action.payload)
        return {
          ...state,
          viajesFiltrados: action.payload,
        };

    default:
      return { ...state };
  }
}
export default rootReducer;
