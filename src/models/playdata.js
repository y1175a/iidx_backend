const { Model, DataTypes } = require('sequelize');

module.exports = class Playdata extends Model {
    static init(sequelize) {
        return super.init({
            playcount: {
                type: DataTypes.INTEGER(10),
                allowNull: true,
            },
            score: {
                type: DataTypes.INTEGER(5),
                allowNull: true,
            },
            rank: {
                type: DataTypes.INTEGER(2),
                allowNull: true,
            },
            misscount: {
                type: DataTypes.INTEGER(5),
                allowNull: true,
            },
            cleartype: {
                type: DataTypes.INTEGER(2),
                allowNull: true
            },
            skillpoint: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            timestamp: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'Playdata',
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'});
        db.Charts.belongsTo(db.Charts, { foreignKey: 'charts_id', targetKey: 'id'});
    };
}