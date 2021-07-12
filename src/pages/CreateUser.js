import React, { useEffect } from "react";
import "../App.css";
import { useState } from "react";
import Menu from "../Components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
// import "../CreateUser.css";
import {
  signingWithGoogle,
  auth,
  signOut,
} from "../functions/firebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, Link } from "react-router-dom";

function CreateUser() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
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

  const save = () => {
    fetch(
      `http://localhost:8080/api/saveUsers/${userId}/${name}/${fecha.toLocaleDateString(
        "es-ES",
        options
      )}/${email}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const [user1, setUser] = React.useState([]);

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
            <div className="container" className="borde">
              <h1 className="title-form" className="letra">
                Crear Usuario
              </h1>
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
                className="btn "
                className="botonEnviar"
                onClick={() => {
                  save();
                  setTimeout("document.location.reload()", 100);
                }}
              >
                Listo
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
      <br></br>

      <div class="container-xl">
        <div class="row">
          <table class=" table">
            <thead class="table">
              <tr className="colorTextWhite">
                <th className="letraTabla">Documento</th>
                <th className="letraTabla">Nombre</th>
                <th className="letraTabla">Fecha</th>
                <th className="letraTabla">Correo</th>
              </tr>
            </thead>
            <tbody class="table1">
              {user1.map((item) => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.userId === item.userId ? (
                      <button
                        type="button"
                        className="buttons btns buttonDelete "
                        onClick={() => {
                          fetch(
                            `http://localhost:8080/api/deleteUsers/${item.id}`,
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
                  <td>
                    <Link to={`/updateUser`}>
                      {item.userId === item.userId ? (
                        <button
                          type="button"
                          className=" buttonUpdate"
                          onClick={() => {
                            fetch(
                              `http://localhost:8080/api/updateUsers/${item.id}`,
                              {
                                method: "PUT",
                              }
                            ).then((response) => {
                              if (response.status === 200) {
                                setTimeout("document.location.reload()", 400);
                              }
                            });
                          }}
                        >
                          Editar
                        </button>
                      ) : null}
                    </Link>{" "}
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

export default CreateUser;
