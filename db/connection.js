const config = require('config')
const mysql = require('mysql')

const connection = mysql.createConnection(config.get('dbconnection'));

module.exports = connection