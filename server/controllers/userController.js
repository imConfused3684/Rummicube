import {firebase} from '../db.js';
import User from '../models/user.js';
const firestore = firebase.firestore();

export const addUser = async (req, res, next) => {
    try {
        const data = req.body;

        // Включаем wins в объект данных
        const userData = new User(data.login, data.password);

        console.log('Received data:', userData);

        const userObject = {
            login: userData.login,
            password: userData.password,
            wins: userData.wins
        };
        
        await firestore.collection('users').doc().set(userObject);

        res.status(201).send('Record saved successfully');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const getUserWins = async (req, res, next) => {
    try {
        const data = req.body;
        let wins = null;

        const query = await firestore.collection('users')
            .where('login', '==', data.login)
            .where('password', '==', data.password)
            .get();

        if(query.size > 0){
            const user = query.docs[0].data();
            wins = user.wins;
        }
        else
        {
            wins = null;
        }

        res.status(200).json({  wins });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const getUserCount = async (req, res, next) => {
    try {
        const data = req.body;

        const query = await firestore.collection('users')
            .where('login', '==', data.login)
            .get();

        const count  = query.size;

        res.status(200).json({  count });
    } catch (error) {
        console.error('Error getting user count:', error);
        res.status(500).send('Internal Server Error');
    }
}
