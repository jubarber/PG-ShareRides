const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('colaboracion', {
        unit_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuarioId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 1
        },
        abonado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        orderId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

};