import React, { useState, useCallback } from 'react';
import './buscaViaje.css';

import InputBusqueda from '../inputBusqueda/inputBusqueda';
import CustomCalendar from '../customCalendar/customCalendar';

export default function BuscaViaje({ aeropuertos, onSubmit, placeholder, initialValues, className }) {
    const [origen, setOrigen] = useState(initialValues?.origen ? [aeropuertos.find(aeropuerto => aeropuerto.id === initialValues.origen)] : []);
    const [destino, setDestino] = useState(initialValues?.destino ? [aeropuertos.find(aeropuerto => aeropuerto.id === initialValues.destino)] : []);
    const [fecha, setFecha] = useState(initialValues?.fecha || {
        tipo: 'rango',
        fechaInicio: null,
        fechaFin: null,
        mes: null,
    });
    const [pasajeros, setPasajeros] = useState(initialValues?.pasajeros || 0);

    const [respuesta, setRespuesta] = useState([]);


    const handleOrigenSelect = (selected) => {
        setOrigen(selected);
    };

    const handleDestinoSelect = (selected) => {
        setDestino(selected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let nuevaRespuesta;
        if (fecha.tipo === 'rango') {
            nuevaRespuesta = {
                origen_id: origen && origen.length > 0 ? origen[0].id : null,
                destino_id: destino && destino.length > 0 ? destino[0].id : null,
                fechaInit: fecha.fechaInicio,
                fechaFin: fecha.fechaFin,
                personas: pasajeros
            };
        } else {  // asumimos que fecha.tipo === 'mes'
            nuevaRespuesta = {
                origen_id: origen && origen.length > 0 ? origen[0].id : null,
                destino_id: destino && destino.length > 0 ? destino[0].id : null,
                mes: fecha.mes,
                personas: pasajeros
            };
        }
        // Actualizamos el estado con la nueva respuesta
        setRespuesta(nuevaRespuesta);

        // Ahora usamos la nueva respuesta directamente,
        // ya que la actualización de estado es asíncrona y no se reflejaría inmediatamente
        if (onSubmit) {
            onSubmit(nuevaRespuesta);
        }
    };

    const handleDateSelect = useCallback((selection) => {
        if (selection.type === 'dateRange') {
            const [fechaInicio, fechaFin] = selection.dateRange;
            setFecha({ tipo: 'rango', fechaInicio, fechaFin });
        }
        else if (selection.type === 'month') {
            const { month } = selection;
            setFecha({ tipo: 'mes', mes: month.month });
        }
    }, []);

    const handlePasajerosChange = (e) => {
        setPasajeros(parseInt(e.target.value, 10));
    };


    const opcionesPasajeros = (
        <select
            className="InputPasajeros"
            value={pasajeros}
            onChange={handlePasajerosChange}
        >
            <option value="">{placeholder && placeholder.pasajeros ? placeholder.pasajeros : "Selecciona una opción"}</option>
            {Array.from({ length: 9 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                    {index + 1}
                </option>
            ))}
        </select>
    );





    return (
        <>
            <div className={className || "ContenedorBuscador"}>
                <div className="ContenedorOrigen">
                    <label className="LabelOrigen">Origen</label>
                    <InputBusqueda
                        id="origen"
                        options={aeropuertos}
                        onSelect={handleOrigenSelect}
                        placeholder={placeholder && placeholder.origen ? placeholder.origen : "Selecciona una opción"}
                    />
                </div>
                <div className="ContenedorDestino">
                    <label className="LabelDestino">Destino</label>
                    <InputBusqueda
                        id="destino"
                        options={aeropuertos}
                        onSelect={handleDestinoSelect}
                        placeholder={placeholder && placeholder.destino ? placeholder.destino : "Selecciona una opción"}

                    />
                </div>
                <div className="ContenedorFecha">
                    <label className="LabelFecha">Fecha</label>
                    <CustomCalendar onDateSelect={handleDateSelect} placeholder={placeholder && placeholder.calendario ? placeholder.calendario : "Selecciona una fecha"} />
                </div>
                <div className="ContenedorPasajeros mt-1" >
                    <label className="LabelPasajeros">Pasajeros</label>
                    {opcionesPasajeros}
                </div>
            </div>
            <div className="ContenedorBoton">
                <button className="BotonBuscar" onClick={handleSubmit}>
                    Buscar
                </button>
            </div>
        </>
    );
}
