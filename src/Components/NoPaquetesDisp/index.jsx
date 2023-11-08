import React from 'react';
import './NoPaquetesDisp.css';

const NoPaquetesDisponibles = () => {
  return (
    <div className="no-paquetes">
      <div className='info'>
        <h1>No hay paquetes disponibles para esta búsqueda</h1>
        <p>Como alternativa, te recomendamos seleccionar destino o fecha diferente.</p>
      </div>
      <div className="imagen-container">
        <img src="/ups.png" alt="Imagen de error" />
      </div>
    </div>
  );
};

export default NoPaquetesDisponibles;
