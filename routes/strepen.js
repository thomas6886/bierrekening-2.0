var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

// Home page route.
router.get('/', function (req, res, next) {
    res.render('strepen');
});

/*
#########################
#                       #
#   CREATE STREEPJES    #
#                       #
#########################
 */

/*PUT nieuwe streep. USAGE: url/strepen/createStreepje?userid=ID&aantal=AANTAL&lading=LADING */
router.put('/createStreepje', function (req, res) {
    if(true){ //TODO: Add authentication (limit ability to streep)
        database_operations.createStreepje(req.query.userid, req.query.aantal, req.query.lading,
            function(err){
                if (err) throw err;
                res.status(200);
            });
    }else{
        res.status(401);
    }
});

/*
#########################
#                       #
#    GET STREEPJES      #
#                       #
#########################
 */

//GET alle strepen per userid. USAGE: url/strepen/getStrepenByUserID?userid=ID
router.get('/getStrepenByUserID', function(req, res) {
    database_operations.streepjes().getFromUserID(req.query.userid, function(response){
        res.json(response);
    });
});

//GET alle strepen per userid. USAGE: url/strepen/getStrepenByLading?lading=LADING
router.get('/getStrepenByLading', function(req, res) {
    database_operations.streepjes().getFromLading(req.query.lading, function(response){
        res.json(response);
    });
});

//GET alle laatste x (nummer) strepen. USAGE: url/strepen/getAllLastX?x=INPUT
router.get('/getAllLastX', function(req, res) {
    database_operations.streepjes().getAllLastX(req.query.x, function(response){
        res.json(response);
    });
});

//GET laatste x (nummer) strepen per user. USAGE: url/strepen/getLastXPerUser?x=INPUT&userid=INPUT
router.get('/getLastXPerUser', function(req, res) {
    database_operations.streepjes().getLastXByUserID(req.query.x, req.query.userid, function(response){
        res.json(response);
    });
});





module.exports = router;