import React, { useEffect, useState } from "react";
import "../App.css";
import Menu from "../Components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Search() {
  const [userId, setUserId] = useState("");
  const [busqueda, setBusqueda] = useState([]);

  const obtenerUserId = async () => {
    const data = await fetch(
      ` https://controlingreso.herokuapp.com/api/findByUserId/${userId}`
    );
    const busquedas = await data.json();
    setBusqueda(busquedas);
  };

  React.useEffect(() => {
    console.log("");
    obtenerUserId();
  }, []);

  return (
    <div>
      <Menu />
      <div className="cardSearch container-fluid">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title" className="letra">
              <strong>Administrador:</strong>
            </h5>
            <p class="card-text">
              A continuación podrá buscar a través del documento de identidad
              del usuario, cliente o empleado cuántas veces ha ingresado a la
              plataforma:
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="example" >
          <input
            class="form-control"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
            type="text"
            placeholder="Buscar Documento"
            name="search"
          />
          <button className="botonBuscar" type="submit" onClick={obtenerUserId}>
            <i className="letra">Buscar</i>
          </button>

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
                  {busqueda.map((item) => (
                    <tr key={item.id}>
                      <th>{item.userId}</th>
                      <td>{item.entryDate}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
