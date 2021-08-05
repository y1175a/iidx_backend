module.exports = (sequelize, DataTypes) => 
  sequelize.define('User', {
      u_uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      u_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      u_nick: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      u_rivalcode: {
        type: DataTypes.STRING,
      },
      u_djname: {
        type: DataTypes.STRING,
      },
      u_djclass: {
        type: DataTypes.STRING,
      }
    }, {
      sequelize,
      tableName: "user",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
