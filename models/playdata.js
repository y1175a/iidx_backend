const { Model, DataTypes } = require('sequelize');

module.exports = class Playdata extends Model {
    static init(sequelize) {
        return super.init({
            playcount: {
                type: DataTypes.INTEGER,
            },
            score: {
                type: DataTypes.INTEGER,
            },
            rank: {
                type: DataTypes.STRING,
            },
            misscount: {
                type: DataTypes.INTEGER,
            },
            cleartype: {
                type: DataTypes.INTEGER,
            },
            skillpoint: {
                type: DataTypes.FLOAT,
            },
        }, {
            sequelize,
            modelName: 'Playdata',
            tableName: 'playdata',
            timestamps: true,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Playdata.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'});
        db.Playdata.belongsTo(db.Charts, { foreignKey: 'chart_id', targetKey: 'id'});
    };
}