const Sequelize = require('sequelize')
const db = require("../../db/dbmysql");

module.exports = db.sequelize.define(
    "images",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        book_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'books',
                key: 'id'
            }
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        originalname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        key: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
