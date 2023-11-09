import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Gallery from 'react-image-gallery';
import Modal from 'react-modal';
import Footer from '../../utils/Footer/index.jsx';
import Header from '../../utils/Header/index.jsx'

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
        <div className="header">
            <Header/>
        <div className="verDetalleContainer">
           
            <h1>{descripcion}</h1>
            {/* Contenedor de las imágenes del paquete */}
        <div className='d-flex'>
            <div className="imagenesContainer w-75">
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
                
            </div>

            <div className="detallePrecios ms-5 h-100">
                <p>{`Precio del Vuelo: $${precio_vuelo}`}</p>
                <p>{`Precio por Noche: $${precio_noche}`}</p>
            </div>

            </div>
            <div className="detalleOpcionHotel">
                {/* <h2>{nombre_opcion_hotel}</h2>
                <p>{descripcion_habitacion}</p>
                 */}

            </div>

            <div className="detalleHotelInfo">
                <h1>{nombre_hotel}</h1>
                {/* <p>{direccion_hotel}</p> */}
                <div className="starsContainer" style={{fontSize:'3rem', marginTop:"-20px"}}>{renderStars(valoracion_hotel)}</div>
                <h3>Servicios</h3>
                <div className="servicesContainer w-25 "style={{fontSize:'3rem'}}>{renderServiceIcons(servicios_habitacion)}</div>
                <div className="servicesContainer w-25" style={{fontSize:'3rem'}}>{renderServiceIcons(servicios_hotel)}</div>
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
        <Footer/>
        </div>
    );

};

export default VerDetalle;
