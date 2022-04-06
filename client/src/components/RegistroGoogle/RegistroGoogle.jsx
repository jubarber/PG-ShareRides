import react, { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { registroUsuario } from "../../redux/actions/actions";
import swal from "sweetalert";

export default function RegistroGoogle() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  let cookieEmail = cookies.get("email");
  let cookieNombre = cookies.get("nombre");
  let cookieApellido = cookies.get("apellido");
  const [usuario, setUsuario] = useState({
    email: cookieEmail,
    nombre: cookieNombre,
    apellido: cookieApellido,
    password: "",
    confirmPassword: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registroUsuario(usuario));
    swal({
      title: "El registro ha sido exitoso!",
      icon: "success",
      button: "Bienvenidx!",
    }).then(function () {
      window.location = "/home";
    });
  }

  function handleChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={usuario.password}
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            value={usuario.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
