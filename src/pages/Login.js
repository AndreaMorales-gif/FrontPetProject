import React, { useEffect } from "react";
import { signingWithGoogle, auth } from "../functions/firebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../login.css";
import Google from "./google.png";
import Logo from "../Components/menu.gif";
export default function Login() {
  const history = useHistory();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      history.push("/register");
    }
  }, [user, history]);

  return (
    <div className="">
      <div className="">
        <div class="cardLogin">
          <h1 className="padding-top" className="letra"> ¡BIENVENIDO! </h1>
          <p class="title" className="letraLogin">
            Querido administrador, usted esta a punto de entrar a la aplicación
            de Control de Ingresos que le permitirá tener el registro de sus
            usuarios, empleados o clientes con todos los requisitos que debemos
            tener en cuenta.
          </p>
          <p className="letraLogin">Entra con tu cuenta de Google<br/><img src={Google} className="logoGoogle" /> </p>
          <p>
            {" "}
            <button
              className="buttonGoogle "
              onClick={signingWithGoogle}
            >
              {" "}
              Entrar
            </button>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
