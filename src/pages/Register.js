import React, { useEffect } from "react";
import "../App.css";
import { useState } from "react";
import Menu from "../Components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import axios from "axios";
import swal from "sweetalert";
import {
  signingWithGoogle,
  auth,
  signOut,
} from "../functions/firebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, Link } from "react-router-dom";

function Register() {
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [validar, setValidar] = useState("");

  const history = useHistory();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  var fecha = new Date();
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const PicoCedula = () => {
    swal({
      title: "Acesso denegado",
      text: "El usuario no tiene pico y cedula",
      icon: "warning",
      dangerMode: true,
    });
  };

  const noExiste = () => {
    swal({
      title: "Acesso denegado",
      text: "El usuario no existe",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willnotExist) => {
      if (willnotExist) {
        history.push("/createUser");
      } else {
      }
    });
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
  };

  const validarIngreso = () => {
    axios
      .get(`http://localhost:8080/api/validarIngreso/${userId}`)
      .then((response) => {
        setValidar(response.data);
      });
  };

  return (
    <div className="bg-img">
      <Menu />

      <div class="container">
        <div class="row">
          <div class="col">
            <div className="container" className="borde">
              <h1 className="title-form" className="letra">
                {" "}
                Registro
              </h1>
              <br></br>

              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Ingrese su Cédula"
                  onChange={(e) => setUserId(e.target.value)}
                  name="userId"
                  required
                  value={userId}
                />
                <label for="userId">
                  <b>Documento Identidad</b>
                </label>
              </div>

              <button
                type="submit"
                value="Guardar"
                className="btn"
                className="botonEnviar"
                onClick={() => {
                  validarIngreso();
                  if (validar === "El usuario No existe") {
                    noExiste();
                  }
                  if (validar === "No tiene pico y cédula") {
                    PicoCedula();
                  }
                  if (validar === "Ha entrado exitosamente.") {
                    save();
                    setTimeout("document.location.reload()", 100);
                  }
                }}
              >
                Validar ingreso
              </button>
            </div>
          </div>

          <div class="col">
            <div className="">
              <li className="buttonOut">
                <button
                  onClick={signOut}
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                ></button>
              </li>
              <img alt="perfil" className="imagePerfil" src={user?.photoURL} />
              <h5 className="name"> {user?.displayName} </h5>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>

      <div class="container-xl">
        <div class="row">
          <table class="tableRegisters table">
            <thead class="table">
              <tr className="colorTextWhite">
                <th className="letraTabla">Documento</th>
                <th className="letraTabla">Fecha</th>
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
                        className="buttonDelete"
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
