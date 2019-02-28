/*

This file will contain all database operations, this way queries can be centralized and you won't end up with queries scattered through your code.

PLEASE KEEP IT THIS WAY!!!!

 */
//lankheets gedeelte
exports.michael_test2 = function(text_form) {
    var sql = "INSERT INTO `test`( `text`) VALUES (?)";  // ? is plek van de variable
    database.connection.query(sql, text_form);   // var sql invoegen en combineren
    console.log('function aangeroepen'); //test om te kijken of de functie werkt
    const output_database = [text_form, text_form];
    return output_database
};





//einde lankheets gedeelte

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
#########################
#                       #
#        MEMBERS        #
#                       #
#########################
 */

//Creates new user with default saldo 0 VARS: username, password, voornaam, achternaam, email, profilepicture, iban
exports.createUser = function(username, password, voornaam, achternaam, email, profilepicture, iban){
    sqlInsert = sqlQuery.insert();
    let command = sqlInsert.into('members').set({USERNAME: username, PASSWORD: password, NAAM: voornaam, ACHTERNAAM: achternaam, EMAIL: email, PLAATJE: profilepicture, IBAN:iban, SALDO: 0}).build();
    database.connection.query(command).on('error', function(err){
        console.error(err);
    });
};

exports.users = function(){
    return {
        //Get all users public information VARS: CALLBACK
        getAll: function(callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('*').build();
            console.log(command);
            let output = [];
            database.connection.query(command).on('result', function(result){
                output.push(result);
            }).on('end', function(){
                return callback(output);
            }).on('error', function(err){
                console.error(err);
            });
        },
        getFromUserID: function(userID, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('*').where({USERID: userID}).build();
            console.log(command);
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

/*
#########################
#                       #
#         SALDO         #
#                       #
#########################
 */

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
#########################
#                       #
#       STREEPJES       #
#                       #
#########################
 */

//Creates a streepje. VARS: userid, aantal, lading
exports.createStreepje = function(userid, aantal, ladingid, callback){
    var currTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    sqlInsert = sqlQuery.insert();
    let command = sqlInsert.into('steepjes').set({TIMESTAMP: currTime, USERID: userid, AANTAL: aantal, LADINGID: ladingid}).build();
    let output = [];
    database.connection.query(command).on('result', function(result){
        output.push(result);
    }).on('end', function(){
        return callback(output);
    }).on('error', function(err){
        console.error(err);
    });
};

exports.strepen = function(){
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
        getFromLading: function(ladingid, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('steepjes').select('*').where({LADINGID: ladingid}).build();
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
        },
        getAll: function(callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('steepjes').select('*').build();
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

/*
#########################
#                       #
#       LADINGEN        #
#                       #
#########################
 */

//Creates a lading. VARS: datum_opened, datum_closed, streepbaar, merk, aantalkrat, itemsperkrat, prijskrat, extracent, chauffeurskosten, plaatje
exports.createLading = function(datum_opened, datum_closed, streepbaar, merk, aantalkrat, itemsperkrat, prijskrat, extracent, chauffeurskosten, plaatje, callback){
    sqlInsert = sqlQuery.insert();
    let command = sqlInsert.into('ladingen').set({DATUM_OPENED: datum_opened, DATUM_CLOSED: datum_closed, STREEPBAAR: streepbaar, MERK: merk, AANTALKRAT: aantalkrat, ITEMSPERKRAT: itemsperkrat, PRIJSKRAT: prijskrat, EXTRACENT: extracent, CHAUFFEURSKOSTEN: chauffeurskosten, PLAATJE: plaatje}).build();
    let output = [];
    database.connection.query(command).on('result', function(result){
        output.push(result);
    }).on('end', function(){
        return callback(output);
    }).on('error', function(err){
        console.error(err);
    });
};

exports.ladingen = function(){
    return {
        //Get all ladingen VARS: CALLBACK
        getAll: function(callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('ladingen').select('*').build();
            let output = [];
            database.connection.query(command).on('result', function(result){
                output.push(result);
            }).on('end', function(){
                return callback(output);
            }).on('error', function(err){
                console.error(err);
            });
        },
        //Get all active ladingen VARS: CALLBACK
        getAllActive: function(callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('ladingen').select('*').where({STREEPBAAR: 1}).build();
            let output = [];
            database.connection.query(command).on('result', function(result){
                output.push(result);
            }).on('end', function(){
                return callback(output);
            }).on('error', function(err){
                console.error(err);
            });
        },
        getFromID: function(ladingID, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('ladingen').select('*').where({LADINGID: ladingID}).build();
            console.log(command);
            let output = [];
            database.connection.query(command).on('result', function(result){
                output.push(result);
            }).on('end', function(){
                return callback(output);
            }).on('error', function(err){
                console.error(err);
            });
        },
        //Get all by merk VARS: merk, CALLBACK
        getAllByMerk: function(merk, callback){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('ladingen').select('*').where({MERK: merk}).build();
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
