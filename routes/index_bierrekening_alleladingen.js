var express = require('express');
var router = express.Router();
var database_operation = require('./../database_operations');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index_bierrekening_alleladingen', { title: 'Bierrekening 2.0' });
});


router.post('/add',function (req,res){
    consol.log('submitted');
    let response = database_operations.michael_test2(req.body.name);
    console.log(response);
    res.render('test_michael',{
        var_name:response
    });
});







module.exports = router;