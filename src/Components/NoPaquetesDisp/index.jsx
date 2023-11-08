import React, { useState } from 'react';
import {MdAirplanemodeInactive} from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './NoPaquetesDisp.css';
import Filtros from '../Filtros';

const NoPaquetesDisponibles = ({onNewSearch}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const HandleNewSearchClick = () =>{
    setShowFilterModal(true);
  };

  return (
    <div className='contenedor-pag'>
      <button type='button' className='btn' onClick={HandleNewSearchClick}>Filtros</button>

    <div className="no-paquetes">
      <div className='info'>
        <h1>
        <i className='icono'>
            <MdAirplanemodeInactive/>
          </i>
          No hay paquetes disponibles para esta búsqueda
          </h1>
        <p>Como alternativa, te recomendamos seleccionar destino o fecha diferente.</p>
      </div>
      <div className="imagen-container">
        <img src="/ups.png" alt="Imagen de error" />
      </div>
    </div>

    <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
      <Modal.Body>
      <Filtros
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filtrarPaquetes={onNewSearch}
      />
      </Modal.Body>
    </Modal>
    </div>
  );
};

export default NoPaquetesDisponibles;
