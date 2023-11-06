// utils.js
import React from 'react';
import { FaConciergeBell, FaCocktail, FaBed, FaWifi, FaTv, FaCoffee } from 'react-icons/fa';

export const serviceIcons = {
    'Restaurante': <FaConciergeBell />,
    'Bar': <FaCocktail />,
    'Servicio de Habitaciones': <FaBed />,
    'Wi-Fi': <FaWifi />,
    'TV de pantalla plana': <FaTv />,
    'Desayuno buffet': <FaCoffee />,
    'Minibar': <FaBed />
};

export const renderStars = (valoracion) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 0; i < valoracion; i++) {
        stars.push(<span key={`star_${i}`} className="star filled">★</span>);
    }

    for (let i = valoracion; i < totalStars; i++) {
        stars.push(<span key={`star_${i}`} className="star">☆</span>);
    }

    return stars;
};

export const renderServiceIcons = (services) => {
    return services.split(', ').map((service, index) => (
        <span key={`serviceIcon_${index}`}>
            {serviceIcons[service] || service}
        </span>
    ));
};
