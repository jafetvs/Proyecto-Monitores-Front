import React, { Suspense } from "react";
import { fetchData } from "./fetchData";
import "./App.css";

const apiData = fetchData("http://127.0.0.1:5000/traffic-memory-state");
const apiDataEvent = fetchData("http://127.0.0.1:5000/event_info");

function App() {
  const data = apiData.read();
  const edata = apiDataEvent.read(); 

  return (
    <div className="App">
      <h1>Listado de procesos Memória SGA</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="card">
          {data?.map((item) => (
            <li key={item.id}>{item.memory_percentage}% - {item.total_memory_used}MB - {item.date}</li>
          ))}
        </ul>
      <h1>Evento que exeden el límite de memória</h1>
        <ul className="card">
          {edata?.map((item) => (
            <li key={item.eventId}>{item.memory_percentage}% - Número de proceso: {item.process_id} - Usuario: {item.user_name} - Consulta SQL: {item.user_query}</li>
          ))}
        </ul>
      </Suspense>      
    </div>
  );
}
export default App;
