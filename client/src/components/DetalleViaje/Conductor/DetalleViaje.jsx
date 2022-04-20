import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDetalleViaje,
  postOrder,
  postColaboracion,
  sumarseAlViaje,
  modificarAsiento,
  getViajesTotalUsuario,
  pausarViaje
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
  const viaje = useSelector(state => state.viajePorId);
  const viajesPorUsuario = useSelector(state => state.viajesPorUsuario);
  const { id } = useParams();
  const cookieMail = cookies.get("email");
  let fechaViaje = "";
  const [botonesConductor, setBotonesConductor] = useState(null);
  const [botonesPasajero, setBotonesPasajero] = useState(null);
  const [botonesPasajeroSumado, setBotonesPasajeroSumado] = useState(null);

  useEffect(
    () => {
      dispatch(getDetalleViaje(id));
      dispatch(getViajesTotalUsuario(cookieMail));
    },
    [id]
  );

  let idViajesPorUsuario = viajesPorUsuario.map(v => v.id);
  let mailUsuariosDelViaje;
  useEffect(
    () => {
      if (viaje.length !== 0 && viajesPorUsuario.length!==0) {
        mailUsuariosDelViaje = viaje.usuarios.map(u => u.email);
        if(viaje.asientosAOcupar === 0){
          setBotonesPasajeroSumado(null)
          setBotonesPasajero(null)
        }
        if (viaje.usuarios[0].email === cookieMail) {
          setBotonesConductor(true);
        }
        if (
          viaje.usuarios[0].email !== cookieMail &&
          mailUsuariosDelViaje.includes(cookieMail)
        ) {
          setBotonesPasajeroSumado(true);
        }
        if (!mailUsuariosDelViaje.includes(cookieMail)) {
          console.log("setBotonesPasajero");
          setBotonesPasajero(true);
        }
        if (
          viaje.usuarios[0].email !== cookieMail &&
          idViajesPorUsuario.includes(id)
        ) {
          setBotonesPasajeroSumado(true);
        }
      }
    },
    [viajesPorUsuario]
  );

  if (viaje.length !== 0 && viaje.fecha.length !== 0) {
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
    viajeId: id
  });

  useEffect(
    () => {
      if (viaje.length !== 0) {
        if (viaje.usuarios.length !== 0) {
          setDatosMp({
            ...datosMp,
            usuarioCobrador: viaje.usuarios[0].email
          });
        }
      }
    },
    [viaje]
  );

  const [sumarse, setSumarse] = useState({
    id: id,
    email: cookieMail
  });

  const handleColaborar = () => {
    dispatch(postOrder(cookieMail)).then(data => {
      if (data) setDatosMp({ ...datosMp, orderId: data.payload[0].id });
    });
  };

  const [redirect, setRedirect] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postColaboracion(datosMp));
    console.log("submit");
    if (datosMp.length !== 0) {
      axios
        .get(
          `http://localhost:3001/api/mercadopago/${datosMp.orderId}/${datosMp.unit_price}`
        )
        .then(r => setRedirect(r.data));
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setDatosMp({
      ...datosMp,
      unit_price: parseInt(e.target.value)
    });
  }

  function handleSumarse(e) {
    e.preventDefault();
    let viajesFechasCoincidentes = [];
    if (viajesPorUsuario.length !== 0) {
      viajesPorUsuario.map(v => {
        if (
          v.fecha.substring(0, 10).split("-").reverse().join("-") ===
          viaje.fecha.substring(0, 10).split("-").reverse().join("-")
        ) {
          viajesFechasCoincidentes.push(v);
        }
      });
      console.log(viajesPorUsuario);
      console.log(viajesFechasCoincidentes);
      if (viajesFechasCoincidentes.length !== 0) {
        console.log("if sumarse");
        Swal.fire({
          title: "Ya tienes un viaje programado para este día",
          icon: "warning",
          text:
            "No puedes participar de dos viajes el mismo día. Serás redireccionade al inicio",
          confirmButtonText: "Ok",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(() => {
          navigate("/home");
        });
      } else {
        console.log("else sumarse");
        Swal.fire({
          title: "Estás a punto de sumarte a este viaje",
          icon: "warning",
          text: "Por favor, revisá bien todos los detalles antes de confirmar",
          confirmButtonText: "Sumarme!",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(r => {
          if (r.isConfirmed) {
            dispatch(sumarseAlViaje(sumarse));
            dispatch(modificarAsiento(viaje));
            setBotonesPasajeroSumado(true);
            setBotonesPasajero(null);
            Swal.fire({
              title: "Te has sumado al viaje correctamente!",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false
            }).then(() => {
              navigate("/home");
            });
          }
        });
      }
    } else {
      console.log("else sumarse");
      Swal.fire({
        title: "Estás a punto de sumarte a este viaje",
        icon: "warning",
        text: "Por favor, revisá bien todos los detalles antes de confirmar",
        confirmButtonText: "Sumarme!",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      })
        .then(r => {
          if (r.isConfirmed) {
            dispatch(sumarseAlViaje(sumarse));
            dispatch(modificarAsiento(viaje));
          }
        })
        .then(() => {
          Swal.fire({
            title: "Te has sumado al viaje correctamente!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            navigate("/home");
          });
        });
    }
  }

  if (viaje.length !== 0 && viaje.usuarios.length !== 0) {
    var arrayPasajeres = viaje.usuarios.map(e => e);
  }

  function handleEliminar() {
    Swal.fire({
      title: "Estás a punto de eliminar este viaje",
      icon: "danger",
      text: "Estás segure de que querés continuar?",
      confirmButtonText: "Sí, quiero eliminar",
      denyButtonText: "No quiero eliminar!"
    }).then(r => {
      if (r.isConfirmed) {
        dispatch(pausarViaje(id));
        Swal.fire({
          title:
            "El viaje ha sido eliminado correctamente, ya no lo verás en tu inicio ni en tus viajes.",
          icon: "success",
          timer: 1200
        });
      } else if (r.isDenied) {
        Swal.fire({
          title: "El viaje está a salvo!",
          icon: "info",
          timer: 1000
        });
      }
    });
  }

  function handleModificar() {
    console.log("handle modificar");
    cookies.set("fecha", viaje.fecha, { path: "/" });
    cookies.set("hora", viaje.hora, { path: "/" });
    cookies.set("origen", viaje.origen, { path: "/" });
    cookies.set("destino", viaje.destino, { path: "/" });
    cookies.set("asientos", viaje.asientosAOcupar, {
      path: "/"
    });
    cookies.set("detalles", viaje.detalles, {
      path: "/"
    });
    cookies.set("aceptaFumador", viaje.aceptaFumador, {
      path: "/"
    });
    cookies.set("aceptaMascota", viaje.aceptaMascota, {
      path: "/"
    });
    cookies.set("aceptaEquipaje", viaje.aceptaEquipaje, {
      path: "/"
    });
    cookies.set("usaBarbijo", viaje.usaBarbijo, {
      path: "/"
    });
    console.log(cookies.get("fecha"));
    setTimeout(() => {
      navigate(`/modificar/modificarViaje/${id}`);
    }, 2000);
  }

  return (
    <div>
      {arrayPasajeres &&
        arrayPasajeres.length !== 0 &&
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
                    {viaje.usuarios
                      ? viaje.usuarios[0].nombre +
                        " " +
                        viaje.usuarios[0].apellido
                      : <div />}
                  </span>
                  <span>
                    <div className="puntuacion">
                      {viaje.usuarios
                        ? viaje.usuarios[0].puntuacion === 5
                          ? <div>
                              <ImStarFull className="black" />
                              <ImStarFull className="black" />
                              <ImStarFull className="black " />
                              <ImStarFull className="black" />
                              <ImStarFull className="black " />
                            </div>
                          : viaje.usuarios[0].puntuacion === 4
                            ? <div>
                                {" "}<ImStarFull className="black" />
                                <ImStarFull className="black " />
                                <ImStarFull className="black" />
                                <ImStarFull className="black " />
                                <ImStarEmpty className="black" />
                              </div>
                            : viaje.usuarios[0].puntuacion === 3
                              ? <div>
                                  <ImStarFull className="black " />
                                  <ImStarFull className="black" />
                                  <ImStarFull className="black " />
                                  <ImStarEmpty className="black" />
                                  <ImStarEmpty className="black" />
                                </div>
                              : viaje.usuarios[0].puntuacion === 2
                                ? <div>
                                    <ImStarFull className="black" />
                                    <ImStarFull className="black " />
                                    <ImStarEmpty className="black" />
                                    <ImStarEmpty className="black" />
                                    <ImStarEmpty className="black" />
                                  </div>
                                : viaje.usuarios[0].puntuacion === 1
                                  ? <div>
                                      <ImStarFull className="black " />
                                      <ImStarEmpty className="black" />
                                      <ImStarEmpty className="black" />
                                      <ImStarEmpty className="black" />
                                      <ImStarEmpty className="black" />
                                    </div>
                                  : <div />
                        : <div />}
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
                <span className="m-2">
                  {viaje.detalles}
                </span>
              </div>
              <div className="btn-detalle">
                {botonesConductor === true ||
                (botonesPasajeroSumado === true && botonesPasajero !== true)
                  ? null
                  : <div className="btn-detalle">
                      <button
                        className="detalle-mensaje"
                        onClick={e => {
                          handleSumarse(e);
                        }}
                      >
                        Sumarme al viaje
                      </button>
                    </div>}
                {(botonesPasajeroSumado === true || botonesPasajero === true) && botonesConductor!==true
                  ? <div className="btn-detalle">
                      <button className="detalle-mensaje">
                        {/* onClick={} */}
                        Enviar Mensaje
                      </button>
                    </div>
                  : null}
              </div>

              <br />
              {botonesConductor === true || botonesPasajeroSumado !== true
                ? null
                : !redirect
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
                    </button>}
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
                        onChange={e => handleChange(e)}
                      />
                    </div>
                    <div class="modal-footer">
                      <form onSubmit={e => handleSubmit(e)}>
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
              {redirect !== "" &&
                <a href={`${redirect}`}>
                  <input
                    class="btn btn-success"
                    type="submit"
                    value="Continuar a MercadoPago"
                    name="Continuar a MercadoPago"
                  />
                </a>}

              {botonesConductor === true
                ? <div className="btn-detalle">
                    <button
                      className="detalle-mensaje"
                      onClick={() => {
                        handleEliminar();
                      }}
                    >
                      Eliminar Viaje
                    </button>
                    <button
                      className="detalle-mensaje"
                      onClick={handleModificar}
                    >
                      Modificar Viaje
                    </button>
                  </div>
                : null}
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
                    className={`font-bold text-2xl ${viaje.asientosAOcupar > 3
                      ? "text-sky-600"
                      : viaje.asientosAOcupar < 1
                        ? "text-amber-500"
                        : "text-orange-700"}`}
                  >
                    {viaje.asientosAOcupar}
                  </span>
                </span>
                <span>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360
                    }}
                  >
                    {arrayPasajeres.length !== 0 &&
                      arrayPasajeres.map(e =>
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
                      )}
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
        </div>}
    </div>
  );
};
