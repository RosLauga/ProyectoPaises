const { DataTypes } = require('sequelize');
// o	ID
// o	Nombre
// o	Dificultad (Entre 1 y 5)
// o	Duración
// o	Temporada (Verano, Otoño, Invierno o Primavera)

module.exports = (sequelize) => {
  sequelize.define('tourism', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true
    },
    season: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })

};