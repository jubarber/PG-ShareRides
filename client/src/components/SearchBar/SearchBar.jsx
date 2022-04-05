import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchOrigen,  searchDestino} from "../../redux/actions/actions";

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
     dispatch(searchOrigen(origen))
      setOrigen("");
    }
  }
  function handleSubmitDestino(e) {
    e.preventDefault();
    if (destino === "") {
      alert("Escriba un destino");
    } else {
     dispatch(searchDestino(destino))
      setDestino("");
    }
  }


  return (
    
    <div>
      <form onSubmit={handleSubmitOrigen}>
        <input
          type="text"
          placeholder="Buscar origen"
          onChange={(e) => handleOrigen(e)}
        />
        <button type="submit">Buscar</button>
      </form>
     
      <form onSubmit={handleSubmitDestino}>
        <input
          type="text"
          placeholder="Buscar destino"
          onChange={(e) => handleDestino(e)}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}
