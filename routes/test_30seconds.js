var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');

let score = [0, 0, 0];
var team_names = ["Shannon","Michael","Luiaard"];
let team_playing = 0;
let rounds_played = 0;

var all_words = 'Hop Humulus lupulus is een plant uit de hennepfamilie Cannabaceae, die in Nederland en België in het wild voorkomt, en hier vroeger ook veel geteeld werd. De hopbellen (vruchtkegels) worden als conserveer- en smaakmiddel gebruikt bij de bereiding van bier. Hop is een vaste plant die overwintert als wortelstok. De soort komt van nature voor in het grootste deel van de gematigde- en koude zone van het noordelijk halfrond, ten noorden van de 32e breedtegraad.[1][2][3] Door de teelt ten behoeve van de bierproductie heeft de hop zijn areaal uitgebreid naar Zuid-Amerika, Zuid-Afrika, Australië en Tasmanië.',
    wordArray = all_words.split(' ');
// woorden lijst inplaats van communicatie met database
words = wordArray.slice(0,5);

select_words = function(rounds_played){
    word_selection = wordArray.slice(rounds_played*5,rounds_played*5+5);
    return word_selection;
}


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
    rounds_played ++;
    console.log(answer);
    console.log(score_extra);
    console.log(team_playing);
    console.log(score.length);
    console.log(score);
    console.log(rounds_played);
    words = select_words(rounds_played);
    console.log(words);
    res.render('test_30seconds',{score: score,team_playing: team_playing,team_names: team_names,words:words});
});
module.exports = router;
