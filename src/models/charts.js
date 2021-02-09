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
            lowertempo: {
                type: DataTypes.INTEGER(5),
                allowNull: false,
            },
            uppertempo: {
                type: DataTypes.INTEGER(5),
                allowNull: false,
            },
            difficulty: {
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
            modelName:'Charts',
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Playdata.hasMany(db.Playdata, { foreignKey: 'charts_id', targetKey: 'id' });
    };
}