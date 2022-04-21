import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchOrigen,
  searchDestino,
  getViajesTotal,
} from "../../redux/actions/actions";
import "./SearchBar.css";
import { BsSearch } from "react-icons/bs";
import Button from "@mui/material/Button";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  function handleOrigen(e) {
    e.preventDefault();
    setOrigen(e.target.value);
  }
  function handleDestino(e) {
    e.preventDefault();
    setDestino(e.target.value);
  }
  function handleSubmitOrigen(e) {
    e.preventDefault();
    if (origen === "") {
      alert("Escriba un origen");
    } else {
      dispatch(searchOrigen(origen));
      setDestino("")
    }
  }
  function handleSubmitDestino(e) {
    e.preventDefault();
    if (destino === "") {
      alert("Escriba un destino");
    } else {
      dispatch(searchDestino(destino));
      setOrigen("")
    }
  }
  function handleSubmitLimpiar(e) {
    e.preventDefault();
    setOrigen("");
    setDestino("");
    dispatch(getViajesTotal());
  }

  return (
    <div className="searchbar__container">
      <form className="searchbar__form" onSubmit={handleSubmitOrigen}>
        <input
          className="searchbar__input text-black"
          type="text"
          name={origen}
          value={origen}
          placeholder="Buscar origen"
          onChange={(e) => handleOrigen(e)}
        />
        <button type="submit" className="searchbar__btn">
          <BsSearch size="25" />
        </button>
      </form>
      <form className="searchbar__form" onSubmit={handleSubmitDestino}>
        <input
          className="searchbar__input"
          type="text"
          name={destino}
          value={destino}
          placeholder="Buscar destino"
          onChange={(e) => handleDestino(e)}
        />
        <button type="submit" className="searchbar__btn">
          <BsSearch size="25" />
        </button>
      </form>
      <div className="searchbar__pos__btn">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
          value="Limpiar filtros"
          name="Limpiar filtros"
          onClick={handleSubmitLimpiar}
        >
          Limpiar búsqueda
        </Button>
      </div>
    </div>
  );
}
