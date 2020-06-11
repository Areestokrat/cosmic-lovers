const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { login, password, email } = req.body;
  const user = await User.findOne({ login });
  if (user) {
    res.status(200).json({ 'exists': 'true' });
  } else {
    const newUser = new User({
      login,
      password,
      email,
    });
    await newUser.save();
    res.status(200).json({
      newUser: 'true',
    });
  }
})

module.exports = router;
