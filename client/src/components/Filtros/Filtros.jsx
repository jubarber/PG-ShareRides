import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getViajesTotal, filtros } from "../../redux/actions/actions";
import "./Filtros.css";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";

export function Filtros() {
  const dispatch = useDispatch();
  let select = {};
  
  const filtrosArray = [
    {
      id: 1,
      name: "Viajes que aceptan Fumador",
      value: "fumador",
    },
    {
      id: 5,
      name: "Viajes que no aceptan Fumador",
      value: "noFumador",
    },
    {
      id: 2,
      name: "Viajes que aceptan Mascota",
      value: "mascota",
    },
    {
      id: 3,
      name: "Viajes que aceptan Equipaje",
      value: "equipaje",
    },
    {
      id: 4,
      name: "Viajes que exigen uso de Barbijo",
      value: "barbijo",
    },
  ];

  useEffect(() => {
    dispatch(getViajesTotal());
  }, [dispatch]);

  function handleSelect(e) {
    e.preventDefault();
    if (e.target.value === "fumador") {
      select.aceptaFumador = true;
      dispatch(filtros(select));
    }
    if (e.target.value === "mascota") {
      select.aceptaMascota = true;
      dispatch(filtros(select));
    }
    if (e.target.value === "equipaje") {
      select.aceptaEquipaje = true;
      dispatch(filtros(select));
    }
    if (e.target.value === "barbijo") {
      select.usaBarbijo = true;
      dispatch(filtros(select));
    }
    if (e.target.value === "noFumador") {
      select.noAceptaFumador = true;
      dispatch(filtros(select));
    }
  }

  return (
    <div className="contenedor-filtros">
      <div className="asientos">
        <div>
          <SearchBar />
        </div>
        <div>
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ color: "white" }}
            className="input-Select"
          >
            Filtrar por:
          </InputLabel>
          <select className="select-filtros">
            {filtrosArray.map((f) => {
              return (
                <option key={f.id} value={f.value}>
                  {f.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
