import React, { useEffect, useState } from 'react';
import { getAeropuertos, getUbicacion, getPaquetesOfertas } from '../../api';
import BuscaViaje from '../../Components/buscaViaje/BuscaViaje';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import Carrusel from './carrusel/OfferCarousel'

import './Home.css';
import Footer from '../../utils/Footer';
import Header from '../../utils/Header';

const Home = () => {
    const [aeropuertos, setAeropuertos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paquetesOfertas, setPaquetesOfertas]= useState([])
    const [ubicacion, setUbicacion]= useState({Ciudad:''})
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Obtén la función de navegación

    useEffect(() => {
        const fetchAeropuertos = async () => {
            try {
                const data = await getAeropuertos();
                setAeropuertos(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAeropuertos();
    }, []);

    useEffect(() => {
        const fetchUbicacion = async () => {
            try {
                const data = await getUbicacion();
                setUbicacion({ Ciudad: data.cityName });
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUbicacion();
    }, []);
console.log(ubicacion)


    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                const data = await getPaquetesOfertas(ubicacion);
                setPaquetesOfertas(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOfertas();
    }, [ubicacion]);

 console.log(paquetesOfertas)


    const handleBuscarViaje = (respuesta) => {
        console.log(respuesta);
        const dataForNavigate = {
            respuesta,
            aeropuertos
        }
        navigate('/ver-paquetes', { state: dataForNavigate }); // Navega a la página "/ver-paquetes" con el objeto respuesta
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="Home">
            <Header />
            <div className="Contenedor">
                <h1 className="Titulo">¡Busca tu viaje ahora!</h1>
                <BuscaViaje
                    aeropuertos={aeropuertos}
                    onSubmit={handleBuscarViaje}
                />
            </div>
            <div className="carrusel">
                {paquetesOfertas != null ? (
                    <Carrusel paquetes={paquetesOfertas} />
                ) : (
                    <div>No se encontraron paquetes de oferta.</div>
                )}
            </div>
        </div>
    );
};

export default Home;
