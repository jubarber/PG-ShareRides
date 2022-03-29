import { GET_DETALLE_VIAJE } from "../actions/actions.js";

const initialState = {
  viajes: [],
  viajePorId: []
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETALLE_VIAJE:
      return {
        ...state,
        viajePorId: action.payload
      };
    default:
      return { ...state };
  }
}
export default rootReducer;
