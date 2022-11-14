const router = require('express').Router();
const thoughtRoutes = require('./thoughtsRoutes');
const userRoutes = require('./usersRoutes');

router.use('/thought', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
