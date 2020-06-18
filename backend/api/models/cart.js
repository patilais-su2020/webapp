const Sequelize = require('sequelize')
const db = require("../../db/dbmysql");

module.exports = db.sequelize.define(
    'cart',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        buyer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        seller_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        book_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'books',
                key: 'id'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
})
