const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// prettier-ignore
router
.route('/')
.get(getAllUsers)
.post(createUser);

// prettier-ignore
router
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;
