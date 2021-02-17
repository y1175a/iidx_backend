const { Model, DataTypes } = require('sequelize');

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
            uid: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            roletype: {
                type: DataTypes.INTEGER(2),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            iidx_name: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            iidx_id: {
                type: DataTypes.STRING(8),
                allowNull: true,
            },
            iidx_dan: {
                type: DataTypes.INTEGER(3),
                allowNull: true
            },
            // update_timestamp: {
            //     type: DataTypes.DATE,
            //     allowNull: true,
            // },
        }, {
            sequelize,
            modelName: 'user',
            tableName: 'user',
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasMany(db.Playdata, { foreignKey: 'user_id', sourceKey: 'id' });
        db.User.hasMany(db.Skillpoint, { foreignKey: 'user_id', sourceKey: 'id' });
    };
}