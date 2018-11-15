var database = require('./database');

/*

This file will contain all database operations, this way queries can be centralized and you won't end up with queries scattered through your code.

PLEASE KEEP IT THIS WAY!!!!

 */

/*

MEMBERS TABLE OPERATIONS

 */

function createUser(username, password, voornaam, achternaam, email, profilepicture, iban, saldo){
    //TODO: ADD QUERY
}

function getUserIDFromEmail(email){
    //TODO: ADD QUERY
}

function getUserIDFromUsername(username){
    //TODO: ADD QUERY
}

function deleteUser(userID){
    //TODO: ADD QUERY
}

function getProfilePicture(userID){
    //TODO: ADD QUERY
}

function getIBAN(userID){
    //TODO: ADD QUERY
}

function getSaldo(userID){
    //TODO: ADD QUERY
}

function getFullName(userID){
    //TODO: ADD QUERY
}

function getVoornaam(userID){
    //TODO: ADD QUERY
}

function getAchternaam(userID){
    //TODO: ADD QUERY
}

function getEmail(userID){
    //TODO: ADD QUERY
}

/*

STREEPJES TABLE OPERATIONS

 */