import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountry } from "../actions/index.js";





function SearchBar({paginacion}) {
  var search = {
    buscar: ""
  };
  const [input, setInput] = useState(search);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInput({...input, buscar: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    paginacion("1");
    dispatch(searchCountry(input));
    setInput({buscar: ""});
  };
  
    return (
        <div>
          <form className="Container" onSubmit={(e) => {handleSubmit(e)}}>
           <div>
              <input
                type="text"
                id="title"
                className='selectdiv searchbar'
                autoComplete="off"
                value={input.buscar}
                onChange={(e) => {handleChange(e)}}
              />
            </div>
             <div>
                <button className="buttonsearch" type="submit">BUSCAR</button>
             </div>    
        </form>     
      </div>
    );
}

export default SearchBar;