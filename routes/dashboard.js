var express = require('express');
var router = express.Router();
var database_operation = require('./../database_operations');


/* 192.168.1.1/dashboard/
 GET home page. */
router.get('/', function(req, res, next) {
    res.render('dashboard/index');
});

router.get('/account', function(req, res, next) {
    res.render('dashboard/account');
});

router.get('/ladingen', function(req, res, next) {
    res.render('dashboard/ladingen');
});





module.exports = router;