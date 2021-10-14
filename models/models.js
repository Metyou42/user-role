const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const UserRole = sequelize.define('user_role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = { User, Role, UserRole };
