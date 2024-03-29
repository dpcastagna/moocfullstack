const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('active_sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('active_sessions')
  },
}