import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import App from "./App";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route path="/createUser" component={CreateUser} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
