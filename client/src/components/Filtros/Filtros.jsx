import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getViajesTotal, filtroChecks } from "../../redux/actions/actions";
import "./Filtros.css";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import SearchBar from "../SearchBar/SearchBar";

export function Filtros() {
  const dispatch = useDispatch();
  const viajesFiltrados = useSelector((state) => state.viajesFiltrados?.flat());
  const viajesTotal = useSelector((state) => state.viajes);
  const [isChecked, setIsChecked] = useState(new Array(4).fill(false));
  const [asiento, setAsiento] = useState("");

  const filtrosArray = [
    {
      id: 1,
      name: "Viajes que aceptan Fumador",
    },
    {
      id: 2,
      name: "Viajes que aceptan Mascota",
    },
    {
      id: 3,
      name: "Viajes que aceptan Equipaje",
    },
    {
      id: 4,
      name: "Viajes que exigen uso de Barbijo",
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
    <div className="contenedor-filtros">
      <div className="asientos">
        <div>
          <SearchBar />
        </div>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 175 }}>
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ color: "white" }}
            className="input-Select"
          >
            Asientos disponibles
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={(e) => handleSelectAsientos(e)}
            sx={{ borderColor: "white" }}
          >
            <MenuItem value="1">1 </MenuItem>
            <MenuItem value="2">2 </MenuItem>
            <MenuItem value="3">3 </MenuItem>
            <MenuItem value="4">4 </MenuItem>
            <MenuItem value="5">5 </MenuItem>
            <MenuItem value="6">6 </MenuItem>
            <MenuItem value="7">7 </MenuItem>
          </Select>
        </FormControl>
        <div className="checkboxes">
          {filtrosArray.map((e, index) => {
            return (
              <div key={e.id}>
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
        <div className="aplicar-limpiar">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            type="submit"
            value="Aplicar filtros"
            name="Aplicar filtros"
            onClick={handleSubmit}
          >
            Aplicar filtros
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            type="submit"
            value="Limpiar filtros"
            name="Limpiar filtros"
            onClick={handleLimpiarFiltros}
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
