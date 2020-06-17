const http = require('http');
const app = require('./app');
const db = require('./db/dbmysql')

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port);

db.sequelize.sync();
