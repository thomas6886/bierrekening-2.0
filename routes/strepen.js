var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

// Home page route.
router.get('/', function (req, res, next) {
    res.render('strepen');
});

//GET alle strepen per userid. USAGE: url/strepen/getStrepenByUserID?userid=ID
router.get('/getStrepenByUserID', function(req, res) {
  database_operations.streepjes().getByUserID(req.query.userid, function(response){
    res.json(response);
  });
});

/*PUT nieuwe streep. USAGE: url/strepen/createStreepje?userid=ID&aantal=AANTAL&lading=LADING */
router.put('/createStreepje', function (req, res) {
  if(true){ //TODO: Add authentication (limit ability to streep)
    database_operations.createStreepje(req.query.userid, req.query.aantal, req.query.lading,
        function(err){
          if (err) throw err;
          res.status(200);
        });
  }else{
    res.status(400);
  }
});



module.exports = router;