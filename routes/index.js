var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');


router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login');
});


module.exports = router;
