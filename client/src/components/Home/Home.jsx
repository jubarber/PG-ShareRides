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

export default function Home() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [habilitarBot, setHabilitarBot] = useState(false);
  const [render, setRender] = useState("");
  const viajes = useSelector((state) => state.viajesFiltrados);
  const viajesUsuario = useSelector((state) => state.viajesPorUsuario);
  const cookieMail = cookies.get("email");
  let newDate = new Date();
  let dia = newDate.getDate();
  let mes = newDate.getMonth() + 1;
  let prueba = (new Date().toLocaleString() + "").slice(11, 16);
  useEffect(() => {
    dispatch(getViajesTotalUsuario(cookieMail));
  }, []);
  console.log("viajes", viajes);
  useEffect(() => {
    dispatch(login(cookieMail));
    dispatch(filterPerCard(render));
    dispatch(getUsuarios());
  }, []);

  function handleChange(e) {
    dispatch(filterPerCard(e.target.value));
    setRender(e.target.value);
  }

  function handleSubmitLimpiar(e) {
    dispatch(getViajesTotal());
  }

  function handleBot(e){
    e.preventDefault();
    setHabilitarBot(!habilitarBot)
  }
  let viajesDisponibles = [];

  viajes.map((e) => {
    e.viajeDisponible === true && viajesDisponibles.push(e);
  });
  console.log("cookieMail", cookieMail);

  return (
    <div>
      <NavBar />
      <div className="home-general">
        <div>
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
                  parseInt(e.fecha.slice(8, 10)) >= parseInt(dia) &&
                  parseInt(e.hora.replace(":", "")) >
                    parseInt(prueba.replace(":", "")) && (
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
                          </Link>
                        ) : (
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
                      )}
                    </div>
                  )
              )
            ) : (
              <div>No hay viajes disponibles</div>
            )}
          </div>
        </div>
        <div className="bot-conteiner">
                  
          {
        habilitarBot ? ( <Bot />) : (<></>)
          }
           <button onClick={(e) =>handleBot(e)}className="btn-bot">Ayuda </button>
        </div>
      </div>

      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
