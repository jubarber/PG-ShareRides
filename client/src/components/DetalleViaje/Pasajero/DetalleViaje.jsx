import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDetalleViaje,
  getUsuarioByEmail,
  pausarViaje
} from "../../../redux/actions/actions";
import "./DetalleViaje.css";
import { MdSmokeFree, MdMasks, MdPets } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { VscLocation } from "react-icons/vsc";
import fondo from "../../../assets/fondo perfil.jpg";
import NavBar from "../../NavBar/NavBar";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FaUserCircle } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

export const DetalleViajep = () => {
  const cookies = new Cookies();
  const cookieMail = cookies.get("email");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viaje = useSelector(state => state.viajePorId);
  const { id } = useParams();
  const { email } = useParams();
  let fechaViaje = "";
  const [ocultarBotonColaborar, setOcultarBotonColaborar] = useState(null);

  useEffect(
    () => {
      dispatch(getDetalleViaje(id));
      dispatch(getUsuarioByEmail(email));
    },
    [id]
  );

  useEffect(
    () => {
      if (viaje.length !== 0) {
        if (viaje.usuarios[0].email === cookieMail)
          setOcultarBotonColaborar(true);
      }
    },
    [viaje]
  );

  const handleColaborar = async () => {
    await dispatch(postOrder(cookieMail)).then((data) => {
      // console.log(data.payload[0])
      setDatosMp({ ...datosMp, orderId: data&&data.payload[0].id});
    });
  };

  if (viaje.length !== 0 && viaje.fecha.length !== 0) {
    viaje.fecha.includes("T")
      ? (fechaViaje = viaje.fecha
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("-"))
      : (fechaViaje = viaje.fecha);
  }

  if (viaje.length !== 0 && viaje.usuarios.length !== 0) {
    var viajeUsuarios = viaje.usuarios.map(e => e.email);
    var viajesTotales = viajeUsuarios.map(e => e.includes(cookieMail));
    var arrayPasajeres = viaje.usuarios.map(e => e);
  function handleSubmit(e) {
    e.preventDefault()(
      axios
        .get(
          `/api/mercadopago/${datosMp&&datosMp.orderId}/${datosMp&&datosMp.unit_price}`
        )
        .then((r) => setRedirect(r.data))
    );
  }

  function handleEliminar() {
    Swal.fire({
      title: "Estás a punto de eliminar este viaje",
      icon: "error",
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
    Swal.fire({
      title: "En instantes serás redirigide a la modificación de tu viaje",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading()
      }
    }).then(() => {
      navigate(`/modificar/modificarViaje/${id}`);
    });
  }
    
  return (
    <div>
      {arrayPasajeres && arrayPasajeres.length !== 0
        ? <div className="container-detalle">
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
                  {viajesTotales !== [] && viajesTotales.includes(true)
                    ? null
                    : <div>
                         <a href={`https://api.whatsapp.com/send?phone=+549${viaje.telefono}`} target="_blank" rel="noopener noreferrer">
                      <button className="detalle-mensaje" >
                        {/* onClick={} */}
                        Enviar Mensaje
                      </button>
                      </a>
                      </div>}
                </div>
                <br />
                  {viajesTotales !== [] && viajesTotales.includes(true)
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
                    Fecha: <span className="font-bold">{fechaViaje}</span>
                  </span>
                  <span>
                    Hora: <span className="font-bold">{viaje.hora}</span>
                  </span>
                </div>
                <div className="flex flex-col justify-evenly w-full ml-4">
                  <span>
                    Cantidad de asientos requeridos:{" "}
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
                    <span className="font-bold">{viaje.formaDePago}</span>
                  </span>
                  <span>
                    Puede colaborar con los gastos:
                    <span className="font-bold">
                      {viaje.pagoCompartido ? "sí" : "no"}
                    </span>
                  </span>
                  <span className="flex items-center">
                    <MdSmokeFree className="mx-2" />
                    Soy Fumador/a:{" "}
                    <span className="font-bold">
                      {viaje.aceptaFumador ? "Sí" : "No"}
                    </span>
                  </span>
                  <span className="flex items-center">
                    <MdPets className="mx-2" />
                    Llevo Mascota(s):{" "}
                    <span className="font-bold">
                      {viaje.aceptaMascota ? "Sí" : "No"}
                    </span>
                  </span>
                  <span className="flex items-center">
                    <FaSuitcaseRolling className="mx-2" /> Tengo Equipaje:{" "}
                    <span className="font-bold">
                      {viaje.aceptaEquipaje ? "Sí" : "No"}
                    </span>
                  </span>
                  <span className="flex items-center">
                    <MdMasks className="mx-2" />
                    Uso Barbijo:{" "}
                    <span className="font-bold">
                      {viaje.usaBarbijo ? "Sí" : "No"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="wallpaper">
              <img className="stretch" src={fondo} alt="" />
            </div>
          </div>
        : <div>Cargando...</div>}

    </div>
  );
};
