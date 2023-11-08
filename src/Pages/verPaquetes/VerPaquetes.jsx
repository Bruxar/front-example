import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { getPaquetes, getPaquetesMes, agregarVista } from '../../api';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import { Modal } from 'react-bootstrap';


import BuscaViaje from '../../Components/buscaViaje/BuscaViaje';
import ListaPaquetes from '../../Components/listaPaquetes/ListaPaquetes';
import BotonOrdener from '../../Components/botonOrdenar/SortBy'
import Header from '../../utils/Header';
import Footer from '../../utils/Footer';
import Filtros from '../../Components/Filtros';

import './VerPaquetes.css';

const VerPaquetes = () => {
    const location = useLocation();
    const data = location.state;
    const respuesta = data.respuesta;
    const aeropuertos = data.aeropuertos;
    const [paquetes, setPaquetes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Obtén la función de navegación
    const [showModal, setShowModal] = useState(false);
    const [paquetesFiltrados, setPaquetesFiltrados] = useState([]);

    const filtrarPaquetes = (stars, serviceTypes) => {
        console.log('Estrellas:', stars);
        console.log('Servicios:', serviceTypes);
        const paquetesFiltrados = paquetes.filter((paquete) => {
            const cumpleValoracion = stars === '' || paquete.valoracion_hotel === parseInt(stars);
            const cumpleServicios = serviceTypes.length === 0 || serviceTypes.every((servicio) => paquete.servicios_habitacion.includes(servicio));
            return cumpleValoracion && cumpleServicios;
          });
        
          // Establece la lista de paquetes filtrados en el estado.
          setPaquetesFiltrados(paquetesFiltrados);
    };

    const placeholder = {
        origen: `Origen: ${respuesta.origen_id}`,
        destino: `Destino: ${respuesta.destino_id}`,
        calendario: respuesta.mes ? `Mes: ${respuesta.mes}` : `${respuesta.fechaInit} - ${respuesta.fechaFin}`,
        pasajeros: `Pasajeros: ${respuesta.personas}`
    };

    const initialValues = {
        origen: respuesta.origen_id,
        destino: respuesta.destino_id,
        fecha: {
            tipo: respuesta.mes ? 'mes' : 'rango',
            fechaInicio: respuesta.mes ? null : respuesta.fechaInit,
            fechaFin: respuesta.mes ? null : respuesta.fechaFin,
            mes: respuesta.mes || null,
        },
        pasajeros: respuesta.personas,
    };

    const handleBuscarViaje = (respuesta) => {
        const dataForNavigate = {
            respuesta,
            aeropuertos
        }
        navigate('/ver-paquetes', { state: dataForNavigate }); // Navega a la página "/ver-paquetes" con el objeto respuesta
    };

    const handleComprar = (paquete) => {
        // Log the package id
        // console.log(paquete.id);

        // Call the agregarVista function with the package id
        agregarVista({ fk_fechaPaquete: paquete.id })
            .then(response => {
                // Handle the response if needed
                // console.log(response);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });

        // Navigate to the '/detalle' route with the package details
        navigate('/detalle', { state: paquete });
    }

    useEffect(() => {
        const fetchPaquetes = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;
                if (respuesta.mes) {
                    data = await getPaquetesMes(respuesta);
                } else {
                    data = await getPaquetes(respuesta);
                }
                setPaquetes(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (respuesta) {
            fetchPaquetes();
        }
    }, [respuesta]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Header />
            <div className="BuscaViajeVerPaquetes">
                <BuscaViaje
                    aeropuertos={aeropuertos}
                    placeholder={placeholder}
                    onSubmit={handleBuscarViaje}
                    initialValues={initialValues}
                    className={'VerPaquetes__Header'}
                />
            </div>

            <div className="VerListaPaquetes">
                <div className="col-md-12 mx-5 mr-5 mt-2 pl-5 ">
                    <div className="Botones" >
                        <BotonOrdener paquetes={paquetes} setPackages={setPaquetes} />
                        <button type='button' className='btn' onClick={() => setShowModal(true)}>Filtros</button>
                    </div>
                </div>
                <ListaPaquetes
                    paquetes={paquetesFiltrados}
                    onBuy={handleComprar}
                />
            </div>
            <Footer />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body>
                    <Filtros filtrarPaquetes={filtrarPaquetes} />
                </Modal.Body>

            </Modal>
        </>
    );
};

export default VerPaquetes;