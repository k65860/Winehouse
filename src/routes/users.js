const express = require('express');

const router = express.Router();
const UserService = require('../services/userService');

router.post('/', async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ error: '회원가입 실패' });
  }
});

module.exports = router;
