import React from 'react';
import styled from '@emotion/styled';

const ContenedorResultado = styled.div`
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1.5rem;
    box-sizing: border-box;
    margin-top: 2rem;

    p{
        font-family: 'Bebas Neue', cursive;
        font-size: 1.3rem;
        font-weight: bold;
        padding-left: 2rem;      

        :first-of-type{
            font-size: 2rem;
}
    }
    
`;

const Cotizacion = ({resultado}) => {

    //Verificar que si el objeto resultado llega vacio, no se ejecuta nada
    if(Object.keys(resultado).length === 0) return null;

    return (
        <ContenedorResultado>
            <p>El Precio es: <span>{resultado.PRICE}</span></p>
            <p>Precio mas alto del dia: <span>{resultado.HIGHDAY}</span></p>
            <p>Precio mas bajo del dia:<span>{resultado.LOWDAY}</span></p>
            <p>Variacion Últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></p>
            <p>Última Actualización: <span>{resultado.LASTUPDATE}</span></p>
        </ContenedorResultado>
    );
};

export default Cotizacion;