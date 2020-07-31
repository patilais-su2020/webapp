const Sequelize = require('sequelize')
const db = {}
const fs = require('fs');
const db_name = process.env.db_name || 'webappdb'
const db_username = process.env.db_username || 'admin'
const db_password = process.env.db_password || 'admin'

const sequelize = new Sequelize(db_name, db_username, db_password, {
    host: process.env.db_hostname || "localhost",
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca : fs.readFileSync('/home/ubuntu/certs/rds-ca-2019-root.pem')
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  });

  db.sequelize = sequelize;

  db.Sequelize = Sequelize;

  module.exports = db;