import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'




function Card({id,name, region, image, error}) {


    
    return (
        
        
            <div className='Card'>
                <Link to={`/countries/${id}`}>
                    <div>    
                    {   
                        !id || !name || !region || !image? 
                        <h3>Error: {error}</h3>:
                                        
                        <><div className='Card-item Flag'>
                                        <img src={image} alt="Imagen sin encontrar" />
                                    </div><div className='Card-item'>
                                            <h3>País: {name}</h3>
                                        </div><div className='Card-item'>
                                            <h3>Continente: {region}</h3>
                                        </div></>               

                    }
                    </div>
                </Link>                       
            </div>
         
          
    );
}

export default Card;
