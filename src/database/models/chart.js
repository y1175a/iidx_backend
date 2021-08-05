module.exports = (sequelize, DataTypes) => 
  sequelize.define('Chart', {
        c_diff: {
          type: DataTypes.STRING,
        },
        c_level: {
          type: DataTypes.INTEGER,
        },
        c_skill: {
          type: DataTypes.FLOAT,
        },
        c_notes: {
          type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        tableName: 'chart',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
  );