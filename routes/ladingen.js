var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

// Home page route.
router.get('/', function (req, res, next) {
    res.render('ladingen');
});

/*
#########################
#                       #
#    CREATE LADINGEN    #
#                       #
#########################
 */

/*PUT nieuwe lading. USAGE: url/ladingen/createLading?d_open=INPUT&d_closed=INPUT&streepbaar=INPUT&merk=INPUT&aantalkrat=INPUT&itemsperkrat=INPUT&prijsperkrat=INPUT&extracent=INPUT&chauffeurskosten=INPUT&plaatje=INPUT */
router.put('/createLading', function (req, res) {
    if(true){ //TODO: Add authentication (limit ability to create lading)
        database_operations.createLading(req.query.d_open, req.query.d_closed, req.query.streepbaar, req.query.merk, req.query.aantalkrat, req.query.itemsperkrat, req.query.prijsperkrat, req.query.extracent, req.query.chauffeurskosten, req.query.plaatje,
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
#     GET LADINGEN      #
#                       #
#########################
 */

//GET alle ladingen. USAGE: url/ladingen/getAll
router.get('/getAll', function(req, res) {
    database_operations.ladingen().getAll( function(response){
        res.json(response);
    });
});

//GET alle actieve ladingen. USAGE: url/ladingen/getAllActive
router.get('/getAllActive', function(req, res) {
    database_operations.ladingen().getAllActive( function(response){
        res.json(response);
    });
});

//GET alle ladingen per merk. USAGE: url/ladingen/getAllByMerk?merk=INPUT
router.get('/getAllByMerk', function(req, res) {
    database_operations.ladingen().getAllByMerk(req.query.merk, function(response){
        res.json(response);
    });
});

/*
#########################
#                       #
#    UPDATE LADINGEN    #
#                       #
#########################
 */

module.exports = router;