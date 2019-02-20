var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
#########################
#                       #
#        USERID         #
#                       #
#########################
 */

/*GET userid from given email. USAGE: url/users/userid/getfromemail?email=INPUT */
router.get('/userid/getfromemail', function(req, res) {
  database_operations.userID().getFromEmail(req.query.email, function(response){
    res.json(response);
  });
});

/*GET userid from given username. USAGE: url/users/userid/getfromusername?username=INPUT */
router.get('/userid/getfromusername', function(req, res) {
  database_operations.userID().getFromUsername(req.query.username, function(response){
    res.json(response);
  });
});

/*
#########################
#                       #
#   PROFILE PICTURES    #
#                       #
#########################
 */

/*GET profile picture from given userid. USAGE: url/users/picture/getfromuserid?userid=INPUT */
router.get('/picture/getfromuserid', function(req, res) {
  database_operations.profilePicture().getByUserID(req.query.userid, function(response){
    res.json(response);
  });
});

/*
#########################
#                       #
#         SALDO         #
#                       #
#########################
 */

/*GET saldo from given userid. USAGE: url/users/saldo/getfromuserid?userid=INPUT */
router.get('/saldo/getfromuserid', function(req, res) {
  database_operations.saldo().getFromUserID(req.query.userid, function(response){
    res.json(response);
  });
});

/*
#########################
#                       #
#          NAAM         #
#                       #
#########################
 */

/*GET voornaam from given userid. USAGE: url/users/voornaam/getfromuserid?userid=INPUT */
router.get('/voornaam/getfromuserid', function(req, res) {
  database_operations.voornaam().getFromUserID(req.query.userid, function(response){
    res.json(response);
  });
});

/*GET achternaam from given userid. USAGE: url/users/achternaam/getfromuserid?userid=INPUT */
router.get('/achternaam/getfromuserid', function(req, res) {
  database_operations.achternaam().getFromUserID(req.query.userid, function(response){
    res.json(response);
  });
});

/*GET full name from given userid. USAGE: url/users/fullname/getfromuserid?userid=INPUT */
router.get('/fullname/getfromuserid', function(req, res) {
  database_operations.fullname().getFromUserID(req.query.userid, function(response){
    res.json(response);
  });
});

module.exports = router;
