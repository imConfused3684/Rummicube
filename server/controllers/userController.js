'use strict';

const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
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

module.exports = {
    addUser
};
