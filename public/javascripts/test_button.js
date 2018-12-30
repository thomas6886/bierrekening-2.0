// DOM Ready =============================================================
$(document).ready(function() {

});
var CorrectWords = [];
let score= 0;

var timeleft = 10;
var downloadTimer = setInterval(function(){
    document.getElementById("progressBar").value = 10 - --timeleft;
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById('info').innerHTML = "Je tijd is om"};
},1000);


function ButtonPressed(element) {
    console.log("button pressed");
    console.log(element.innerHTML)
    if (element.checked == 'false') {
        element.style.backgroundColor = "green";
        element.checked = 'true';
        score ++
        document.getElementById('score').innerHTML = score;
    }
    else if(element.checked == 'true') {
        element.style.backgroundColor = "grey";
        element.checked = 'false';
        score --
        document.getElementById('score').innerHTML = score;
    }
    else{
        element.style.backgroundColor = "green";
        element.checked = 'true';
        score ++
        document.getElementById('score').innerHTML = score;
    }

    ;
}

//eerste kijkt of checked false is en zet het op true
//tweede kijkt andersom
//derde is nodig omdat in het begin checked null is


