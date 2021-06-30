import React, { useEffect } from "react";
import { signingWithGoogle, auth } from "../functions/firebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      history.push("/register");
    }
  }, [user, history]);

  return (
    <div>
      <button onClick={signingWithGoogle}> Entrar</button>
    </div>
  );
}
