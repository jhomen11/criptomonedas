import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin:0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after{
    content: '';
    width:100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;


function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomonedas] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false)

  useEffect (() =>{

    //Consultar la API nuevamente para obtener la cotizacion
        const cotizarCriptopmoneda = async () => {

          //Evitando la ejecucion la primera vez
        if(moneda === '') return;
    
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

          const resultado = await axios.get(url);

          //Mostrar el Spinner despues de obtener la cotización
          guardarCargando(true);

          //Ocultar el spinner y mostrar el resultado
          setTimeout(() => {

            guardarCargando(false)
            
            //guardar Cotizacion
            guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        },3000)

        }
        cotizarCriptopmoneda();
    
  }, [moneda, criptomoneda]);

    //Mostar el Spinner o mostar el resultado
    const componete = (cargando ? <Spinner /> : <Cotizacion resultado={resultado} />)

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>
          Cotiza criptomonedas al instante
        </Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomonedas}
        />
        {componete}
      </div>
    </Contenedor>
  );
}

export default App;
