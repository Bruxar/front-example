
import { BsTelephone } from "react-icons/bs";

function TarjetaContacto({telefono_hotel, correo_electronico_hotel,sitio_web_hotel}){

    return(
    
      <div>
      <div className="container mt-5" style={{ width: '60vw', height: 'auto', margin: '20px', boxShadow: "2px 2px 2px 2px", borderRadius: '10px' }}>
        <h1 className="text-breakl mt-2" style={{ textAlign: "center", padding:"5px" }}>Contacto del Hotel</h1>
        <div className="d-flex flex-row align-items-center">
          <div className="flex-grow-1">
            <div className="row">
              <p className='text-break' style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}>
                <strong>Telefono:</strong> {telefono_hotel}
              </p>
            </div>
            <div className="row">
              <p className='text-break' style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}>
                <strong>Correo Electronico:</strong> {correo_electronico_hotel}
              </p>
            </div>
            <div className="row">
              <p className='text-break' style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}>
                <strong>Sitio Web:</strong> {sitio_web_hotel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default TarjetaContacto