// HANDLER DE AUTORIZACIONES AL CREAR ACTIVIDAD
export const handleAuth = (obj) => {        
        if (obj.name.length === 0) {
             return "noname"
        }
        else {
            if (!/^[a-zA-Z0-9]{4,20}$/.test(obj.name)) {
                return "nocaracter"
            } 
        }        
        if (obj.difficulty.length === 0) {
             return "nodiff"
        }
        else if (obj.duration.length === 0) {
            return "nodur"
        } 
        else if (obj.season.length === 0) {
            return "noseas"
        } 
        else if (obj.activity.length === 0) {
            return "noid"
        } 
        else {
            return "ok"
        }   
}  
// FILTRO DE ORDEN DESC
export const sortDesc = (a,b) => {
    if (a.name < b.name) return -1
    else if (a.name > b.name) return 1
    else return 0   
}
// ORDENAR ASCENDENTE Y DESCENDENTE
export const sortAsc = (a,b) => {
    if (a.name > b.name) return -1
    else if (a.name < b.name) return 1
    else return 0   
}
// ORDENAR ASCENDENTE
export const sortPopAsc = (a,b) => {
    if (a.population > b.population) return -1
    else if (a.population < b.population) return 1
    else return 0   
}
// ORDENAR DESCENDENTE
export const sortPopDesc = (a,b) => {
    if (a.population < b.population) return -1
    else if (a.population > b.population) return 1
    else return 0   
}