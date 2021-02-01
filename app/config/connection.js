// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

require('dotenv').config()

// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASS, {
  host: process.env.HOST,
  port: 3306,
  dialect: "mysql"
});



// Exports the connection for other files to use
module.exports = sequelize;
