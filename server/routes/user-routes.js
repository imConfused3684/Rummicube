import express from "express";
import {addUser, getUserWins, getUserCount, winsUpdate} from '../controllers/userController.js'

const router = express.Router();

router.post('/user/register', addUser);
router.post('/user/loginAndWins', getUserWins);
router.post('/user/count', getUserCount);
router.post('/user/winsUpdate', winsUpdate);

const userRoutes = {
    routes: router
}

export default userRoutes;