const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("colaboracion", {
    unit_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuarioPagador: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    abonado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    usuarioCobrador: {
      type: DataTypes.STRING,
      allowNull: false
    },
    viajeId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
