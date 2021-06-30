'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = class Profiles extends Model {
    static init(sequelize) {
      return super.init(
        {
          iidx_id: {
            type: DataTypes.STRING,
          },
          dj_name: {
            type: DataTypes.STRING,
          },
          dj_class: {
            type: DataTypes.STRING,
          },
        },
        {
          sequelize,
          modelName: "Profiles",
          tableName: "profiles",
          timestamps: true,
          underscored: true,
          charset: "utf8",
          collate: "utf8_general_ci",
        }
      );
    }
    static associate(models) {
      models.Profiles.belongsTo(models.Users, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models.Profiles.hasMany(models.Playdata, {
        foreignKey: "profile_id",
        sourceKey: "id",
      });
      models.Profiles.hasMany(models.Skills, {
        foreignKey: "profile_id",
        sourceKey: "id",
      });
    }
};