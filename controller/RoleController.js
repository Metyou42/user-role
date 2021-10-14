const RoleService = require('../service/RoleService');

class RoleController {
  async getAll(req, res, next) {
    try {
      const roles = await RoleService.getAll();

      res.json(roles);
    } catch (e) {
      next(e);
    }
  }

  async creat(req, res, next) {
    try {
      const { role } = req.body;
      const message = await RoleService.create(role);

      res.json(message);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RoleController();
