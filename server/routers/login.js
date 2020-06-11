const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user) {
    res.status(200).json({ error: 'wrong login' })
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result && result == true) {
        const payload = {
          id: user._id,
        };
        const secret = process.env.MY_SECRET;
        const options = {
          expiresIn: '1d',
        };
        const token = jwt.sign(payload, secret, options);
        res.status(200).json({ 
          token,
          userName: user.login,
        });
      } else {
        res.status(200).json({ error: 'wrong password' });
      }
    });
  }
})

module.exports = router;
