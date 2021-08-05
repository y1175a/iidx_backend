module.exports = (sequelize, DataTypes) => 
  sequelize.define('Song', {
        s_title: {
            type: DataTypes.STRING,
        },
        s_artist: {
            type: DataTypes.STRING,
        },
        s_tempo: {
            type: DataTypes.STRING,
        },
        s_version: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        tableName: 'song',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
  );


// module.exports = class Songs extends Model {
//     static init(sequelize) {
//         return super.init();
//     }
//     static associate(models) {
//         models.Songs.hasMany(models.Charts, { foreignKey: 'song_id', sourceKey: 'id' });
//     };
// }