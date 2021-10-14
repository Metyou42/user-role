const UserService = require('../service/UserService');

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await UserService.getAll();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getSelf(req, res, next) {
    try {
      const { id } = req.user;
      const user = await UserService.getSelf(id);

      res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  async registration(req, res, next) {
    try {
      const { name } = req.body;
      const token = await UserService.create(name);

      res.json({ token });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { name } = req.body;
      const token = await UserService.validateUser(name);

      res.json({ token });
    } catch (e) {
      next(e);
    }
  }

  async changeInfo(req, res, next) {
    try {
      const { id } = req.user;
      const change = {
        name: req.body?.name,
        roles: req.body?.roles,
      };

      const token = await UserService.changeInfoUser(id, change);

      res.json({ token });
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.user;
      const message = await UserService.deleteUser(id);

      res.json(message);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new UserController();
