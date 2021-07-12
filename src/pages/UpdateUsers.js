import React, { useEffect } from "react";
import "../App.css";
import { useState } from "react";
import Menu from "../Components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    signingWithGoogle,
    auth,
    signOut,
  } from "../functions/firebaseFunctions";
  import { useAuthState } from "react-firebase-hooks/auth";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { useHistory, Link } from "react-router-dom";

function UpdateUser() {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    var fecha = new Date();
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const update = () => {
        fetch(
          `http://localhost:8080/api/updateUsers/${userId}/${name}/${fecha.toLocaleDateString(
          "es-ES",
            options
           )}/${email}`,
          { method: "PUT" }
        )
          .then((response) => response.json())
          .then((data) => console.log(data));
      };

    return(
        <div className="bg-img">
            <Menu/>
            <div class="container">
            <form className="container" className="borde">
              <h1 className="title-form">Editar Usuario</h1>
              <br></br>

              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Ingrese su Documento"
                  onChange={(e) => setUserId(e.target.value)}
                  name="Documento"
                  required
                  value={userId}
                />
                
                <label for="Documento">
                  <b>Documento</b>
                </label>
              </div>
              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Ingrese su Nombre y Apellidos"
                  onChange={(e) => setName(e.target.value)}
                  name="Nombre y Apellidos"
                  required
                  value={name}
                />
                <label for="Nombre y Apellidos">
                  <b>Nombre y Apellidos</b>
                </label>
              </div>

              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  type="email"
                  placeholder="Ingrese su correo"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                  value={email}
                />
                <label for="email">
                  <b>Email</b>
                </label>
              </div>

              <button
                type="submit"
                value="Guardar"
                className="btn btn-secondary"
                onClick={update}
              >
                Listo
              </button>
            </form>
            </div>
        </div>
    );
}

export default  UpdateUser;