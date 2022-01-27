import React from 'react';




function Paginado({paisestotales,paisesxpagina,paginacion}) {

    var paginado = [];
    
    for (let i = 0; i <=Math.ceil(paisestotales/paisesxpagina)-1; i++){
      paginado.push(i+1);
    }
    

 return (
    <>
    <h3>paginas totales</h3>
      <nav className='paginado'>
        <ul  className="Container">          
         {
            paginado && paginado.map((p) => {
                return <li className="page-item" key={p}><button href="#" onClick={() => paginacion(p)}>{p}</button></li>           
            })
         }  
        </ul>    
      </nav>
      </>
  )
}

export default Paginado;
  
  

