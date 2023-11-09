import 'bootstrap/dist/css/bootstrap.min.css';
import "./tarjetaDescripcion.css"
import {BsFillBuildingsFill } from "react-icons/bs";

function tarjetaDescripcion({descripcion_hotel}) {
  return (
    <div>
      <div className="container mt-5" style={{ width: '35vw', height: '75%', margin: '20px', boxShadow: "2px 2px 2px 2px", borderRadius: '10px' }}>
        <h1 className="text-center" style={{ padding: "10px", textAlign: "center" }}>Descripcion hotel</h1>
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex col ">
            <div className="col w-50">
              <p style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}>
                 <strong>{descripcion_hotel}</strong>
              </p>
            </div>
          </div>
          <div className="d-flex col-flex mb-3 align-items-center me-5">
            <BsFillBuildingsFill size={120} /> {/* Ajusta el tamaño según sea necesario */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default tarjetaDescripcion;
