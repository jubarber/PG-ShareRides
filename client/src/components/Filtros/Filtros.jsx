import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getViajesTotal, filtroChecks } from "../../redux/actions/actions";
import "./Filtros.css";
import Button from "@mui/material/Button";

export function Filtros() {
  const dispatch = useDispatch();
  const viajesFiltrados = useSelector((state) => state.viajesFiltrados?.flat());
  const viajesTotal = useSelector((state) => state.viajes);
  const [isChecked, setIsChecked] = useState(new Array(4).fill(false));
  const [asiento, setAsiento] = useState("");

  const filtrosArray = [
    {
      id: 1,
      name: "Fumador",
    },
    {
      id: 2,
      name: "Mascota",
    },
    {
      id: 3,
      name: "Equipaje",
    },
    {
      id: 4,
      name: "Barbijo",
    },
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
    dispatch(filtroChecks(isChecked, asiento));
  }

  function handleLimpiarFiltros(e) {
    e.preventDefault();
    dispatch(getViajesTotal());
    let estadoLimpio = [false, false, false, false];
    setIsChecked(estadoLimpio);
    setAsiento("");
  }

  return (
    <div className="contenedor-filtros" class="font-mono">
      <div className="asientos">
        <select className="select" onChange={(e) => handleSelectAsientos(e)}>
          <option value="default" disabled selected>
            Asientos disponibles
          </option>
          <option value="1">1 </option>
          <option value="2">2 </option>
          <option value="3">3 </option>
          <option value="4">4 </option>
          <option value="5">5 </option>
          <option value="6">6 </option>
          <option value="7">7 </option>
        </select>
        <div className="checkboxes">
          {filtrosArray.map((e, index) => {
            return (
              <div>
                <label className="mycheckbox">
                  {e.name}
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
                  <span></span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="aplicar-limpiar">
        <button
          className="button_filtros"
          type="submit"
          value="Aplicar filtros"
          name="Aplicar filtros"
          onClick={handleSubmit}
        >
          Aplicar filtros
        </button>
        <button
          className="button_filtros"
          type="submit"
          value="Limpiar filtros"
          name="Limpiar filtros"
          onClick={handleLimpiarFiltros}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
