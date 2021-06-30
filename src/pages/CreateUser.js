import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "../Components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateUser() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");

  var fecha = new Date();
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const save = () => {
    fetch(
      `http://localhost:8080/api/saveUsers/${userId}//${name}${fecha.toLocaleDateString(
        "es-ES",
        options
      )}/${email}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    console.log("");
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:8080/api/findUsers");
    const users = await data.json();

    setUser(users);
    console.log(users);
  };

  return (
    <div className="bg-img">
      <Menu />
      <div class="container">
        <div class="row row-cols-2">
          <div class="col">
            {" "}
            <form className="container" className="borde">
              <h1>Crear Usuario</h1>

              <label for="Documento">
                <b>Documento</b>
              </label>
              <input
                type="text"
                placeholder="Ingrese su Documento"
                onChange={(e) => setUserId(e.target.value)}
                name="Documento"
                required
                value={userId}
              />

              <label for="email">
                <b>Email</b>
              </label>
              <input
                type="email"
                placeholder="Ingrese su correo"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
                value={email}
              />

              <label for="Nombre y Apellidos">
                <b>Nombre y Apellidos</b>
              </label>
              <input
                type="text"
                placeholder="Ingrese su Nombre y Apellidos"
                onChange={(e) => setName(e.target.value)}
                name="Nombre y Apellidos"
                required
                value={name}
              />

              <button
                type="submit"
                value="Guardar"
                className="btn"
                onClick={save}
              >
                Listo
              </button>
            </form>
          </div>
          <div class="col">Hola</div>

          <div class="container-xxl">
            <div class="row">
              <table class="tableRegisters table">
                <thead class="table">
                  <tr className="colorTextWhite">
                    <th>Documento</th>
                    <th>Nombre y Apellidos</th>
                    <th>Fecha</th>
                    <th>Correo</th>
                  </tr>
                </thead>
                <tbody class="table1">
                  {user.map((item) => (
                    <tr>
                      <th>{item.userId}</th>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{item.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
