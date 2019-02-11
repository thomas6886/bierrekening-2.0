var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

/* GET home page. */
router.get('/', function(req, res, next) {
  database_operations.getUserIDFromEmail("thomas.booijink@gmail.com");
  res.render('index', { title: 'Bierrekening 2.0' });

});

module.exports = router;
