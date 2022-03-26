const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("provincia", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
