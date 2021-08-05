const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Skill = require('./skill')(sequelize, Sequelize);
db.Song = require('./song')(sequelize, Sequelize);
db.Chart = require('./chart')(sequelize, Sequelize);
db.Record = require('./record')(sequelize, Sequelize);

db.User.hasOne(db.Skill, { foreignKey: "user_id", sourceKey: "id" });
db.Skill.belongsTo(db.User, { foreignKey: "user_id", sourceKey: "id" });

db.User.hasMany(db.Record, { foreignKey: "user_id", sourceKey: "id" });
db.Record.belongsTo(db.User, { foreignKey: "user_id", sourceKey: "id" });

db.Chart.hasMany(db.Record, { foreignKey: "chart_id", sourceKey: "id" });
db.Record.belongsTo(db.Chart, { foreignKey: "chart_id", sourceKey: "id" })

db.Song.hasMany(db.Chart, { foreignKey: 'song_id', sourceKey: 'id' });
db.Chart.belongsTo(db.Song, { foreignKey: 'song_id', sourceKey: 'id' });

module.exports = db;
