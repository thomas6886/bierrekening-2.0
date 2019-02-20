var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*GET userid from given username. USAGE: url/users/useridfromusername?username=INPUT */
router.get('/useridfromusername', function(req, res) {
  database_operations.userID().getFromUsername(req.query.username, function(response){
    res.json(response);
  });
});

/*GET userid from given email. USAGE: url/users/useridfromemail?email=INPUT */
router.get('/useridfromemail', function(req, res) {
  database_operations.userID().getFromEmail(req.query.email, function(response){
    res.json(response);
  });
});

/*GET profile picture from given userid. USAGE: url/users/picturefromuserid?userid=INPUT */
router.get('/picturefromuserid', function(req, res) {
  database_operations.profilePicture().getByUserID(req.query.userid, function(response){
    res.json(response);
  });
});

module.exports = router;
