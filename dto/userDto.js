module.exports = class CreateUserDto {
  id;
  name;
  roles;

  constructor(model) {
    this.name = model.name;
    this.id = model.id;
    if (model.roles) {
      this.roles = model.roles.map(i => i.role);
    }
  }
};
