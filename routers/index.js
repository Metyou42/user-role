const { Router } = require('express');

const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/role', roleRouter);

module.exports = router;
