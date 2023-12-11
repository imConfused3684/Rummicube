const express = require('express');
const {addUser, getUserCount} = require('../controllers/userController')

const router = express.Router();

router.post('/user/register', addUser);
router.post('/user/login', getUserCount);

module.exports = {
    routes: router
}