# User Role

## Opportunities

- Registration, login, change, delete, get self, get all - user
- Get, add role
- Bearer auth

## Tech

App uses a number of open source projects to work properly:

- [Node.js] - For the backend
- [Express] - Fast node.js network app framework
- [MySQL] - Database for app
- [Swagger] - Api tool

## Installation

1. The server use Mysql, so you need to install [MySQL]
2. The server is written in [Node.js] v14+, so you need to install nodejs
3. Create new database in MySQL
4. Clone repository in your directory

```sh
git clone https://github.com/Metyou42/user-role
cd user-role
```

5. Create configuration file as name .env in app directory with this lines

```sh
PORT={Port for start app}
SECRET={JWT secret, can by any words}
DB_NAME={Name of your database in MySQL}
USER_NAME={User name for connect to database}
PASSWORD={Password for connect to database}
```

6. Install the dependencies and devDependencies and start the server

```sh
npm i
npm run start
```

7. Go to /api/docs for view API

## API guide

All request besides Registration and Login must have token

```sh
Authorization: Bearer eyJhbGciOiJIUzI...
```

#### User

| Api Key                     | Description                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| GET /api/user               | Return a list of useres                                                                                 |
| GET /api/user/me            | Return a user self                                                                                      |
| POST /api/user/registration | Create new user, return token, body - {"name":"{username}"}                                             |
| POST /api/user/login        | Login user, return token, body - {"name":"{username}"}                                                  |
| PUT /api/user               | Change info about user, return new token, body - {"name":"{username}", "roles": [{Existing roles name]} |
| DELETE /api/user            | Delete user                                                                                             |

#### Role

| Api Key        | Description                                    |
| -------------- | ---------------------------------------------- |
| GET /api/role  | Return a list of roles with users              |
| POST /api/role | Create new role, body - {"role":"{role name}"} |

## Used technology

- Node.js/Express
- MySQL
- sequelize
- mysql2
- jsonwebtoken
- dotenv
- swagger-jsdoc
- swagger-ui-express

[node.js]: http://nodejs.org
[express]: http://expressjs.com
[mysql]: https://nodejs.org/en/download/
[swagger]: https://swagger.io/
