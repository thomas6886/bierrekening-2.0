var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

let score = [0, 0, 0];
var team_names = ["Shannon","Michael","Luiaard"];
let team_playing = 0;



router.get('/', function (req, res, next) {
    res.render('test_30seconds');
});

router.post('/submit', function (req, res, next) {
    var answer = req.body;
    var score_extra = Object.keys(answer).length;
    score[team_playing] = score[team_playing] +score_extra;

    if (team_playing == 2){
        team_playing = 0;}
        else{
            team_playing ++;
    };
    console.log(team_playing);
    console.log(score.length);
    console.log(score);
    res.render('test_30seconds',{score: score,team_playing: team_playing,team_names: team_names});
});
module.exports = router;
