import { GET_DETALLE_VIAJE, REGISTRO_USUARIO } from "../actions/actions.js";

const initialState = {
  viajes: [],
  viajePorId: [],
  usuarios: []
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETALLE_VIAJE:
      return {
        ...state,
        viajePorId: action.payload
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
