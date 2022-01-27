import { GET_COUNTRIES, GET_COUNTRY, GET_FILTER, SEARCH_COUNTRY, LIST_ACTIVITY, FILTER_ACTIVITY } from "../actions";

const initialState = {
    countries: [],
    allCountries: [],
    country : [],
    activity: [],    
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_COUNTRIES:
            const info = action.payload
            console.log(info)
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }
        case GET_FILTER:
            const nofiltercount = state.allCountries;
            const filtercountries = action.payload === "all" ? state.countries : nofiltercount.filter((c) => c.region == action.payload)
            return {
               ...state, 
               countries: filtercountries  
            }  
        case GET_COUNTRY:
            return {
                 ...state, 
                country : action.payload  
            } 
        case SEARCH_COUNTRY:
            const search = state.allCountries;
            const name = action.payload.buscar.toLowerCase().replace(/\w\S*/g,(w) => (w.replace(/^\w/, (c) => c.toUpperCase()))); 
            var check1 = action.payload && search.filter((oc) => oc.name.includes(name) )
            const onecountry = check1.length >"0"?check1:[{msg: `El País ${name} no se encuentra`}]
            return {
                ...state, 
                countries : onecountry  
            }
        case LIST_ACTIVITY:
            
            return {
                ...state,
                activity: action.payload
            } 
        case FILTER_ACTIVITY:
        const countries = state.allCountries    
        const filteractivities = []
            for (let i = 0; i<countries.length;i++) {
                for(let o = 0;o < countries[i].tourisms.length; o++){
                  if (countries[i].tourisms[o].name == action.payload)  
                  {  
                    filteractivities.push(countries[i])
                  }
                }    
              }  
            return {
                ...state,
                countries: filteractivities
            }                   
       default :
           return state       
    };
};

export default rootReducer;
