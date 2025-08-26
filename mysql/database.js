const { Sequelize } = require("sequelize")

require("dotenv").config()


const db = new Sequelize(process.env.MYSQL_PUBLIC_URI)

module.exports = db