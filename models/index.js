const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
// const Customer = require('./customer');
// const Order = require('./order');

let sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.sequelize = sequelize;

db.User = User;

User.initiate(sequelize);

User.associate(db);


module.exports = db;