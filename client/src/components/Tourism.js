import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, getCountries } from '../actions';



function Tourism() {
const initialState = {
    name: "",
    difficulty: "",
    duration: "",
    season:"",
    activity: [],
}
var success = ""
var autherror = ""
const [Error,setError] = useState(autherror)
const [inputAct,setInputAct] = useState(initialState)
const [Success,setSuccess] = useState(success)
const listadopaises = useSelector((state) => state.allCountries);
const dispatch = useDispatch();
listadopaises.sort(sortDesc)

function sortDesc(a,b){
    if (a.name < b.name) return -1
    else if (a.name > b.name) return 1
    else return 0   
}

useEffect (() => {
    dispatch(getCountries());
},[dispatch])

const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "activity") {
        setInputAct({...inputAct, [e.target.name]: [...inputAct.activity,e.target.value]})
    }
    else setInputAct({...inputAct, [e.target.name]: e.target.value})
    }

const handleAuth = () => {


    console.log(inputAct.name.length)
    if (inputAct.name.length === 0) {
         return "noname"
    }    
    if (inputAct.difficulty.length === 0) {
         return "nodiff"
    }
    else if (inputAct.duration.length === 0) {
        return "nodur"
    } 
    else if (inputAct.season.length === 0) {
        return "noseas"
    } 
    else if (inputAct.activity.length === 0) {
        return "noid"
    } 
    else {return "ok"}   
}    
const handleSubmit = (e) => {
    e.preventDefault();
    const check = handleAuth()
    console.log(check)
    if (check === "noname"){ 
    var authname = "Debes completar el nombre de la actividad"     
    setError(authname)     
    }
    else if (check === "nodiff"){ 
        var authdiff = "Debes completar la dificultad de la actividad"     
    setError(authdiff)     
    }
    else if (check === "nodur"){ 
        var authdur = "Debes completar la duración de la actividad"     
    setError(authdur)     
    }
    else if (check === "noseas"){ 
        var authseas = "Debes completar la temporada de la actividad"     
    setError(authseas)     
    }
    else if (check === "noid"){ 
        var authid = "Debes agregar uno o más paises a la actividad"     
    setError(authid)     
    }
    else {
        dispatch(createActivity(inputAct));
        setInputAct(initialState);
        setSuccess("Actividad Creada")
    }      
}    
    return (
    <>
    
    <div className='Activity'>
    <div>
        <h1>Crear Actividad Turistica</h1>
    </div>       
        <form onSubmit={(e) => {handleSubmit(e)}}>
        <ul>
            <li>
                <label>Nombre: </label>
                <input
                type="text"
                name="name"
                value={inputAct.name}
                onChange={(e) => {handleChange(e)}}
                />                
            </li>
            <li>
                <label>País </label>
                <select name="activity" onChange={(e) => {handleChange(e)}}>
                    {
                        listadopaises && listadopaises.map((p) => {
                            return <option key={p.id} value={p.id}>{p.name}</option>
                        } )
                    }
                </select>
                <h3>Paises Seleccionados</h3>
                    {
                        inputAct.activity && inputAct.activity.map((p) => <li key={p}>{p}</li>)
                    } 
                       
            </li>
            <li>
                <label>Dificultad: </label>
                <select name="difficulty" onChange={(e) => {handleChange(e)}} className='selectdiv'>
                    <option>Seleccionar dificultad...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>  
                    <option value="3">3</option>  
                    <option value="4">4</option>  
                    <option value="5">5</option>    
                </select>
                 
            </li>
            <li>
                <label>Duración: </label>
                <select name="duration" onChange={(e) => {handleChange(e)}} className='selectdiv'>
                    <option>Seleccionar duración...</option>
                    <option value="30 minutos">30 minutos</option>
                    <option value="Entre 1 y 2 horas">Entre 1 y 2 horas</option>  
                    <option value="Entre 2 y 3 horas">Entre 2 y 3 horas</option>  
                    <option value="Entre 4 y 5 hora">Entre 4 y 5 horas</option>  
                    <option value="Más de 5 horas">Más de 5 horas</option>                
                </select>
                
            </li>
            <li>
                <label>Temporada: </label>
                <select name="season" onChange={(e) => {handleChange(e)}}className='selectdiv'>
                    <option>Seleccionar temporada...</option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>  
                    <option value="Invierno">Invierno</option>  
                    <option value="Primavera">Primavera</option>  
                </select>
                
            </li>
            <li>
                <h4 className='Create-Error'>{Error}</h4>
                <h4 className='Create-Success'>{Success}</h4>
            </li>
            <li>
                <button type="submit" value="Create">Crear Actividad Turistica</button>
            </li>
        </ul>
        </form>
    </div>
    </>
)

}

export default Tourism