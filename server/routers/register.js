const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { login, password, email } = req.body;
  const user = await User.findOne({ login });
  if (user) {
    res.json({ 'exists': 'true' });
  } else {
    const newUser = new User({
      login,
      password,
      email,
    });
    await newUser.save();
    res.json({
      newUser: 'true',
      userName: newUser.login,
    })
  }
})

module.exports = router;
