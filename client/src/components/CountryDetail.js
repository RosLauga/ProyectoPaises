import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { getCountry } from '../actions';


function CountryDetail() {
  const dispatch = useDispatch();
  const { name, flags, region, capital,subregion,id, population, area, tourisms} = useSelector((state) => state.country)
  const {idname} = useParams();
     

useEffect( () => {
    dispatch(getCountry(idname))
},[dispatch]);   




   return (
       <>
        <section className='Containerleft'> 
            <div className='CountryCol'>                
                <div className="CountryDetail">
                    <div className='contflag'><img src={flags} alt="Imagen sin encontrar" /></div>
                    <h1>País: {name}</h1>
                    <h3>Código País: {id}</h3>
                    <h3>Continente: {region}</h3>
                    <h3>Capital: {capital}</h3>   
                    <h3>Subregion: {subregion}</h3> 
                    <h3>Área: {area} km</h3> 
                    <h3 >Población: {population}</h3>                    
                </div>                      
            </div>
            <div className='CountryCol'>
                <div className="CountryDetail">
                    <h1>Actividades turisticas</h1>
                    <div className='Container'>
                        {
                            
                            tourisms?tourisms.length === "0"?<p>"No existen actividades"</p>:tourisms.map((c) => {                                
                                return (
                                    <>
                                    <ul key={area} className="tourism-list">
                                        <li className="tourism-item" >Nombre: {c.name}</li>
                                        <li className="tourism-item" >Temporada: {c.season}</li>
                                        <li className="tourism-item" >Duración: {c.duration}</li>
                                        <li className="tourism-item" >Dificultad: {c.difficulty} estrella/s</li>
                                    </ul>    
                                    </>
                            )                                
                        }):<p>"No existen actividades"</p>
                        }
                        
                    </div>    
                </div>    
            </div>
        </section>     
       </> 

    );
}

export default CountryDetail;
