var express = require('express');
var router = express.Router();
var database_operations = require('./../database_operations');


var test_word = "hop";
var words =[];
var team_name = ["michael","shannon"]
var team_score= [0,0];


var all_words = 'Hop Humulus lupulus is een plant uit de hennepfamilie Cannabaceae, die in Nederland en België in het wild voorkomt, en hier vroeger ook veel geteeld werd. De hopbellen (vruchtkegels) worden als conserveer- en smaakmiddel gebruikt bij de bereiding van bier. Hop is een vaste plant die overwintert als wortelstok. De soort komt van nature voor in het grootste deel van de gematigde- en koude zone van het noordelijk halfrond, ten noorden van de 32e breedtegraad.[1][2][3] Door de teelt ten behoeve van de bierproductie heeft de hop zijn areaal uitgebreid naar Zuid-Amerika, Zuid-Afrika, Australië en Tasmanië.',
    wordArray = all_words.split(' ');
    //console.log(wordArray);

//function SelectWords(){
//    var selection = wordArray.slice(1, 3);
//    return selection;
//}

words = wordArray.slice(0,5);

// Home page route.
router.get('/', function (req, res, next) {
    res.render('test_button',{test_word, words});
});

//Hieronder is nog niet compleet
router.post('/submit',function (req, res) {
    team_score[0]++;
    console.log(team_score);
    res.render('test_button',{test_word, words});
});


module.exports = router;