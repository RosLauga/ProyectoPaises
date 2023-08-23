const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// o	ID (Código de 3 letras) *
// o	Nombre *
// o	Imagen de la bandera *
// o	Continente *
// o	Capital *
// o	Subregión
// o	Área
// o	Población



module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,      
    },
    area: {
      type: DataTypes.DECIMAL,      
    },
    population: {
      type: DataTypes.INTEGER,      
    },
    lat: {
      type: DataTypes.DECIMAL,
    },
    long: {
      type: DataTypes.DECIMAL,
    }       
  });  
};
