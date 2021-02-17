const { Model, DataTypes } = require('sequelize');

module.exports = class Playdata extends Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: DataTypes.INTEGER(20),
                allowNull: false,
            },
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
            // timestamp: {
            //     type: DataTypes.DATE,
            //     allowNull: true,
            // },
        }, {
            sequelize,
            modelName: 'playdata',
            tableName: 'playdata',
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Playdata.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'});
        db.Playdata.belongsTo(db.Charts, { foreignKey: 'charts_id', targetKey: 'id'});
    };
}