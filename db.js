const { Sequelize } = require('sequelize');

// Initialize Sequelize instance with PostgreSQL
const sequelize = new Sequelize('techeer', 'miyoung', 'miyoung', {
  host: 'localhost',
  dialect: 'postgres', // Using PostgreSQL dialect
});

module.exports = sequelize;
