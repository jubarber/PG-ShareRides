import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getViajesTotal, login } from "../../redux/actions/actions";
import { Filtros } from "../Filtros/Filtros";
// import { DetalleViaje } from "../DetalleViaje/DetalleViaje";
import CardViajeUsuario from "../CardViaje/CardViajeUsuario/Conductor/CardViajeUsuario";
import "./Home.css";
import fondo from "../../assets/fondo perfil.jpg";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import Cookies from "universal-cookie"

export default function Home() {
  const cookies = new Cookies()
  const dispatch = useDispatch();
  const viajes = useSelector(
    (state) => state.viajesFiltrados //me traigo el estado de los viajes para poder mostrarlos
  );
  const cookieMail = cookies.get("email")
  useEffect(() => {
    //se monta home y despacho la accion para obtener los viajes
    dispatch(login(cookieMail))
    dispatch(getViajesTotal());
  }, [dispatch]);
  console.log("estos es lo que llega", viajes);
  return (
    <div>
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
                >
                  <MenuItem value="Conductore">Conductore</MenuItem>
                  <MenuItem value="Pasajere">Pasajere</MenuItem>
                </Select>
              </FormControl>
            </label>
          </div>
          <div className="container-cards">
            {viajes.map(
              (e) =>
                e && (
                  <Link to={"/detalle/" + e.id}>
                    <div className="card-home">
                      <CardViajeUsuario
                        origen={e.origen}
                        destino={e.destino}
                        fecha={e.fecha}
                        hora={e.hora}
                        asientosAOcupar={e.asientosAOcupar}
                        aceptaEquipaje={e.aceptaEquipaje}
                        aceptaFumador={e.aceptaFumador}
                        aceptaMascota={e.aceptaMascota}
                        usaBarbijo={e.usaBarbijo}
                        viajeDisponible={e.viajeDisponible}
                        key={e.id}
                        id={e.id}
                        nombre={
                          e.usuarios.length > 0 ? (
                            e.usuarios[0].nombre
                          ) : (
                            <>undefined</>
                          )
                        }
                        apellido={
                          e.usuarios.length > 0 ? (
                            e.usuarios[0].apellido
                          ) : (
                            <>undefined</>
                          )
                        }
                      />
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
