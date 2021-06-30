const { Model, DataTypes } = require('sequelize');

module.exports = class Songs extends Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: DataTypes.STRING,
            },
            artist: {
                type: DataTypes.STRING,
            },
            bpm: {
                type: DataTypes.STRING,
            },
            version: {
                type: DataTypes.STRING,
            },
        }, {
            sequelize,
            modelName: 'Songs',
            tableName: 'songs',
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Songs.hasMany(db.Charts, { foreignKey: 'song_id', sourceKey: 'id' });
    };
}