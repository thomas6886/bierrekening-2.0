var database = require('./database');
var exports = module.exports = {};
/*

This file will contain all database operations, this way queries can be centralized and you won't end up with queries scattered through your code.

PLEASE KEEP IT THIS WAY!!!!

 */

/*

MEMBERS TABLE OPERATIONS

 */
exports.michael_test = function(text_form) {
    var sql = "INSERT INTO `test`( `text`) VALUES (?)";  // ? is plek van de variable
    database.connection.query(sql, text_form);   // var sql invoegen en combineren
    console.log('function aangeroepen'); //test om te kijken of de functie werkt
};

exports.michael_test2 = function(text_form) {
    var sql = "INSERT INTO `test`( `text`) VALUES (?)";  // ? is plek van de variable
    database.connection.query(sql, text_form);   // var sql invoegen en combineren
    console.log('function aangeroepen'); //test om te kijken of de functie werkt
    const output_database = [text_form, text_form];
    return output_database
};


function createUser(username, password, voornaam, achternaam, email, profilepicture, iban){
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