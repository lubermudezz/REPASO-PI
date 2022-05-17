const { DataTypes, UUID, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("character", {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    species: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // image: {
    //   type: DataTypes.image,
    //   allowNull: false,
    // },
    created: {
      type: DataTypes.STRING,
      allowNull: false, 
    }





  
  });
};
