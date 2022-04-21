import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../assets/fondo perfil.jpg";
import "./FormViaje.css";
import CheckBox from "@mui/material/Checkbox";
import NavBar from "../NavBar/NavBar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getVehiculos } from "../../redux/actions/actions";
import Cookies from "universal-cookie";

export default function FormViaje() {
  const cookies = new Cookies();
  const vehiculos = useSelector(state => state.vehiculos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    useEffect(() => {
      dispatch(getVehiculos(cookieMail));
    }, []);

  const [isChecked, setIsChecked] = useState({
    pasajero: false,
    conductor: false
  });
  const cookieMail = cookies.get("email");
  console.log(cookieMail)

  function handleOnChange(e) {
    setIsChecked({
      ...isChecked,
      [e.target.name]: !isChecked[e.target.name]
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isChecked.pasajero === true && isChecked.conductor === false) {
      navigate("/formpasajero");
    }
    if (isChecked.conductor === true && isChecked.pasajero === false) {
      if (vehiculos !== "No hay vehiculos") {
        Swal.fire({
          title: "Ya tienes un vehiculo registrado",
          icon: "info",
          text:
            "Deseas continuar con tu vehículo registrado o prefieres registrar uno nuevo?",
          showDenyButton: true,
          denyButtonColor: "#990099",
          confirmButtonText: "Continuar con mi vehículo",
          denyButtonText: "Registrar otro vehículo",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(r => {
          if (r.isConfirmed && vehiculos.length > 1) {
            (async () => {
              const { value: patente } = await Swal.fire({
                title: "Por favor, elegí qué vehículo deseas utilizar",
                input: "select",
                inputOptions: vehiculos.map(v => v.patente.toUpperCase()),
                inputPlaceholder: "Seleccioná un vehículo",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                inputValue: "",
                inputValidator: value => {
                  if (!value) {
                    return "Por favor elegí una opción.";
                  }
                }
              });
              if (patente) {
                cookies.set("patente", vehiculos[patente].patente, {
                  path: "/"
                });
                cookies.set("dni", vehiculos[patente].dni, { path: "/" });
              }
            })().then(() => {
              Swal.fire({
                title: "En instantes serás redirigide a la creación de tu viaje",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                didOpen: () => {Swal.showLoading()}
              }).then(() => {
                navigate("/formconductor");
              });
            });
          } else if(r.isConfirmed && vehiculos.length === 1){
            cookies.set("patente", vehiculos[0].patente, { path: "/"})
            Swal.fire({
              title: "En instantes serás redirigide a la creación de tu viaje",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              didOpen: () => {Swal.showLoading()}
            }).then(() => {
              navigate("/formconductor");
            });
          }else if (r.isDenied) {
            Swal.fire({
              title: "En instantes serás redirigide a la creación de tu vehículo",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              didOpen: () => {Swal.showLoading()}
            }).then(() => {
            navigate("/formvehiculo");
          })
        }
        });
      } else {
        navigate("/formvehiculo");
      }
    }

    if (isChecked.pasajero && isChecked.conductor) {
      Swal.fire({
        title: "Debes selecionar uno solo",
        icon: "warning"
      });
    }
  }

  return (
    <div className="contenedor_formviaje">
      <NavBar />
      <div className="pasajero_conductor">
        <div className="label_check">
          <label className="label-formviaje">Pasajere</label>
          <CheckBox
            type="checkbox"
            value="pasajero"
            name="pasajero"
            checked={isChecked.pasajero}
            onChange={e => {
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
            onChange={e => {
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
      </div>
    </div>
  );
}
