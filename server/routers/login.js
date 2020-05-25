const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user) {
    res.json({ error: 'wrong login' })
  } else {
    if (user.password !== password) {
      res.json({ error: 'wrong password' });
    } else {
      res.json({ 
        status: 'success',
        userName: user.login,
      });
    }
  }
})

module.exports = router;
