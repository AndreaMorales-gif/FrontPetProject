import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "../Components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";

function Register() {
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [entryDate, setEntryDate] = useState("");

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
      `http://localhost:8080/api/saveRegisters/${uuidv4()}/${userId}/${fecha.toLocaleDateString(
        "es-ES",
        options
      )}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const [register, setRegister] = React.useState([]);

  React.useEffect(() => {
    console.log("");
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:8080/api/findRegisters");
    const registers = await data.json();

    setRegister(registers);
    console.log(registers);
  };

  return (
    <div className="bg-img">
      <Menu />

      <div class="container">
        <div class="row">
          <div class="col">
            <form className="container" className="borde">
              <h1>Registro</h1>
              <br></br>
              <label for="userId">
                <b>Documento Identidad</b>
              </label>
              <input
                type="text"
                placeholder="Ingrese su Cédula"
                onChange={(e) => setUserId(e.target.value)}
                name="userId"
                required
                value={userId}
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
          <div class="col">
            <h1>Hola</h1>
          </div>
        </div>
      </div>
      <div class="container-xxl">
        <div class="row">
          <table class="tableRegisters table">
            <thead class="table">
              <tr className="colorTextWhite">
                <th>Documento</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody class="table1">
              {register.map((item) => (
                <tr key={item.id}>
                  <th>{item.userId}</th>
                  <td>{item.entryDate}</td>
                  <td>
                    {item.userId === item.userId ? (
                      <button
                        type="button"
                        className="buttons btns buttonDelete "
                        onClick={() => {
                          fetch(
                            `http://localhost:8080/api/deleteRegisters/${item.id}`,
                            {
                              method: "DELETE",
                            }
                          ).then((response) => {
                            if (response.status === 200) {
                              setTimeout("document.location.reload()", 400);
                            }
                          });
                        }}
                      >
                        Borrar
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Register;
