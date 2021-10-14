const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { User, Role } = require('../models/models');
const UserDto = require('../dto/userDto');
const ApiError = require('../error/ApiError');

class UserService {
  async getAll() {
    const users = await User.findAll({
      include: Role,
    });

    const usersDto = users.map((i) => {
      const { name, roles } = new UserDto(i);
      return { name, roles };
    });

    return usersDto;
  }

  async getSelf(id) {
    const user = await User.findOne({ where: { id }, include: Role });

    return new UserDto(user);
  }

  async changeInfoUser(id, change) {
    if (change.roles) {
      const rolesToChange = change.roles.map((i) => ({ role: i }));

      const candidateRoles = await Role.findAll({
        where: {
          [Op.or]: rolesToChange,
        },
      });

      if (candidateRoles.length !== rolesToChange.length) throw ApiError.badRequest('Ivalidn role');

      const user = await User.findOne({ where: { id }, include: Role });
      await user.setRoles(candidateRoles);
    }
    if (change.name) {
      const sameUserName = await User.findOne({ where: { name: change.name } });

      if (sameUserName) throw ApiError.badRequest('Username already occupied');

      await User.update(change, { where: { id } });
    }

    if (!change.roles && !change.name) throw ApiError.badRequest('No data to change');

    const user = await User.findOne({ where: { id }, include: Role });
    const userDto = new UserDto(user);
    const jwtToken = UserService.generateToken(userDto);

    return jwtToken;
  }

  async create(name) {
    if (!name) throw ApiError.badRequest('Invalid input');

    const candidate = await User.findOne({ where: { name } });
    if (candidate) throw ApiError.badRequest(`User with name ${name} already exists`);

    const user = await User.create({ name });

    let roleUSER = await Role.findOne({ where: { role: 'USER' } });
    if (!roleUSER) {
      roleUSER = await Role.create({ role: 'USER' });
    }

    await user.addRole(roleUSER, { through: { selfGranted: false } });

    const userDto = new UserDto(user);
    userDto.roles = ['USER'];

    const jwtToken = UserService.generateToken(userDto);

    return jwtToken;
  }

  static generateToken(user) {
    const payload = { id: user.id, name: user.name, roles: user.roles };

    return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
  }

  async validateUser(name) {
    const user = await User.findOne({ where: { name }, include: Role });
    if (!user) throw ApiError.badRequest(`User with name ${name} does not exist`);

    const userDto = new UserDto(user);
    const token = UserService.generateToken(userDto);

    return token;
  }

  async deleteUser(id) {
    await User.destroy({
      where: { id },
    });

    return { message: 'Successfully deleted' };
  }
}

module.exports = new UserService();
