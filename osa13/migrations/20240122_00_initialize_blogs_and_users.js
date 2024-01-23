const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      created_at: {
        type: DataTypes.DATE,
        // allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        // allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      year: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        // defaultValue: DataTypes.NOW,
        validate: {
          min: {
            args: [[1991]],
            msg: 'Year must be at least 1991!'
          },
          max: {
            args: [[new Date().getFullYear()]],
            msg: `Year can be at most ${new Date().getFullYear()}!`
          }
        }
      }
    })
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        // allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        // allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    })
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
    // await queryInterface.addColumn('blogs', 'year', {
    //   type: DataTypes.INTEGER,
    //   // allowNull: false,
    //   // defaultValue: DataTypes.NOW,
    //   validate: {
    //     min: {
    //       args: [[1991]],
    //       msg: 'Year must be at least 1991!'
    //     },
    //     max: {
    //       args: [[new Date().getFullYear()]],
    //       msg: `Year can be at most ${new Date().getFullYear()}!`
    //     }
    //   }
    // })
    // await queryInterface.addColumn('blogs', 'created_at', {
    //   type: DataTypes.DATE,
    //   // allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // })
    // await queryInterface.addColumn('blogs', 'updated_at', {
    //   type: DataTypes.DATE,
    //   // allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // })
    // await queryInterface.addColumn('users', 'created_at', {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // })
    // await queryInterface.addColumn('users', 'updated_at', {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}