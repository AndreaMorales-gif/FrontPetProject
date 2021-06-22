import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const save = ()=>{
  fetch('http://localhost:8080/api/'+id+'/'+userId+'/'+entryDate+'', {method: 'POST'})
  .then(response => response.json())
  .then(data=>console.log(data));
  }
  return (
  <div className="bg-img">
  <form action="/action_page.php" className="container">
    <h1>Registro</h1>

    <label for="id"><b>Id</b></label>
    <input type="text" placeholder="Ingrese su id" onChange={(e)=> setId(e.target.value)} name="id" required value={id}/>

    <label for="userId"><b>Documento Identidad</b></label>
    <input type="text" placeholder="Ingrese su Cédula" onChange={(e)=> setUserId(e.target.value)} name="userId" required value={userId}/>

    <label for="entryDate"><b>Fecha </b></label>
    <input type="date" placeholder="Ingrese su Cédula" onChange={(e)=> setEntryDate(e.target.value)} name="entryDate" value={entryDate}/>

    <button type="submit" value="Guardar" className="btn" onClick={save}>Listo</button>
  </form>
</div>
  );
}

export default App;
