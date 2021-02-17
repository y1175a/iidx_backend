const { Model, DataTypes } = require('sequelize');

module.exports = class Charts extends Model {
    static init(sequelize) {
        return super.init({
            version: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            artist: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            diff: {
                type: DataTypes.INTEGER(2),
                allowNull: false,
            },
            level: {
                type: DataTypes.INTEGER(2),
                allowNull: false,
            },
            potential: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            notes: {
                type: DataTypes.INTEGER(5),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName:'charts',
            tableName:'charts',
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Charts.hasMany(db.Playdata, { foreignKey: 'charts_id', sourceKey: 'id' });
    };
}