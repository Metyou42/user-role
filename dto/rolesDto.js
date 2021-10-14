module.exports = class CreateUserDto {
  role;
  users;

  constructor(model) {
    this.role = model.role;
    this.users = model.users.map(i => {
      return { id: i.id, name: i.name };
    });
  }
};
