const { Model, DataTypes } = require('sequelize');

module.exports = class Skills extends Model {
    static init(sequelize) {
        return super.init({
            hot_skillpoint: {
                type: DataTypes.FLOAT,
            },
            other_skillpoint: {
                type: DataTypes.FLOAT,
            },
        }, {
            sequelize,
            modelName: 'Skills',
            tableName: 'skills',
            timestamps: true,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(models) {
        models.Skills.belongsTo(models.Profiles, { foreignKey: 'profile_id', targetKey: 'id'});
    };
}