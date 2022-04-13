const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("comentarios", {
    dia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
