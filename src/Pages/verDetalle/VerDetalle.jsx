import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Gallery from 'react-image-gallery';
import Modal from 'react-modal';

import 'react-image-gallery/styles/css/image-gallery.css';
import { renderStars, renderServiceIcons } from '../../Components/utils.jsx';
import TarjetaContacto from './tarjetaContacto/TarjetaContacto.jsx';
import './verDetalle.css';
import TarjetaDescripcion from './tarjetaDescripcion/tarjetaDescripcion.jsx';

// Esta línea es necesaria para la accesibilidad del modal
Modal.setAppElement('#root');

const VerDetalle = () => {
    const location = useLocation();
    const paquete = location.state;
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

    if (!paquete) {
        return <div>No se ha proporcionado un paquete para ver detalles.</div>;
    }

    // Desestructuración de las propiedades del paquete
    const {
        nombre,
        descripcion,
        detalles,
        precio_vuelo,
        precio_noche,
        imagenes,
        info_paquete: {
            nombre_opcion_hotel,
            descripcion_habitacion,
            servicios_habitacion,
            hotel_info,
        },
    } = paquete;

    const {
        nombre_hotel,
        direccion_hotel,
        valoracion_hotel,
        descripcion_hotel,
        servicios_hotel,
        telefono_hotel,
        correo_electronico_hotel,
        sitio_web_hotel,
    } = hotel_info;

    console.log(descripcion_hotel)

    // Convertir cadena de imágenes en array y construir las URLs
    const imagesArray = imagenes ? imagenes.substring(1, imagenes.length - 1).split(',') : [];
    const VITE_PATH_IMAGES = import.meta.env.VITE_PATH_IMAGES;
    const imageGalleryItems = imagesArray.map(image => ({
        original: `${VITE_PATH_IMAGES}${image.trim()}`
    }));

    // Funciones para abrir y cerrar el modal de la galería
    const openGalleryModal = () => setIsGalleryModalOpen(true);
    const closeGalleryModal = () => setIsGalleryModalOpen(false);


    return (
        <div className="verDetalleContainer">
            <h1>{descripcion}</h1>
            {/* Contenedor de las imágenes del paquete */}
            
            <div className="imagenesContainer w-50">
                {imageGalleryItems.map((image, index) => (
                    <div
                        key={index}
                        className={`imagenWrapper ${index === 0 ? 'mainImage' : ''}`}
                        style={{ backgroundImage: `url(${image.original})` }}
                        onClick={openGalleryModal}
                    ></div>
                ))}
                <button
                    onClick={openGalleryModal}
                    className='verGaleriaButton'
                >
                    Ver Galería</button>
            </div>

            {/* Botón para abrir la galería en modal */}

            {/* Modal que contiene la galería de imágenes */}
            <Modal
                isOpen={isGalleryModalOpen}
                onRequestClose={closeGalleryModal}
                contentLabel="Galería de imágenes"
                className="Modal"
                overlayClassName="Overlay"
            >
                <Gallery items={imageGalleryItems} />
                <button onClick={closeGalleryModal}>Cerrar</button>
            </Modal>

            <div className="detalleDescripcion">
                <p>{detalles}</p>
            </div>

            <div className="detallePrecios">
                <p>{`Precio del Vuelo: $${precio_vuelo}`}</p>
                <p>{`Precio por Noche: $${precio_noche}`}</p>
            </div>


            <div className="detalleOpcionHotel">
                <h2>{nombre_opcion_hotel}</h2>
                <p>{descripcion_habitacion}</p>
                <div className="servicesContainer">{renderServiceIcons(servicios_habitacion)}</div>

            </div>

            <div className="detalleHotelInfo">
                <h2>Información del Hotel</h2>
                <p>{nombre_hotel}</p>
                <p>{direccion_hotel}</p>
                <div className="starsContainer">{renderStars(valoracion_hotel)}</div>
                
                <div className="servicesContainer">{renderServiceIcons(servicios_hotel)}</div>
            </div>
            <div className='d-flex "d-flex flex-wrap justify-content-center align-items-center'>

  <div className='DescripcionPaquete  mt-1 '>
    <TarjetaDescripcion descripcion_hotel={descripcion_hotel} />
  </div>

  <div className="detalleContacto  mt-3">
    <TarjetaContacto
      telefono_hotel={telefono_hotel}
      correo_electronico_hotel={correo_electronico_hotel}
      sitio_web_hotel={sitio_web_hotel}
    />
  </div>

</div>

            {/* Aquí puedes insertar otros elementos y detalles según tus necesidades */}
        </div>
    );

};

export default VerDetalle;
