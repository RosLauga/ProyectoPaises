import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import SearchBar from './Searchbar.js';
import Paginado from './Paginado.js'
import {getCountries, getFilter, listActivity, filterActivity} from "../actions/index.js";
import './Home.css'
import Card from './Card'


export default function Home() { 
// PAGINADO
 const dispatch = useDispatch()
 const allCountries = useSelector((state) => state.countries)
 const actividades = useSelector((state) => state.activity)
 const [paginas,setPaginas] = useState(1);
 const [paises,setPaises] = useState(9);
 const ultimopaislista = paginas * paises; 
 const primerpaislista = paginas==2?ultimopaislista - paises - 1:ultimopaislista - paises; 
 var paginactual = allCountries.slice(primerpaislista,ultimopaislista)
 var paisestotales = allCountries.length
 
const location = useLocation(); 
const basepaises = 10
 useEffect( () => {
    if (location.search.length === "0")
    dispatch(getCountries());
    else dispatch(getCountries(location.search));
    dispatch(listActivity());
},[dispatch])

// useEffect( () => {   
//     dispatch(getCountries());  
// },[dispatch])


const paginacion = (pvalor) => {
    if (pvalor == 1) {
    setPaginas(pvalor);
    setPaises(9);
    }
    else {
        setPaises(10);
        setPaginas(pvalor);
    }
 }

const [Asc,setAsc] = useState(0)
 // ORDENAR ASCENDETE

function sortDesc(a,b){
    if (a.name < b.name) return -1
    else if (a.name > b.name) return 1
    else return 0   
}

// ORDENAR ASCENDENTE Y DESCENDENTE
function sortAsc(a,b){
    if (a.name > b.name) return -1
    else if (a.name < b.name) return 1
    else return 0   
}
// ORDENAR ASCENDENTE Y DESCENDENTE

function sortPopAsc(a,b){
    if (a.population > b.population) return -1
    else if (a.population < b.population) return 1
    else return 0   
}
function sortPopDesc(a,b){
    if (a.population < b.population) return -1
    else if (a.population > b.population) return 1
    else return 0   
}

// ORDENAR POR CONTINENTE
function handleRegion(e) {
  setPaginas(1); 
  dispatch(getFilter(e.target.value))        
  } 

function handleActivity(e) {
    e.preventDefault();
    setPaginas(1); 
    dispatch(filterActivity(e.target.value))        
}   

const handleAsctoDesc = (e) => {
    e.preventDefault();    
    if(e.target.value === "asc") {
        allCountries.sort(sortDesc);
         return setAsc(1);
    }
    else if  (e.target.value === "desc"){
        allCountries.sort(sortAsc);
        return setAsc(2);
    }
    else if  (e.target.value === "popasc"){
        allCountries.sort(sortPopAsc);
        return setAsc(3);
    }
    else if  (e.target.value === "popdesc"){
        allCountries.sort(sortPopDesc);
        return setAsc(4);
    }
    else return
}

function refresh(e){
    e.preventDefault();
    dispatch(getCountries("/"))
}
    return (
        
        <section>
        <ul className='nav justify-content-center'>
            <li className='nav-item'>
                <button onClick={(e) => {refresh(e)}}>Ver todos</button>
            </li>
            <li className='nav-item'>
                <SearchBar paginacion={paginacion} />
            </li>
            <li className='nav-item'>
                <div className='selectdiv'>
                    <label>
                        <select onChange={(e) => {handleAsctoDesc(e)}} >
                            <option value="all">Alfabeticamente</option>
                            <option value="asc">-- Ascendente</option>
                            <option value="desc">-- Descendente</option>
                        </select>
                    </label>
                </div>    
            </li>
            <li className='nav-item'>                
                <div className='selectdiv'>
                        <label>
                            <select onChange={(e) => {handleAsctoDesc(e)}} >
                                <option value="all">Población</option>
                                <option value="popasc">-- Ascendente</option>
                                <option value="popdesc">-- Descendente</option>
                            </select>
                        </label>
                </div>  
            </li>
            <li className='nav-item'>
            <div className='selectdiv'>
                <label>
                    <select onChange={(e) => {handleRegion(e)}} >
                        <option value="all">Seleccionar Continente..</option>
                        <option value="Americas">America</option>
                        <option value="Antarctic">Antartida</option>
                        <option value="Africa" >Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europa</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </label>    
            </div>
            </li>
            <li className='nav-item'>
            <div className='selectdiv'>              
                <select onChange={(e) => {handleActivity(e)}}>  
                    <option>Seleccionar actividad turistica...</option>               
                    {
                        actividades?actividades.map((a) => <option key={a.id} value={a.name}>{a.name}</option>):<option>No existen actividades</option>
                    }
                </select>
            </div>  
            </li> 
            <li className='nav-item'>
            <Link to="/activity"><button>Crear Actividad Turistica</button></Link>               
            </li>             
        </ul> 
        <Paginado paisestotales={paisestotales} paisesxpagina={basepaises} paginacion={paginacion} />
        <div className='Container Cardwrap'>            
        {
        paginactual && paginactual.map((c) => {
            return <Card key={c.name} error={c.msg} id={c.id} name={c.name} region={c.region} image={c.flags}/>
        })
         }
         </div>             
    </section>
    
            
    );
  }
  
 
