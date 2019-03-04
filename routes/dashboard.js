var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');


/* 192.168.1.1/dashboard/
 GET home page. */
router.get('/', function(req, res, next) {
    res.render('dashboard/index');
});

router.get('/account', function(req, res, next) {
    res.render('dashboard/account');
});


router.get('/ladingen', function(req, res, next) {
    database_operations.ladingen().getAllActive(function (response) {
        res.render('dashboard/ladingen', {rows:response});
    });
});

router.get('/ladingen/:ladingid', function(req,res, next) {
    console.log("ladinge_info aangeroepen");
    database_operations.strepen().getFromLading(req.params.ladingid, function(response){
        res.render('dashboard/lading_info', {rows:response, lading_nummer:req.params.ladingid});
    });
});



/*
router.get('/ladingen', function(req, res, next) {
    var table_data = database_operations.ladingen().getAllActive();
    console.log(table_data);
        res.render('dashboard/ladingen', {rows:table_data});
});
*/


module.exports = router;