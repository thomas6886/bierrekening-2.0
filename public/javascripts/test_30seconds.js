// DOM Ready =============================================================
$(document).ready(function() {

});

var timeleft = 10;
var downloadTimer = setInterval(function(){
    document.getElementById("progressBar").value = 10 - --timeleft;
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById('time_bar').innerHTML = "Je tijd is om"};
},1000);