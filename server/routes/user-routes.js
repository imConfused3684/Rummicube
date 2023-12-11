const express = require('express');
const {addUser, getUserCount} = require('../controllers/userController')

const router = express.Router();

router.post('/user', addUser);
router.get('/user/count', getUserCount);

module.exports = {
    routes: router
}