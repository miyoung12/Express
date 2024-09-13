const { Sequelize } = require('sequelize');

// Initialize Sequelize instance with PostgreSQL
const sequelize = new Sequelize('techeer', 'miyoung', 'miyoung', {
  host: 'db',
  dialect: 'postgres', // Using PostgreSQL dialect
});

module.exports = sequelize;
