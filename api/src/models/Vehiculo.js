const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("vehiculo", {
    patente: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
