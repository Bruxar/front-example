import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OfferCarousel.css';
import Carousel from 'react-bootstrap/Carousel';
import { renderStars } from '../../../Components/utils';

function OfferCard({ paquete, cardsToShow, VITE_PATH_IMAGES }) {
  // Limpia la cadena de imÃ¡genes, elimina corchetes y espacios en blanco
  const cleanedImages = paquete.imagenes ? paquete.imagenes.replace(/[{}]/g, '').split(',').map(image => image.trim()) : [];

  // Toma la primera imagen si existe
  const firstImage = cleanedImages.length > 0 ? cleanedImages[0] : '';

  // Construye la URL completa de la primera imagen
  const imageUrl = `${VITE_PATH_IMAGES}${firstImage}`;

  return (
    <div className={`col-md-${12 / cardsToShow} col-sm-6 mt-2 mb-2`}>
      <div className="card mb-2" style={{ height: '100%' }}>
        <img src={imageUrl} alt={paquete.title} className="card-img-top" />
        <div className="card-body">
          <div className="Package-info">
            {/* <div className="d-flex justify-content-between">
              <div className="bg-secondary text-white rounded p-2 ida">{paquete.fecha_init} </div>
              <div className="bg-primary text-white rounded p-2"> {paquete.fecha_fin}</div>
            </div> */}
          </div>
          <h2 className="card-title">{paquete.nombre}</h2>
          <div className='estrellas d-flex'>
            <p >{paquete.info_paquete.hotel_info.nombre_hotel} </p>
            {renderStars(paquete.info_paquete.hotel_info.valoracion_hotel)}
          </div>
          <div className="Information d-flex flex-column">
            <h3 className='fw-bold'>{paquete.precio_oferta_vuelo}</h3>
            <h3 className='text-decoration-line-through'>{paquete.precio_vuelo}</h3>
          </div>
          <div className='d-flex justify-content-end'><button className="btn btn-primary btn-card ">Ver Paquete</button></div>
          
        </div>
      </div>
    </div>
  );
}
function OfferCarousel({ paquetes }) {
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const updateCardsToShow = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1600) {
        setCardsToShow(4);
      } else if (screenWidth >= 1300) {
        setCardsToShow(3);
      } else if (screenWidth >= 1043) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    window.addEventListener('resize', updateCardsToShow);
    updateCardsToShow();

    return () => {
      window.removeEventListener('resize', updateCardsToShow);
    };
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const VITE_PATH_IMAGES = import.meta.env.VITE_PATH_IMAGES;
  const chunkedPaquetes = chunkArray(paquetes, cardsToShow);

  return (
    <div className="offer mt-5">
      <h1>Destacados</h1>
      <div className="container">
        <Carousel interval={null}>
          {chunkedPaquetes.map((paqueteGroup, groupIndex) => (
            <Carousel.Item key={`carousel-item-${groupIndex}`}>
              <div className="row justify-content-center">
                {paqueteGroup.map((paquete) => (
                  <OfferCard key={paquete.id} paquete={paquete} cardsToShow={cardsToShow} VITE_PATH_IMAGES={VITE_PATH_IMAGES} />
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default OfferCarousel;