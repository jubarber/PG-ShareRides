const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define('order', {
        //Mercado pago 👇
        payment_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        usuarioPagador:{
            type: DataTypes.STRING,
            allowNull: false
        },
        merchant_order_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
            allowNull: false,
            defaultValue: 'created'
        },
    });

};

