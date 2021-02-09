const { Model, DataTypes } = require('sequelize');

module.exports = class Skillpoint extends Model {
    static init(sequelize) {
        return super.init({
            hot_skillpoint: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
            },
            other_skillpoint: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
            },
            timestamp: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'Skillpoint',
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'});
    };
}