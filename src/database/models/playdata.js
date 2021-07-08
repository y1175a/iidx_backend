const { Model, DataTypes } = require('sequelize');

module.exports = class Playdata extends Model {
    static init(sequelize) {
        return super.init({
            score: {
                type: DataTypes.INTEGER,
            },
            pgreat: {
                type: DataTypes.INTEGER,
            },
            great: {
                type: DataTypes.INTEGER,
            },
            rank: {
                type: DataTypes.STRING,
            },
            cleartype: {
                type: DataTypes.STRING,
            },
            skillpoint: {
                type: DataTypes.FLOAT,
            },
        }, {
            sequelize,
            modelName: 'Playdata',
            tableName: 'playdata',
            timestamps: true,
            underscored: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(models) {
        models.Playdata.belongsTo(models.Users, { foreignKey: 'user_id', targetKey: 'id'});
        models.Playdata.belongsTo(models.Charts, { foreignKey: 'chart_id', targetKey: 'id'});
    };
}