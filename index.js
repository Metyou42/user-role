require('dotenv').config();
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const sequelize = require('./utils/database');
const routers = require('./routers/index');
const models = require('./models/models');
const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.disable('x-powered-by');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer API',
      descriprion: 'Customer API Information',
      contact: {
        name: 'Andrii Matviichuk',
      },
      servers: [`http://localhost:${PORT}`],
    },
  },

  apis: ['./routers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json());
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(authMiddleware);

app.use('/api', routers);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is runing on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
