const Sequelize = require('sequelize');

const Users = require('./users');
const Profiles = require('./profiles');
const Skills = require('./skills');
const Songs = require('./songs');
const Charts = require('./charts');
const Playdata = require('./playdata');

const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];
const models = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.Users = Users;
models.Profiles = Profiles;
models.Skills = Skills;
models.Songs = Songs;
models.Charts = Charts;
models.Playdata = Playdata;

Users.init(sequelize);
Profiles.init(sequelize);
Skills.init(sequelize);
Songs.init(sequelize);
Charts.init(sequelize);
Playdata.init(sequelize);

Users.associate(models);
Profiles.associate(models);
Skills.associate(models);
Songs.associate(models);
Charts.associate(models);
Playdata.associate(models);

module.exports = models;
