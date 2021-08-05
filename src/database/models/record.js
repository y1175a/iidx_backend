module.exports = (sequelize, DataTypes) => 
  sequelize.define('Record', {
        r_score: {
            type: DataTypes.INTEGER,
        },
        r_pgreat: {
            type: DataTypes.INTEGER,
        },
        r_great: {
            type: DataTypes.INTEGER,
        },
        r_rank: {
            type: DataTypes.STRING,
        },
        r_cleartype: {
            type: DataTypes.STRING,
        },
        r_skillpoint: {
            type: DataTypes.FLOAT,
        },
    }, {
        sequelize,
        tableName: 'record',
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
  );