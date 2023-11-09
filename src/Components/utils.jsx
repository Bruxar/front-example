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
        stars.push(<span style={{color:"#F4BA40"}} key={`star_${i}`} className="star filled">★</span>);
    }

    for (let i = valoracion; i < totalStars; i++) {
        stars.push(<span key={`star_${i}`} className="star">☆</span>);
    }

    return stars;
};

export const renderServiceIcons = (services) => {
    return services.split(', ').map((service, index) => (
        <span className='p-3' key={`serviceIcon_${index}`}>
            {serviceIcons[service] || service}
        </span>
    ));
};

export function formatFecha(fecha) {
    const meses = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];
  
    const parts = fecha.split('-'); // Divide la fecha en partes: año, mes y día
    const [year, month, dia] = parts;

    
    // Obtiene el nombre del mes usando el número del mes
    const nombreMes = meses[parseInt(month) - 1];
  
    // Formatea la fecha en el formato deseado (DD-Mes)
    const formattedFecha = `${dia} ${nombreMes}`;
    
    return formattedFecha;
  }

  export function MesString (mes)
 {   const messtring = mes ? new Date(0, mes - 1).toLocaleString('es-ES', { month: 'long' }) : null;
    return messtring
}