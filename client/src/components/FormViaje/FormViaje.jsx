import React, { useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import fondo from "../../assets/fondo perfil.jpg";
import "./FormViaje.css";
import CheckBox from "@mui/material/Checkbox";
>>>>>>> develop

export default function FormViaje() {
  const [isChecked, setIsChecked] = useState({
    pasajero: false,
    conductor: false,
  });

  function handleOnChange(e) {
    setIsChecked({
      ...isChecked,
      [e.target.name]: !isChecked[e.target.name],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isChecked.pasajero === true && isChecked.conductor === false) {
      window.location.href = "/formpasajero";
    }
    if (isChecked.conductor === true && isChecked.pasajero === false) {
      window.location.href = "/formvehiculo";
    }
    if (isChecked.pasajero && isChecked.conductor) {
      alert("Debes selecionar uno solo");
    }
  }

  return (
<<<<<<< HEAD
    <div>
      <div>
        <label>Pasajere</label>
        <input
          type="checkbox"
          value="pasajero"
          name="pasajero"
          checked={isChecked.pasajero}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
      </div>

      <div>
        <label>Conductore</label>
        <input
          type="checkbox"
          value="conductor"
          name="conductor"
          checked={isChecked.conductor}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
      </div>

      <div>
        <input type="submit" value="siguiente" onClick={handleSubmit} />
=======
    <div className="contenedor_formviaje">
      <div className="pasajero_conductor">
        <div className="label_check">
          <label className="label-formviaje">Pasajere</label>
          <CheckBox
            type="checkbox"
            value="pasajero"
            name="pasajero"
            checked={isChecked.pasajero}
            onChange={(e) => {
              handleOnChange(e);
            }}
            color="secondary"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
          />
        </div>

        <div className="label_check">
          <label className="label-formviaje">Conductore</label>
          <CheckBox
            type="checkbox"
            value="conductor"
            name="conductor"
            checked={isChecked.conductor}
            onChange={(e) => {
              handleOnChange(e);
            }}
            color="secondary"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
          />
        </div>
      </div>

      <div className="input-btn">
        <input
          type="submit"
          value="siguiente"
          onClick={handleSubmit}
          className="btn-formviaje"
        />
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
>>>>>>> develop
      </div>
    </div>
  );
}
