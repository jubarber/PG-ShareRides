import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import {
  getViajesTotal,
  filtroOrigen,
  filtroDestino,
  filtroAsientos,
  filtroChecksFumador,
  filtroChecksEquipaje,
  filtroChecksMascota,
  filtroChecksBarbijo,
} from "../redux/actions/actions";
=======
import { getViajesTotal, filtroChecks } from "../redux/actions/actions";
>>>>>>> develop

export function Filtros() {
  const dispatch = useDispatch();
  const viajesFiltrados = useSelector((state) => state.viajesFiltrados?.flat());
  const viajesTotal = useSelector((state) => state.viajes);
<<<<<<< HEAD
  const [checkedArray, setCheckedArray] = useState({
    fumador: false,
    mascota: false,
    equipaje: false,
    barbijo: false,
  });
  const [isCheckedFumador, setIsCheckedFumador] = useState(false);
  const [isCheckedMascota, setIsCheckedMascota] = useState(false);
  const [isCheckedEquipaje, setIsCheckedEquipaje] = useState(false);
  const [isCheckedBarbijo, setIsCheckedBarbijo] = useState(false);
  const [selects, setSelects] = useState({
    origen: "",
    destino: "",
    asientos: "",
  });
=======
  const [isChecked, setIsChecked] = useState(new Array(4).fill(false));
  const [asiento, setAsiento] = useState("");
>>>>>>> develop

  const filtrosArray = [
    {
      id: 1,
      name: "fumador"
    },
    {
      id: 2,
      name: "mascota"
    },
    {
      id: 3,
      name: "equipaje"
    },
    {
      id: 4,
      name: "barbijo"
    }
  ];

  useEffect(() => {
    dispatch(getViajesTotal());
  }, [dispatch]);

  useEffect(() => {
    console.log("viajes filtrados", viajesFiltrados);
  }, [viajesTotal, viajesFiltrados]);

  const handleOnChange = (position) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
  };

  function handleSelectAsientos(e) {
    e.preventDefault();
    setAsiento(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
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
      asientos: "",
    });
=======
    dispatch(filtroChecks(isChecked, asiento));
>>>>>>> develop
  }

  function handleLimpiarFiltros(e) {
    e.preventDefault();
    dispatch(getViajesTotal());
<<<<<<< HEAD
    setIsCheckedFumador(false);
    setIsCheckedMascota(false);
    setIsCheckedEquipaje(false);
    setIsCheckedBarbijo(false);

    setCheckedArray({
      fumador: false,
      mascota: false,
      equipaje: false,
      barbijo: false,
    });
=======
    let estadoLimpio = [false, false, false, false];
    setIsChecked(estadoLimpio);
    setAsiento("");
>>>>>>> develop
  }

  return (
    <div>
      <select onChange={(e) => handleSelectAsientos(e)}>
        <option value="default" disabled selected>
          Filtrar por asientos disponibles
        </option>
        <option value="1">1 </option>
        <option value="2">2 </option>
        <option value="3">3 </option>
        <option value="4">4 </option>
        <option value="5">5 </option>
        <option value="6">6 </option>
        <option value="7">7 </option>
      </select>
      <div>
        {filtrosArray.map((e, index) => {
          return (
            <div>
              <label>{e.name}</label>
              <input
                type="checkbox"
                key={e.id}
                name={e.name}
                value={e.name}
                checked={isChecked[index]}
                onChange={() => {
                  handleOnChange(index);
                }}
              />
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="submit"
          value="aplicar filtros"
          name="aplicar filtros"
          onClick={handleSubmit}
        />
        <input
          type="submit"
          value="limpiar filtros"
          name="limpiar filtros"
          onClick={handleLimpiarFiltros}
        />
      </div>
    </div>
  );
}
