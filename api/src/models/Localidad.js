const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("localidad", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    provincia:{
        type: DataTypes.STRING,
        allowNull: false
    },
    municipio:{
        type: DataTypes.STRING,
        allowNull: false
    }
  });
};
