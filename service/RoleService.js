const { Role, User } = require('../models/models');
const RoleDto = require('../dto/rolesDto');
const ApiError = require('../error/ApiError');

class RoleService {
  async getAll() {
    const roles = await Role.findAll({
      include: User,
    });

    const rolesWithUsers = roles.map((i) => new RoleDto(i));

    return rolesWithUsers;
  }

  async create(role) {
    if (!role) throw ApiError.badRequest('Invalid input');

    const candidate = await Role.findOne({ where: { role } });
    if (candidate) throw ApiError.badRequest(`Role with name ${role} already exists`);

    await Role.create({ role });

    return { message: 'Successfully created' };
  }
}

module.exports = new RoleService();
