const { Model, DataTypes } = require("sequelize");

module.exports = class Charts extends Model {
  static init(sequelize) {
    return super.init(
      {
        chart_difficulty: {
          type: DataTypes.STRING,
        },
        chart_level: {
          type: DataTypes.INTEGER,
        },
        chart_skillpoint: {
          type: DataTypes.FLOAT,
        },
        notes: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: "Charts",
        tableName: "charts",
        timestamps: false,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(models) {
    models.Charts.belongsTo(models.Songs, {
      foreignKey: "song_id",
      sourceKey: "id",
    });
  }
};
