import {
  GET_DETALLE_VIAJE,
  GET_VIAJES_TOTAL,
  FILTRO_ORIGEN,
  FILTRO_DESTINO,
  FILTRO_ASIENTOS,
  FILTRO_CHECKS_FUMADOR,
  FILTRO_CHECKS_EQUIPAJE,
  FILTRO_CHECKS_MASCOTA,
  FILTRO_CHECKS_BARBIJO
} from "../actions/actions.js";

const initialState = {
  viajePorId: [],
  viajes: [],
  viajesFiltrados: []
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETALLE_VIAJE:
      return {
        ...state,
        viajePorId: action.payload
      };

    case GET_VIAJES_TOTAL:
      return {
        ...state,
        viajes: action.payload,
        viajesFiltrados: action.payload
      };

    case FILTRO_ORIGEN:
      const viajeOrigen = state.viajes;
      const filtradoOrigen = viajeOrigen?.filter(
        (v) => v.origen === action.payload
      );
      return {
        ...state,
        viajesFiltrados: filtradoOrigen
      };

    case FILTRO_DESTINO:
      const viajeDestino = state.viajes;
      const filtradoDestino = viajeDestino?.filter(
        (v) => v.destino === action.payload
      );
      return {
        ...state,
        viajesFiltrados: filtradoDestino
      };
    case FILTRO_ASIENTOS:
      const viajeAsientos = state.viajes;
      const filtradoAsientos = viajeAsientos?.filter(
        (v) => v.asientosAOcupar == action.payload
      );

      return {
        ...state,
        viajesFiltrados: filtradoAsientos
      };
    case FILTRO_CHECKS_FUMADOR:
      // console.log(action.payload)
      let filtradoFumador;
      if (action.payload == true) {
        filtradoFumador = state.viajesFiltrados?.filter(
          (v) => v.aceptaFumador === action.payload
          // console.log("soy v", v)
        );
      }
      // console.log("estado filtrado reducer", state.viajesFiltrados)
      // console.log(filtradoFumador);
      return {
        ...state,
        viajesFiltrados: filtradoFumador
      };
      
    case FILTRO_CHECKS_MASCOTA:
      console.log(action.payload)
      let viajeMascota = state.viajesFiltrados;
      let filtradoMascota = viajeMascota?.filter(
        (v) => v.aceptaMascota == action.payload);
      console.log(viajeMascota)
      console.log(filtradoMascota)
      return {
        ...state,
        viajesFiltrados: filtradoMascota
      };

    case FILTRO_CHECKS_BARBIJO:
      let viajesBarbijo = state.viajesFiltrados;
      let filtradoBarbijo = viajesBarbijo?.filter(
        (v) => v.usaBarbijo === action.payload
      );
      return {
        ...state,
        viajesFiltrados: filtradoBarbijo
      };

    case FILTRO_CHECKS_EQUIPAJE:
      let viajeEquipaje = state.viajesFiltrados;
      let filtradoEquipaje = viajeEquipaje?.filter(
        (v) => v.aceptaEquipaje === action.payload
      );
      return {
        ...state,
        viajesFiltrados: filtradoEquipaje
      };

    default:
      return { ...state };
  }
}
export default rootReducer;
