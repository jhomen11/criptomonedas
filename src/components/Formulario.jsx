import React, {useEffect, useState}from 'react';
import styled from '@emotion/styled';
import axios from 'axios'
import Error from './Error'


import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }

`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [listacripto, guardarListacripto] = useState([]);
    const [error, guardarError] = useState (false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ]

    
    const [moneda, SelectMoneda] = useMoneda('Elige tu Moneda ', '', MONEDAS);
    const [criptomoneda, SelecCripto] = useCriptomoneda('Elige tu Criptomoneda ', '', listacripto);

    useEffect(() => {
        const consultarAPI = async () =>{

            const URL = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';

            // const respuesta = await fetch(URL);
            // const resultado = await respuesta.json();
            const resultado = await axios.get(URL);
            
            //console.log(resultado)
            guardarListacripto(resultado.data.Data);


        }

        consultarAPI();
    }, [])

    const cotizarMoneda = (e) => {
        e.preventDefault();
        //validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true)
            return;
        }
        //si pasa la validacion se pasaran los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }
    return (
        <form
            onSubmit={cotizarMoneda}
        >
        
        {error ? <Error mensaje={'Todos los campos son obligatorios'} />: null}
            <SelectMoneda />
            <SelecCripto
                
            />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}

export default Formulario;
