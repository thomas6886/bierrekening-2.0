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
var sqlSelect;
//USED FOR INSERT COMMANDS:
var sqlInsert;
//USED FOR UPDATE COMMANDS:
var sqlUpdate = sqlQuery.update()


/*

MEMBERS TABLE OPERATIONS

 */

exports.createUser = function(username, password, voornaam, achternaam, email, profilepicture, iban){
    sqlInsert = sqlQuery.insert();
    let command = sqlInsert.into('members').set({USERNAME: username, PASSWORD: password, NAAM: voornaam, ACHTERNAAM: achternaam, EMAIL: email, PLAATJE: profilepicture, IBAN:iban, SALDO: 0}).build();
    database.connection.query(command);
};

exports.getUserIDFromEmail = function(email){
    sqlSelect = sqlQuery.select();
    let command = sqlSelect.from('members').select('USERID').where({EMAIL: email}).build();
    console.log("command: "+command);
    database.connection.query(command).on('result', function(result){;
        return result.USERID;
    }).on('error', function(err){
        console.log(err);
    });
}

exports.userID = function(){
    return {
        getFromEmail: function(email){
            sqlSelect = sqlQuery.select();
            let command = sqlSelect.from('members').select('USERID').where({EMAIL: email}).build();
            console.log("command: "+command);
            database.connection.query(command).on('result', function(result){
                console.log(result.USERID);
                return result.USERID;
            }).on('error', function(err){
                console.log(err);
            });
        }
    }
}

function getUserIDFromUsername(username){
    sqlSelect = sqlQuery.select();
    let command = sqlSelect.from('members').select('USERID').where({USERNAME: username}).build();
    console.log("command: "+command);
    database.connection.query(command).on('result', function(result){;
        return result.USERID;
    }).on('error', function(err){
        console.log(err);
    });
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