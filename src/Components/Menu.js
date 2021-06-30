import React, { useEffect } from "react";
import {
  signingWithGoogle,
  auth,
  signOut,
} from "../functions/firebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, Link } from "react-router-dom";
export default function Menu() {
  const history = useHistory();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);
  return (
    <div className="menu  ">
      <nav class="navbar navbar-expand-lg navbar-dark navbarColor">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Control de ingresos
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link " to={`/Home`}>
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link " to={`/Register`}>
                  Register
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link " to={`/CreateUser`}>
                  CrearUsuario
                </Link>
              </li>
            </ul>

            <ul>
              <button onClick={signOut} className="nav-item">
                Salir
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
