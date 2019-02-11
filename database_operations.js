/*

This file will contain all database operations, this way queries can be centralized and you won't end up with queries scattered through your code.

PLEASE KEEP IT THIS WAY!!!!

 */

var exports = module.exports = {};
//USE DATABASE.JS TO CONNECTO TO DATABASE
var database = require('./database');

//QUERY BUILDER
var sql = require('sql-query'), sqlQuery = sql.Query();
//USED FOR SELECT COMMANDS:
var sqlSelect = sqlQuery.select();
//USED FOR INSERT COMMANDS:
var sqlInsert = sqlQuery.insert();
//USED FOR UPDATE COMMANDS:
var sqlUpdate = sqlQuery.update()


/*

MEMBERS TABLE OPERATIONS

 */
exports.michael_test = function(text_form) {
    var sql = "INSERT INTO `test`( `text`) VALUES (?)";  // ? is plek van de variable
    database.connection.query(sql, text_form);   // var sql invoegen en combineren
    console.log('function aangeroepen'); //test om te kijken of de functie werkt
};

exports.createUser = function(username, password, voornaam, achternaam, email, profilepicture, iban){
    let command = sqlInsert.into('members').set({USERNAME: username, PASSWORD: password, NAAM: voornaam, ACHTERNAAM: achternaam, EMAIL: email, PLAATJE: profilepicture, IBAN:iban, SALDO: 0}).build();
    let output = database.connection.query(command);
    console.log("createUser - " + output);
};

exports.getUserIDFromEmail = function(email){
    let command = sqlSelect.from('members').select('USERID').where({EMAIL: email}).build();
    console.log("command: "+command);
    database.connection.query(command).on('result', function(result){
        console.log(result)
        return result;
    }).on('error', function(err){
        console.log(err);
    });
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