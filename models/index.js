const Sequelize = require('sequelize');

const User = require('../src/models/user');
const Skillpoint = require('../src/models/skillpoint');
const Charts = require('../src/models/charts');
const Playdata = require('../src/models/playdata');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Skillpoint = Skillpoint;
db.Charts = Charts;
db.Playdata = Playdata;

User.init(sequelize);
Skillpoint.init(sequelize);
Charts.init(sequelize);
Playdata.init(sequelize);

User.associate(db);
Skillpoint.associate(db);
Charts.associate(db);
Playdata.associate(db);

module.exports = db;
