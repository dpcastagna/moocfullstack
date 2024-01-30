const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ActiveSession extends Model {}

ActiveSession.init({
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
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'activeSession'
})

module.exports = ActiveSession