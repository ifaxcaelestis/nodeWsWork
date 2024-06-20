const mysql = require('mysql');
const config = require('./config.js');
const pool = mysql.createPool(config.mysql);