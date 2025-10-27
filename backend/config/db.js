const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: '../.env' }); // Ensure correct path for .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false, // Set to true to see SQL queries in console
    define: {
      freezeTableName: true // Prevent Sequelize from pluralizing table names
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the MySQL database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, DataTypes, connectDB };