const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("comentarios", {
    calificacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
