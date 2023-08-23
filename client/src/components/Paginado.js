import React from 'react';
import './Paginado.css'



function Paginado({paisestotales,paisesxpagina,paginacion}) {

    var paginado = [];
    
    for (let i = 1; i <=Math.ceil((paisestotales+1)/paisesxpagina); i++){
      paginado.push(i);
    }
    
 return (
    <>
    <nav className='paginado'>
        <ul  className="Container">          
         {
            paginado && paginado.map((p) => {
                return <li className="page-item" key={p}><button className="button-item" href="#" onClick={() => paginacion(p)}>{p}</button></li>           
            })
         }  
        </ul>    
      </nav>
      </>
  )
}

export default Paginado;
  
  

