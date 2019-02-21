/*

This file will contain all database operations, this way queries can be centralized and you won't end up with queries scattered through your code.

PLEASE KEEP IT THIS WAY!!!!

 */

var exports = module.exports = {};
//USE DATABASE.JS TO CONNECTO TO DATABASE
var database = require('./database');
var moment = require('moment');

//QUERY BUILDER
var sql = require('sql-query'), sqlQuery = sql.Query();
//USED FOR SELECT COMMANDS:
var sqlSelect;
//USED FOR INSERT COMMANDS:
var sqlInsert;
//USED FOR UPDATE COMMANDS:
var sqlUpdate = sqlQuery.update();


/*

MEMBERS TABLE OPERATIONS

 */

//Creates new user with default saldo 0 VARS: username, password, voornaam, achternaam, email, profilepicture, iban
exports.createUser = function(username, password, voornaam, achternaam, email, profilepicture, iban){
    sqlInsert = sqlQuery.insert();
    let command = sqlInsert.into('members').set({USERNAME: username, PASSWORD: password, NAAM: voornaam, ACHTERNAAM: achternaam, EMAIL: email, PLAATJE: profilepicture, IBAN:iban, SALDO: 0}).build();
    database.connection.query(command).on('error', function(err){
        console.error(err);
    });
};//NOT YET IMPLEMENTED IN ROUTE

exports.userID = function(){
    return {
        //Get UserID from email VARS: email CALLBACK
        getFromEmail: function(email, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('USERID').where({EMAIL: email}).build();
            database.connection.query(command).on('result', function(result){
                return callback(result.USERID);
            }).on('error', function(err){
                console.error(err);
            });
        },
        //Get UserID from username VARS: username CALLBACK
        getFromUsername: function(username, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('USERID').where({USERNAME: username}).build();
            database.connection.query(command).on('result', function(result){
                return callback(result.USERID);
            }).on('error', function(err){
                console.error(err);
            });
        }
    }
};

function deleteUser(userID){
    //TODO: ADD QUERY
}

exports.profilePicture = function(){
    return {
        //Get profile picture (filename.png) from UserID VARS: UserID CALLBACK
        getFromUserID: function(userid, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('PLAATJE').where({USERID: userid}).build();
            database.connection.query(command).on('result', function(result){
                return callback(result.PLAATJE);
            }).on('error', function(err){
                console.error(err);
            });
        }
    }
};

//EVERYTHING SALDO
exports.saldo = function(){
    return {
        //Get saldo from UserID VARS: UserID CALLBACK
        getFromUserID: function(userID, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('SALDO').where({USERID: userID}).build();
            database.connection.query(command).on('result', function(result){
                return callback(result.SALDO);
            }).on('error', function(err){
                console.error(err);
            });
        }
    }
};

exports.voornaam = function(){
    return {
        //Get voornaam from UserID VARS: UserID CALLBACK
        getFromUserID: function(userID, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('NAAM').where({USERID: userID}).build();
            database.connection.query(command).on('result', function(result){
                return callback(result.NAAM);
            }).on('error', function(err){
                console.error(err);
            });
        }
    }
};

exports.achternaam = function(){
    return {
        //Get achternaam from UserID VARS: UserID CALLBACK
        getFromUserID: function(userID, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('ACHTERNAAM').where({USERID: userID}).build();
            database.connection.query(command).on('result', function(result){
                return callback(result.ACHTERNAAM);
            }).on('error', function(err){
                console.error(err);
            });
        }
    }
};

exports.fullname = function(){
    return {
        //Get voornaam from UserID VARS: UserID CALLBACK
        getFromUserID: function(userID, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('*').where({USERID: userID}).build();
            database.connection.query(command).on('result', function(result){
                return callback(result.NAAM + " " + result.ACHTERNAAM);
            }).on('error', function(err){
                console.error(err);
            });
        }
    }
};

/*

STREEPJES TABLE OPERATIONS

 */

//Creates a streepje. VARS: userid, aantal, lading
exports.createStreepje = function(userid, aantal, lading){
    var currTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    sqlInsert = sqlQuery.insert();
    let command = sqlInsert.into('steepjes').set({TIMESTAMP: currTime, USERID: userid, AANTAL: aantal, LADING: lading}).build();
    database.connection.query(command).on('error', function(err){
        console.error(err);
    });
};

exports.streepjes = function(){
    return {
        //Get all streepjes by userid VARS: userid, CALLBACK
        getFromUserID: function(userid, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('steepjes').select('*').where({USERID: userid}).build();
            let output = [];
            database.connection.query(command).on('result', function(result){
                output.push(result);
            }).on('end', function(){
                return callback(output);
            }).on('error', function(err){
                console.error(err);
            });
        },
        //Get all streepjes by lading VARS: lading CALLBACK
        getFromLading: function(lading, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('steepjes').select('*').where({LADING: lading}).build();
            let output = [];
            database.connection.query(command).on('result', function(result){
                output.push(result);
            }).on('end', function(){
                return callback(output);
            }).on('error', function(err){
                console.error(err);
            });
        },
        //Get last x (number) of all streepjes VARS: lastx CALLBACK
        getAllLastX: function(lastx, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('steepjes').select('*').limit(lastx).build();
            let output = [];
            database.connection.query(command).on('result', function(result){
                output.push(result);
            }).on('end', function(){
                return callback(output);
            }).on('error', function(err){
                console.error(err);
            });
        },
        //Get last x (number) of streepjes per user VARS: lastx, userid, CALLBACK
        getLastXByUserID: function(lastx, userid, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('steepjes').select('*').where({USERID: userid}).limit(lastx).build();
            let output = [];
            database.connection.query(command).on('result', function(result){
                output.push(result);
            }).on('end', function(){
                return callback(output);
            }).on('error', function(err){
                console.error(err);
            });
        }
    }
};