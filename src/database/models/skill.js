module.exports = (sequelize, DataTypes) => 
  sequelize.define('Skill', {
        sp_hot: {
            type: DataTypes.FLOAT,
        },
        sp_other: {
            type: DataTypes.FLOAT,
        },
    }, {
        sequelize,
        tableName: 'skill',
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
  );