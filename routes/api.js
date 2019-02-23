var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

// Welcome to API
router.get('/', function (req, res, next) {
    res.json({ message: 'Welcome to the bierrekening API!' });
});

/*
#########################
#                       #
#         USERS         #
#                       #
#########################
 */

router.post('/users', function (req, res){
    database_operations.createUser(req.query.username, req.query.password, req.query.voornaam, req. query.achternaam, req.query.email, req.query.profilepicture, req.query.iban, function(response){
        res.json(response);
    });
});

router.get('/users', function (req, res){
    database_operations.users().getAll(function (response) {
        res.json(response);
    });
});

router.get('/users/:userid', function (req, res){
    database_operations.users().getFromUserID(req.params.userid, function(response){
        res.json(response);
    });

});

router.get('/users/:userid/strepen', function (req, res){
    database_operations.streepjes().getFromUserID(req.params.userid, function(response){
        res.json(response);
    });
});

router.get('/users/:userid/strepen/last-:limit', function (req, res){
    database_operations.strepen().getLastXByUserID(req.params.limit, req.params.userid, function(response){
        res.json(response);
    });
});

/*
#########################
#                       #
#        STREPEN        #
#                       #
#########################
 */

/*POST nieuwe streep. USAGE: api/strepen?userid=ID&aantal=AANTAL&ladingid=LADINGID */
router.post('/strepen', function (req, res){
    database_operations.createStreepje(req.query.userid, req.query.aantal, req.query.ladingid, function(response){
        res.json(response);
    });
});

/*GET all strepen. USAGE: api/strepen */
router.get('/strepen', function (req, res){
    database_operations.strepen().getAll(function(response){
        res.json(response);
    });
});

/*GET all strepen with limit. USAGE: api/strepen/last-INPUT */
router.get('/strepen/last-:limit', function (req, res){
    database_operations.strepen().getAllLastX(req.params.limit, function(response){
        res.json(response);
    });
});

/*
#########################
#                       #
#       LADINGEN        #
#                       #
#########################
 */
router.post('/ladingen', function (req, res){
    database_operations.createLading(req.query.d_open, req.query.d_closed, req.query.streepbaar, req.query.merk, req.query.aantalkrat, req.query.itemsperkrat, req.query.prijsperkrat, req.query.extracent, req.query.chauffeurskosten, req.query.plaatje, function(response){
        res.json(response);
    });
});

router.get('/ladingen', function (req, res){
    database_operations.ladingen().getAll(function(response){
        res.json(response);
    });
});

router.get('/ladingen/active', function (req, res){
    database_operations.ladingen().getAllActive(function(response){
        res.json(response);
    });
});

router.get('/ladingen/:ladingid', function (req, res){
    database_operations.ladingen().getFromID(req.params.ladingid, function(response){
        res.json(response);
    });
});

router.get('/ladingen/:ladingid/strepen', function (req, res){
    database_operations.strepen().getFromLading(req.params.ladingid, function(response){
        res.json(response);
    });
});

router.get('/ladingen/merk/:merk', function (req, res){
    database_operations.ladingen().getAllByMerk(req.params.merk, function(response){
        res.json(response);
    });
});


module.exports = router;
