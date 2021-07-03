'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nickname: Sequelize.STRING,
      roletype:  {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      iidx_id: {
        type: Sequelize.STRING,
      },
      dj_name: {
        type: Sequelize.STRING,
      },
      dj_class: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('profiles', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_users_profiles',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.createTable('songs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      artist: {
        type: Sequelize.STRING,
      },
      bpm: {
        type: Sequelize.STRING,
      },
      version: {
        type: Sequelize.STRING,
      },
    });
    await queryInterface.createTable('charts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      song_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chart_difficulty: {
        type: Sequelize.STRING,
      },
      chart_level: {
        type: Sequelize.INTEGER,
      },
      chart_skillpoint: {
        type: Sequelize.FLOAT,
      },
      notes: {
        type: Sequelize.INTEGER,
      },
    });
    await queryInterface.addConstraint('charts', {
      fields: ['song_id'],
      type: 'foreign key',
      name: 'fk_songs_charts',
      references: {
        table: 'songs',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.createTable('playdata', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      playcount: {
        type: Sequelize.INTEGER,
      },
      score: {
          type: Sequelize.INTEGER,
      },
      rank: {
          type: Sequelize.STRING,
      },
      misscount: {
          type: Sequelize.INTEGER,
      },
      cleartype: {
          type: Sequelize.INTEGER,
      },
      skillpoint: {
          type: Sequelize.FLOAT,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('playdata', {
      fields: ['profile_id'],
      type: 'foreign key',
      name: 'fk_profiles_playdata',
      references: {
        table: 'profiles',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('playdata', {
      fields: ['chart_id'],
      type: 'foreign key',
      name: 'fk_charts_playdata',
      references: {
        table: 'charts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.createTable('skills', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hot_skillpoint: {
        type: Sequelize.FLOAT,
      },
      other_skillpoint: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('skills', {
      fields: ['profile_id'],
      type: 'foreign key',
      name: 'fk_profiles_skills',
      references: {
        table: 'profiles',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
