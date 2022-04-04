const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("viaje", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hora: {
      type: DataTypes.STRING,
      allowNull: false
    },
    origen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false
    },
    asientosAOcupar: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    formaDePago: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pagoCompartido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    aceptaFumador: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    aceptaMascota: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    usaBarbijo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    aceptaEquipaje: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    viajeDisponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    conductor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });
};
