// DOM Ready =============================================================
$(document).ready(function() {


});

// Functions =============================================================
function GetTime(){
    console.log('GetTime function started');
    //document.getElementById('demo').innerHTML=Date();
    //document.getElementById('demo').style.backgroundColor = "red";

    var element = document.getElementById('demo');
    element.innerHTML=Date();
    element.style.backgroundColor = "red";
    element.style.fontSize= '25px';
}
