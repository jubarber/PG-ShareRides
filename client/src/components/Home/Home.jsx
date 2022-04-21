import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getViajesTotal,
  login,
  filterPerCard,
  getUsuarios,
  getViajesTotalUsuario,
} from "../../redux/actions/actions";
import { Filtros } from "../Filtros/Filtros";
import CardViajeUsuarioPasajere from "../CardViaje/CardViajeUsuario/Pasajero/CardViajeUsuario";
import CardViajeUsuarioConductore from "../CardViaje/CardViajeUsuario/Conductor/CardViajeUsuario";
import "./Home.css";
import fondo from "../../assets/fondo perfil.jpg";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";
import Bot from "../Bot/Chatbot";
import { AiFillCaretDown } from "react-icons/ai";
import imagen from "../../assets/not found.png"

export default function Home() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [habilitarBot, setHabilitarBot] = useState(false);
  const [habilitarFiltros, setHabilitarFiltros] = useState(false);
  const [render, setRender] = useState("");
  const viajes = useSelector(state => state.viajesFiltrados);
  const cookieMail = cookies.get("email");

  let newDate = new Date();
  let dia = newDate.getDate();
  let mes = newDate.getMonth() + 1;

  let hora = (new Date().toLocaleString() + "").slice(11, 16);
  useEffect(() => {
    dispatch(login(cookieMail));
    dispatch(getViajesTotal());
    dispatch(getViajesTotalUsuario(cookieMail));
    dispatch(filterPerCard(render));
    dispatch(getUsuarios());
  }, []);
  
  // console.log("viajes", viajes);
  function handleChange(e) {
    dispatch(filterPerCard(e.target.value));
    setRender(e.target.value);
  }

  function handleSubmitLimpiar(e) {
    dispatch(getViajesTotal());
  }


  function handleHabilitarFiltros(e) {
    e.preventDefault();
    setHabilitarFiltros(!habilitarFiltros);
  }

  function handleBot(e) {
    e.preventDefault();
    setHabilitarBot(!habilitarBot);
  }
  let viajesDisponibles = [];

  viajes?.map((e) => {
    e.viajeDisponible === true && viajesDisponibles.push(e);
  });

  return (
    <div>
      <NavBar />{" "}
      <button
        className="home-Show-Filtros"
        onClick={(e) => handleHabilitarFiltros(e)}
      >
        <label>Filtros</label> <AiFillCaretDown />
      </button>
      {habilitarFiltros ? (
        <div className="home-Filtros">
          <Filtros />
        </div>
      ) : (
        <div></div>
      )}
      <div className="home-general">
        <div className="home-general-filtros">
          <Filtros />
        </div>
        <div id="general-card">
          <div>
            <label className="label-formControl">
              Busco:
              <FormControl sx={{ m: 1, minWidth: 190 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "white" }}
                >
                  Selecciona tu puesto
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Selecciona tu puesto"
                  value={render}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value="conductor">Conductore</MenuItem>
                  <MenuItem value="pasajero">Pasajere</MenuItem>
                </Select>
              </FormControl>
            </label>
          </div>
          <div className="container-cards">
            {viajesDisponibles.length !== 0 ? (
              viajesDisponibles.map(
                (e) =>
                  e &&
                  parseInt(e.fecha.slice(5, 7)) >= parseInt(mes) &&
                  ((parseInt(e.fecha.slice(8, 10)) >= parseInt(dia)) ||
                  (parseInt(e.fecha.slice(5, 7)) > parseInt(mes))) &&
                  ((parseInt(e.hora.replace(":", "")) > parseInt(hora.replace(":", "")) ||
                    parseInt(e.fecha.slice(5, 7)) > parseInt(mes) ||
                    parseInt(e.fecha.slice(8, 10)) > parseInt(dia))) && 
                    (
                    <div className="card-home">
                      {e.status === "pasajero" ? (
                        cookieMail !== "undefined" && cookieMail !== "" ? (
                          <Link to={"/detallep/" + e.id}>
                            <CardViajeUsuarioPasajere
                              origen={e.origen}
                              destino={e.destino}
                              fecha={
                                e.fecha.includes("T")
                                  ? e.fecha
                                      .substring(0, 10)
                                      .split("-")
                                      .reverse()
                                      .join("-")
                                  : e.fecha
                              }
                              hora={e.hora}
                              asientosAOcupar={e.asientosAOcupar}
                              aceptaEquipaje={e.aceptaEquipaje}
                              aceptaFumador={e.aceptaFumador}
                              aceptaMascota={e.aceptaMascota}
                              usaBarbijo={e.usaBarbijo}
                              viajeDisponible={e.viajeDisponible}
                              detalles={e.detalles}
                              key={e.id}
                              id={e.id}
                              avatar={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].avatar
                                ) : (
                                  <div />
                                )
                              }
                              nombre={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].nombre
                                ) : (
                                  <div />
                                )
                              }
                              apellido={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].apellido
                                ) : (
                                  <div />
                                )
                              }
                              email={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].email
                                ) : (
                                  <div />
                                )
                              }
                              puntuacion={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].puntuacion
                                ) : (
                                  <div />
                                )
                              }
                            />
                          )
                        ) : cookieMail !== "undefined" && cookieMail !== "" ? (
                          <Link to={"/detallec/" + e.id}>
                            <CardViajeUsuarioConductore
                              origen={e.origen}
                              destino={e.destino}
                              fecha={
                                e.fecha.includes("T")
                                  ? e.fecha
                                      .substring(0, 10)
                                      .split("-")
                                      .reverse()
                                      .join("-")
                                  : e.fecha
                              }
                              hora={e.hora}
                              asientosAOcupar={e.asientosAOcupar}
                              aceptaEquipaje={e.aceptaEquipaje}
                              aceptaFumador={e.aceptaFumador}
                              aceptaMascota={e.aceptaMascota}
                              usaBarbijo={e.usaBarbijo}
                              viajeDisponible={e.viajeDisponible}
                              key={e.id}
                              id={e.id}
                              avatar={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].avatar
                                ) : (
                                  <div />
                                )
                              }
                              nombre={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].nombre
                                ) : (
                                  <div />
                                )
                              }
                              apellido={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].apellido
                                ) : (
                                  <div />
                                )
                              }
                              email={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].email
                                ) : (
                                  <div />
                                )
                              }
                              puntuacion={
                                e.usuarios.length > 0 ? (
                                  e.usuarios[0].puntuacion
                                ) : (
                                  <div />
                                )
                              }
                            />
                          </Link>
                        ) : (
                          <CardViajeUsuarioConductore
                            origen={e.origen}
                            destino={e.destino}
                            fecha={
                              e.fecha.includes("T")
                                ? e.fecha
                                    .substring(0, 10)
                                    .split("-")
                                    .reverse()
                                    .join("-")
                                : e.fecha
                            }
                            hora={e.hora}
                            asientosAOcupar={e.asientosAOcupar}
                            aceptaEquipaje={e.aceptaEquipaje}
                            aceptaFumador={e.aceptaFumador}
                            aceptaMascota={e.aceptaMascota}
                            usaBarbijo={e.usaBarbijo}
                            viajeDisponible={e.viajeDisponible}
                            key={e.id}
                            id={e.id}
                            avatar={ e.usuarios &&
                              e.usuarios.length > 0 ? (
                                e.usuarios[0].avatar
                              ) : (
                                <div />
                              )
                            }
                            nombre={
                              e.usuarios.length > 0 ? (
                                e.usuarios[0].nombre
                              ) : (
                                <div />
                              )
                            }
                            apellido={
                              e.usuarios.length > 0 ? (
                                e.usuarios[0].apellido
                              ) : (
                                <div />
                              )
                            }
                            email={
                              e.usuarios.length > 0 ? (
                                e.usuarios[0].email
                              ) : (
                                <div />
                              )
                            }
                            puntuacion={
                              e.usuarios.length > 0 ? (
                                e.usuarios[0].puntuacion
                              ) : (
                                <div />
                              )
                            }
                          />
                        )}
                      </div>
                    ))
              )
            ) : (
              <div>
                <h3 className="no-disponible">No hay viajes disponibles</h3>
                <img className="imagen" src={imagen} alt=""/>
              </div>
            )}
          </div>
        </div>
        <div className="bot-conteiner">

          {habilitarBot ? <Bot /> : <div></div>}

          <button onClick={(e) => handleBot(e)} className="btn-bot">
            Ayuda{" "}
          </button>
        </div>
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
