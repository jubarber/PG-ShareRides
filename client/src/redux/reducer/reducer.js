import {
  GET_DETALLE_VIAJE,
  GET_VIAJES_TOTAL,
  FILTRO_CHECKS,
  REGISTRO_USUARIO,
  GET_USUARIOS,
  GET_USUARIOS_BY_ID,
} from "../actions/actions.js";

const initialState = {
  viajePorId: [],
  viajes: [],
  viajesFiltrados: [],
  // usuarios: [],
  usuariosPorId: [],
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
    // case GET_USUARIOS:
    //   return {
    //     ...state,
    //     usuarios: action.payload,
    //   };
    case GET_USUARIOS_BY_ID:
      return {
        ...state,
        usuariosPorId: action.payload,
      };
    case FILTRO_CHECKS:
      return {
        ...state,
        viajesFiltrados: action.payload,
      };

    case REGISTRO_USUARIO:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
}
export default rootReducer;
