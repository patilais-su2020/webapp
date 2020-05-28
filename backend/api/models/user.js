const Sequelize = require('sequelize')
const db = require("../../db/dbmysql");

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            // validate: {
            //     notEmpty: true,
            //     len: {
            //         args: [8, 16],
            //         msg: "Email address must be between 6 and 128 characters in length"
            //     },
            // }
        }
    },
    {
        timestamps: false
})