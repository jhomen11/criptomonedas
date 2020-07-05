import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    color: #fff;
    text-transform: uppercase;
    font-family: 'Bebas Neue', cursive;
    font-size: 2.4rem;
    font-weight: bold;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.3rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {
    //console.log(opciones)
    //State del custom hooks Moneda
    const [state, actualizarState] = useState('');

    const SelecCripto = () => (
        <Fragment>
            <Label >{label}</Label>
            <Select 
                value={state}
                onChange={ e => actualizarState(e.target.value)}
            >
                <option value="">-- Seleccione --</option>
                 {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    ) 
    //Retornar State, interfaz y funcion que modifica el state      
    return [state, SelecCripto, actualizarState];
}

export default useCriptomoneda;