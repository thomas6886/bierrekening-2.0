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

exports.createUser = function(username, password, voornaam, achternaam, email, profilepicture, iban){
    sqlInsert = sqlQuery.insert();
    let command = sqlInsert.into('members').set({USERNAME: username, PASSWORD: password, NAAM: voornaam, ACHTERNAAM: achternaam, EMAIL: email, PLAATJE: profilepicture, IBAN:iban, SALDO: 0}).build();
    database.connection.query(command).on('error', function(err){
      console.error(err);
    });
};

exports.userID = function(){
    return {
        getFromEmail: function(email, callback_userid){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('USERID').where({EMAIL: email}).build();

            database.connection.query(command).on('result', function(result){
                return callback_userid(result.USERID);
            }).on('error', function(err){
                console.error(err);
            });
        },
          getFromUsername: function(username, callback_userid){
            sqlSelect = sqlQuery.select();
            //QUERY:
            let command = sqlSelect.from('members').select('USERID').where({USERNAME: username}).build();

            database.connection.query(command).on('result', function(result){
              return callback_userid(result.USERID);
            }).on('error', function(err){
              console.error(err);
            });
          }
    }
};

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
    getByUserID: function(userid, callback_streepjes){
      sqlSelect = sqlQuery.select();
      //QUERY:
      let command = sqlSelect.from('steepjes').select('*').where({USERID: userid}).build();
      let output = [];
      database.connection.query(command).on('result', function(result){
        output.push(result);
      }).on('error', function(err){
        console.error(err);
      }).on('end', function(){
        return callback_streepjes(output);
      });
    }
  }
};