import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getViajesTotal,
  filtroOrigen,
  filtroDestino,
  filtroAsientos,
  filtroChecksFumador,
  filtroChecksEquipaje,
  filtroChecksMascota,
  filtroChecksBarbijo
} from "../redux/actions/actions";

export function Filtros() {
  const dispatch = useDispatch();
  const viajesFiltrados = useSelector((state) => state.viajesFiltrados?.flat());
  const viajesTotal = useSelector((state) => state.viajes);
  const [checkedArray, setCheckedArray] = useState({
    fumador: false,
    mascota: false,
    equipaje: false,
    barbijo: false
  });
  const [isCheckedFumador, setIsCheckedFumador] = useState(false);
  const [isCheckedMascota, setIsCheckedMascota] = useState(false);
  const [isCheckedEquipaje, setIsCheckedEquipaje] = useState(false);
  const [isCheckedBarbijo, setIsCheckedBarbijo] = useState(false);
  const [selects, setSelects] = useState({
    origen: "",
    destino: "",
    asientos: ""
  });

  function handleOnChangeFumador(e) {
    setIsCheckedFumador(!isCheckedFumador);
    !isCheckedFumador
      ? setCheckedArray({ ...checkedArray, fumador: true })
      : setCheckedArray({ ...checkedArray, fumador: false });
  }

  function handleOnChangeMascota(e) {
    setIsCheckedMascota(!isCheckedMascota);
    !isCheckedMascota
      ? setCheckedArray({ ...checkedArray, mascota: true })
      : setCheckedArray({ ...checkedArray, mascota: false });
  }

  function handleOnChangeEquipaje(e) {
    setIsCheckedEquipaje(!isCheckedEquipaje);
    !isCheckedEquipaje
      ? setCheckedArray({ ...checkedArray, equipaje: true })
      : setCheckedArray({ ...checkedArray, equipaje: false });
  }

  function handleOnChangeBarbijo(e) {
    setIsCheckedBarbijo(!isCheckedBarbijo);
    !isCheckedBarbijo
      ? setCheckedArray({ ...checkedArray, barbijo: true })
      : setCheckedArray({ ...checkedArray, barbijo: false });
  }

  console.log("estados check", checkedArray);

  function handleFiltroOrigen(e) {
    e.preventDefault();
    setSelects({ ...selects, origen: e.target.value });
  }

  function handleFiltroDestino(e) {
    e.preventDefault();
    setSelects({ ...selects, destino: e.target.value });
  }

  function handleFiltroAsientos(e) {
    e.preventDefault();
    setSelects({ ...selects, asientos: e.target.value });
  }

  useEffect(() => {
    dispatch(getViajesTotal());
  }, [dispatch]);

  useEffect(() => {
    console.log("viajes filtrados", viajesFiltrados);
  }, [viajesTotal, viajesFiltrados]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(filtroOrigen(selects.origen));
    dispatch(filtroDestino(selects.destino));
    dispatch(filtroAsientos(selects.asientos));
    dispatch(filtroChecksFumador(checkedArray.fumador));
    dispatch(filtroChecksMascota(checkedArray.mascota));
    dispatch(filtroChecksEquipaje(checkedArray.equipaje));
    dispatch(filtroChecksBarbijo(checkedArray.barbijo));
    // console.log(viajesFiltrados);
    // setIsCheckedFumador(false);
    // setIsCheckedMascota(false);
    // setIsCheckedEquipaje(false);
    // setIsCheckedBarbijo(false);
    setSelects({
      origen: "",
      destino: "",
      asientos: ""
    });
  }

  function handleLimpiarFiltros(e) {
    e.preventDefault();
    dispatch(getViajesTotal());
    setIsCheckedFumador(false);
    setIsCheckedMascota(false);
    setIsCheckedEquipaje(false);
    setIsCheckedBarbijo(false);
    
    setCheckedArray({
      fumador: false,
      mascota: false,
      equipaje: false,
      barbijo: false
    });
  }

  return (
    <div>
      <select onChange={(e) => handleFiltroOrigen(e)}>
        <option value="default" disabled selected>
          Filtrar por origen
        </option>
      </select>
      <select onChange={(e) => handleFiltroDestino(e)}>
        <option value="default" disabled selected>
          Filtrar por destino
        </option>
      </select>
      <select onChange={(e) => handleFiltroAsientos(e)}>
        <option value="default" disabled selected>
          Filtrar por asientos disponibles
        </option>
        <option value="1"> 1 </option>
        <option value="2">2 </option>
        <option value="3">3 </option>
        <option value="4">4 </option>
        <option value="5">5 </option>
        <option value="6">6 </option>
        <option value="7">7 </option>
      </select>
      <div>
        {/* <div key="0"> */}
        Acepta Fumador
        <input
          key="0"
          type="checkbox"
          name="fumador"
          value="fumador"
          checked={isCheckedFumador}
          onChange={handleOnChangeFumador}
        />
        {/* </div> */}
        {/* <div key="1"> */}
        Acepta Mascota
        <input
          key="1"
          type="checkbox"
          name="mascota"
          value="mascota"
          checked={isCheckedMascota}
          onChange={handleOnChangeMascota}
        />
        {/* </div> */}
        {/* <div key="2"> */}
        Acepta Equipaje
        <input
          key="2"
          type="checkbox"
          name="equipaje"
          value="equipaje"
          checked={isCheckedEquipaje}
          onChange={handleOnChangeEquipaje}
        />
        {/* </div> */}
        {/* <div > */}
        Usa Barbijo
        <input
          key="3"
          type="checkbox"
          name="barbijo"
          value="barbijo"
          checked={isCheckedBarbijo}
          onChange={handleOnChangeBarbijo}
        />
        {/* </div> */}
      </div>
      <button type="submit" onClick={handleSubmit}>
        Aplicar Filtros
      </button>
      <button type="submit" onClick={handleLimpiarFiltros}>
        Limpiar Filtros
      </button>
    </div>
  );
}
