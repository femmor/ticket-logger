const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler((req, res) => {
  res.send('Register user');
});

const loginUser = asyncHandler((req, res) => {
  res.send('Login user');
});

module.exports = {
  registerUser,
  loginUser,
};
