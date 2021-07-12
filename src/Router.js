import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Update from "./pages/UpdateUsers";
import Search from "./pages/Search"
import App from "./App";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/createUser" component={CreateUser} />
        <Route path="/updateUser" component={Update}/>
        <Route path="/search" component={Search}/>
      </Switch>
    </BrowserRouter>
  );
}
