import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  const [ busqueda, guardarBusqueda ] = useState({
      ciudad: '',
      pais: ''
  });

  const [consultar, guardarConsultar] = useState(false)

  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(()=>{
    const consultarAPI = async () => {
      
      if(consultar) {
        const appId = '261f0456d85607b6fa108390ae5d2555';
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        //Detectar si hubo errores en la busqueda a la API
        if(resultado.cod === "404"){
          guardarError(true);
        } else {
          guardarError(false)
        }
      }
    }
    consultarAPI();


  }, [consultar, ciudad, pais]);

  let componente;

  if(error){
    componente = <Error mensaje= "No hay resultado"/>
  }else{
    componente = <Clima resultado ={resultado}/>
  }


  return (
    <Fragment>
      <Header
        titulo = 'Clima React App'
      ></Header>
      <div className="contenedor-form">
        <div className=" container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda = {busqueda}
                guardarBusqueda = {guardarBusqueda}
                guardarConsultar= {guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
