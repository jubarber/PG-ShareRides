import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDetalleViaje,
  postOrder,
  postColaboracion,
  sumarseAlViaje,
  modificarViaje,
  getViajesTotalUsuario
} from "../../../redux/actions/actions";
import NavBar from "../../NavBar/NavBar";
import "./DetalleViaje.css";
import { MdSmokeFree, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { VscLocation } from "react-icons/vsc";
import fondo from "../../../assets/fondo perfil.jpg";
import Cookies from "universal-cookie";
import axios from "axios";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FaUserCircle } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import swal from "sweetalert";
import Swal from "sweetalert2";

export const DetalleViajec = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viaje = useSelector((state) => state.viajePorId);
  const viajesUsuario = useSelector((state) => state.viajesPorUsuario);
  const { id } = useParams();
  const cookieMail = cookies.get("email");
  let fechaViaje = "";

  let viajesPorUsuario = useSelector(state => state.viajesPorUsuario)
  // console.log(viajesPorUsuario)
  const [ocultarBoton, setOcultarBoton] = useState(null)

  useEffect(
    () => {
      dispatch(getDetalleViaje(id));
      dispatch(getViajesTotalUsuario(cookieMail))
    },
    [id]
  );

  useEffect(() => {
    if(viajesPorUsuario.length!==0){
      let array = viajesPorUsuario.map(v => console.log(v.usuarios.map(u=>u.email.includes(cookieMail))));
      if(array.map(e => e === true)) setOcultarBoton(true)
    } 
  }, [viajesPorUsuario])

  if (viaje.length!==0 && viaje.fecha.length!==0) {
    viaje.fecha.includes("T")
      ? (fechaViaje = viaje.fecha
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("-"))
      : (fechaViaje = viaje.fecha);
  }

  const [datosMp, setDatosMp] = useState({
    unit_price: "",
    orderId: "",
    title: "Colaboracion Viaje",
    quantity: 1,
    usuarioPagador: cookieMail,
    usuarioCobrador: "",
    viajeId: id,
  });

  useEffect(() => {
    if (viaje.length !== 0) {
      if (viaje.usuarios.length !== 0) {
        setDatosMp({
          ...datosMp,
          usuarioCobrador: viaje.usuarios[0].email,
        });
      }
    }
  }, [viaje]);

  const [sumarse, setSumarse] = useState({
    id: id,
    email: cookieMail,
  });

  const handleColaborar = async () => {
    await dispatch(postOrder(cookieMail)).then((data) => {
      if (data.length !== 0) {
        setDatosMp({ ...datosMp, orderId: data.payload[0].id });
      }
    });
  };

  const [redirect, setRedirect] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postColaboracion(datosMp));
    if (datosMp.length !== 0) {
      axios
        .get(
          `http://localhost:3001/api/mercadopago/${datosMp.orderId}/${datosMp.unit_price}`
        )
        .then((r) => setRedirect(r.data));
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setDatosMp({
      ...datosMp,
      unit_price: parseInt(e.target.value),
    });
  }

  function handleSumarse(e) {
    e.preventDefault();
    let newArr = [];
    if (viajesUsuario.length !== 0) {
      viajesUsuario.map((e) => {
        if (
          e.fecha.substring(0, 10).split("-").reverse().join("-") ===
          viaje.fecha.substring(0, 10).split("-").reverse().join("-")
        ) {
          newArr.push(e);
        }
      });
      if (newArr.length !== 0) {
        Swal.fire({
          title: "Ya tienes un viaje programado para este día",
          icon: "warning",
          text: "No puedes participar de dos viajes el mismo día. Serás redireccionade al inicio",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/home");
        });
      } else {
        Swal.fire({
          title: "Estás a punto de sumarte a este viaje",
          icon: "warning",
          text: "Por favor, revisá bien todos los detalles antes de confirmar",
          confirmButtonText: "Sumarme!",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        })
          .then((r) => {
            if (r.isConfirmed) {
              dispatch(sumarseAlViaje(sumarse));
              dispatch(modificarViaje(viaje));
            }
          })
          .then(() => {
            Swal.fire({
              title: "Te has sumado al viaje correctamente!",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            }).then(() => {
              navigate("/home");
            });
          });
      }
    }

    // dispatch(sumarseAlViaje(sumarse));
    // dispatch(modificarViaje(viaje));
    // swal({
    //   title: "Te has sumado al viaje correctamente!",
    //   icon: "success",
    //   button: "Bienvenidx!",
    // }).then(() => {
    //   navigate("/home");
    // });
  }
  if (viaje.length!==0 && viaje.usuarios.length!==0) {
    var viajeUsuarios = viaje.usuarios.map(e => e.email);
    // console.log(viajeUsuarios);
    var viajesTotales = viajeUsuarios.map(e => e.includes(cookieMail));
    // console.log(viajesTotales);
    var arrayPasajeres = viaje.usuarios.map(e => e);
    // console.log(arrayPasajeres);
  }

  return (
    <div>
      {viaje?.length !== 0 &&
        <div className="container-detalle">
          <NavBar />
          <div className="card-detalle">
            <div className="card-usuario-detalle">
              <div className="card-usuario-infper-detalle">
                <div className="card-usuario-img-detalle">
                  <img
                    src={viaje.usuarios ? viaje.usuarios[0].avatar : null}
                    alt=""
                  />
                </div>
                <div className="card-usuario-nombre-val-detalle text-xl">
                  <span className="text-white my-9">
                    {viaje.usuarios ? (
                      viaje.usuarios[0].nombre +
                      " " +
                      viaje.usuarios[0].apellido
                    ) : (
                      <div />
                    )}
                  </span>
                  <span>
                    <div className="puntuacion">
                      {viaje.usuarios ? (
                        viaje.usuarios[0].puntuacion === 5 ? (
                          <div>
                            <ImStarFull className="black" />
                            <ImStarFull className="black" />
                            <ImStarFull className="black " />
                            <ImStarFull className="black" />
                            <ImStarFull className="black " />
                          </div>
                        ) : viaje.usuarios[0].puntuacion === 4 ? (
                          <div>
                            {" "}
                            <ImStarFull className="black" />
                            <ImStarFull className="black " />
                            <ImStarFull className="black" />
                            <ImStarFull className="black " />
                            <ImStarEmpty className="black" />
                          </div>
                        ) : viaje.usuarios[0].puntuacion === 3 ? (
                          <div>
                            <ImStarFull className="black " />
                            <ImStarFull className="black" />
                            <ImStarFull className="black " />
                            <ImStarEmpty className="black" />
                            <ImStarEmpty className="black" />
                          </div>
                        ) : viaje.usuarios[0].puntuacion === 2 ? (
                          <div>
                            <ImStarFull className="black" />
                            <ImStarFull className="black " />
                            <ImStarEmpty className="black" />
                            <ImStarEmpty className="black" />
                            <ImStarEmpty className="black" />
                          </div>
                        ) : viaje.usuarios[0].puntuacion === 1 ? (
                          <div>
                            <ImStarFull className="black " />
                            <ImStarEmpty className="black" />
                            <ImStarEmpty className="black" />
                            <ImStarEmpty className="black" />
                            <ImStarEmpty className="black" />
                          </div>
                        ) : (
                          <div />
                        )
                      ) : (
                        <div />
                      )}
                    </div>
                  </span>
                </div>
              </div>
              <span className="ml-4 text-xl">Acerca de mi</span>
              <div className="card-usuario-resumen-detalle rounded-sm">
                <span className="m-2">
                  {viaje.usuarios ? viaje.usuarios[0].acercaDeMi : <div />}
                </span>
              </div>
              <span>Detalles del viaje</span>
              <div className="card-usuario-resumen-detalle rounded-sm">
                <span className="m-2">{viaje.detalles}</span>
              </div>
              <div className="btn-detalle">
                <button className="detalle-mensaje">
                  <Link to="/login">Enviar mensaje</Link>
                </button>
                {viajesTotales !== [] && viajesTotales.includes(true) ? null : (
                  <form onSubmit={(e) => handleSumarse(e)}>
                    <input
                      className="detalle-mensaje"
                      type="submit"
                      value="Sumarse al viaje"
                    />
                  </form>
                )}
              </div>
              <br />
              {ocultarBoton !== true &&
              (!redirect
                ? <button
                    onClick={() => {
                      handleColaborar();
                    }}
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Quiero Colaborar!
                  </button>
                : <button
                    onClick={() => {
                      handleColaborar();
                    }}
                    class="btn btn-success"
                    disabled="disabled"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Quiero Colaborar!
                  </button>)}
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel" />
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div class="modal-body">
                      <h3>Por favor, especificá el monto que deseas aportar</h3>
                      <br />
                      <input
                        class="form-control"
                        type="number"
                        placeholder="Monto a cobrar"
                        name="unit_price"
                        value={datosMp.unit_price}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div class="modal-footer">
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <button
                          type="submit"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Continuar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              {redirect !== "" && (
                <a href={`${redirect}`}>
                  <input
                    class="btn btn-success"
                    type="submit"
                    value="Continuar a MercadoPago"
                    name="Continuar a MercadoPago"
                  />
                </a>
              )}
            </div>
            <div className="card-viaje-detalle text-xl">
              <div className="flex flex-col justify-evenly w-full ml-4">
                <span>Desde: </span>
                <span className="text-2xl flex items-center text-green-400">
                  <VscLocation />
                  {viaje.origen}
                </span>
                <span>Hacia:</span>
                <span className="text-2xl flex items-center text-red-600">
                  <VscLocation />
                  {viaje.destino}
                </span>
                <span>
                  Fecha:{" "}
                  <span className="font-bold">
                    {viaje.fecha.includes("T")
                      ? viaje.fecha
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")
                      : viaje.fecha}
                  </span>
                </span>
                <span>
                  Hora: <span className="font-bold">{viaje.hora}</span>
                </span>
              </div>
              <div className="flex flex-col justify-evenly w-full ml-4">
                <span>
                  Cantidad de asientos disponibles:{" "}
                  <span
                    className={`font-bold text-2xl ${
                      viaje.asientosAOcupar > 3
                        ? "text-sky-600"
                        : viaje.asientosAOcupar < 1
                        ? "text-amber-500"
                        : "text-orange-700"
                    }`}
                  >
                    {viaje.asientosAOcupar}
                  </span>
                </span>
                <span>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                    }}
                  >
                    {arrayPasajeres.length !== 0 &&
                      arrayPasajeres.map((e) => (
                        <ListItem
                          key={e.email}
                          disableGutters
                          secondaryAction={
                            <IconButton>
                              <Link to={`/perfil/${e.email}`}>
                                <FaUserCircle />
                              </Link>
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={`🔴 ${e.nombre} ${e.apellido}`}
                          />
                        </ListItem>
                      ))}
                  </List>
                </span>
                <span>
                  Medios de pago:{" "}
                  <span className="font-bold">
                    {/* no llega bien forma de pago */}
                    {viaje.formaDePago ? viaje.formaDePago : "no"}
                  </span>
                </span>
                <span>
                  Comparte gastos:
                  <span className="font-bold">
                    {viaje.pagoCompartido ? "sí" : "no"}
                  </span>
                </span>
                <span className="flex items-center">
                  <MdSmokeFree className="mx-2" />
                  Acepta Fumadorxs:{" "}
                  <span className="font-bold">
                    {viaje.aceptaFumador ? "sí" : "no"}
                  </span>
                </span>
                <span className="flex items-center">
                  <MdPets className="mx-2" />
                  Acepta Mascota(s):{" "}
                  <span className="font-bold">
                    {viaje.aceptaMascota ? "sí" : "no"}
                  </span>
                </span>
                <span className="flex items-center">
                  <FaSuitcaseRolling className="mx-2" /> Acepta Equipaje:{" "}
                  <span className="font-bold">
                    {viaje.aceptaEquipaje ? "sí" : "no"}
                  </span>
                </span>
                <span className="flex items-center">
                  <MdMasks className="mx-2" />
                  Usa obligatorio de Barbijo:{" "}
                  <span className="font-bold">
                    {viaje.usaBarbijo ? "sí" : "no"}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="wallpaper">
            <img className="stretch" src={fondo} alt="" />
          </div>
        </div>
      }
    </div>
  );
};
