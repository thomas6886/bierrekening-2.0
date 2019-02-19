var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bierrekening 2.0' });

  database_operations.userID().getFromUsername("thomas6886", function(response){
    console.log(response);
  });

});




module.exports = router;
