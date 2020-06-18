const Sequelize = require('sequelize')
const db = require("../../db/dbmysql");

module.exports = db.sequelize.define(
    'books',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        isbn: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 9780133387520
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Cloud Computing: Concepts, Technology & Architecture'
        },
        authors: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Thomas Erl, Ricardo Puttini, Zaigham Mahmood'
        },
        publication_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: '2008-10-03 22:59:52'
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 999
            }            
        },
        price: {
            type: Sequelize.DOUBLE,
            defaultValue: 50.03,
            allowNull: false,
            validate: {
                min: 0.01,
                max: 9999.99
            }
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdOn: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedOn: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
})