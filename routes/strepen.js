var express = require('express');
var router = express.Router();

// Get
router.get('/', function (req, res, next) {
    res.render('strepen/index');
});

module.exports = router;