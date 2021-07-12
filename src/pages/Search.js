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

export default function search() {
  return (
    <div>
      <Menu />
      <div className="cardSearch container-fluid">
        <div class="card" >
          <div class="card-body">
            <h5 class="card-title" className="letra">Administrador:</h5>
            <p class="card-text">
              A continuación podrá buscar a través del documento de identidad del usuario, cliente o empleado cuántas veces ha ingresado a la plataforma:
            </p>
          </div>
        </div>
      </div>
      <div>
        <form className="example">
          <input type="text" placeholder="Buscar Documento" name="search" />
          <button type="submit">
            <i className="fa fa-search" className="letra">
              Listo
            </i>
          </button>
        </form>
      </div>
    </div>
  );
}
