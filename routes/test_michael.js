var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');
// Home page route.
router.get('/', function (req, res, next) {
    res.render('test_michael');
});

// Form route test michael
router.post('/add',function (req,res) {
    console.log('submitted');
//    res.sendStatus(201)
//    res.send(req.body.name);
    database_operations.michael_test(req.body.name);
    res.render('test_michael',{
        var_name: req.body.name
    });
});

module.exports = router;