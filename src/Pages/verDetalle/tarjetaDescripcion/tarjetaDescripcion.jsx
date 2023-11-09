import 'bootstrap/dist/css/bootstrap.min.css';
import "./tarjetaDescripcion.css"
import {BsFillBuildingsFill } from "react-icons/bs";

function tarjetaDescripcion({descripcion_hotel, descripcion_habitacion}) {
  return (
    <div>
      <div className="container mt-5" style={{ width: '60vw', height: '75hv', margin: '20px', boxShadow: "2px 2px 2px 2px", borderRadius: '10px' }}>
        <h1 className="text-break" style={{ padding: "10px", textAlign: "center" }}>Descripcion Paquete</h1>
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex col ">
            <div className="col">
              <p style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}>
                 <strong>{descripcion_hotel}</strong>
              </p>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}>
                 <strong>{descripcion_habitacion}</strong>
              </p>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default tarjetaDescripcion;
