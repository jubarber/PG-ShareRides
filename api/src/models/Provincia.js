const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("provincia", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
