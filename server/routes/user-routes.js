const express = require('express');
const {addUser, getUserWins, getUserCount} = require('../controllers/userController')

const router = express.Router();

router.post('/user/register', addUser);
router.post('/user/loginAndWins', getUserWins);
router.post('/user/count', getUserCount);

module.exports = {
    routes: router
}