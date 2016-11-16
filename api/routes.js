const Router = require('express').Router;
const router = new Router();

const users  = require('./model/users/users-router');
const vendors  = require('./model/vendors/vendors-router');
const executors  = require('./model/executors/executors-router');


router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to bcbc-api API!' });
});

router.use('/users', users);
router.use('/vendors', vendors);
router.use('/executors', executors);


module.exports = router;
