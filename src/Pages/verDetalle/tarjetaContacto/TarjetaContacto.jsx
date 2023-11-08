
import { BsTelephone } from "react-icons/bs";

function TarjetaContacto({telefono_hotel, correo_electronico_hotel,sitio_web_hotel}){

    return(
    
      <div>
      <div className="container mt-5" style={{ width: '40vw', height: 'auto', margin: '20px', boxShadow: "2px 2px 2px 2px", borderRadius: '10px' }}>
        <h1 className="text-center" style={{ padding: "10px", textAlign: "center" }}>Contacto del Hotel</h1>
        <div className="d-flex flex-row align-items-center">
          <div className="flex-grow-1">
            <div className="row">
              <p style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}>
                <strong>Telefono:</strong> {telefono_hotel}
              </p>
            </div>
            <div className="row">
              <p style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}>
                <strong>Correo Electronico:</strong> {correo_electronico_hotel}
              </p>
            </div>
            <div className="row">
              <p style={{ margin: 0, whiteSpace: 'pre-wrap', padding: "1rem" }}>
                <strong>Sitio Web:</strong> {sitio_web_hotel}
              </p>
            </div>
          </div>
          <div className="d-flex mb-3 align-items-center me-5">
            <BsTelephone size={120} /> {/* Ajusta el tamaño según sea necesario */}
          </div>
        </div>
      </div>
    </div>
    )
}

export default TarjetaContacto