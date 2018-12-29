// DOM Ready =============================================================
$(document).ready(function() {

});

function ButtonPressed(element) {
    console.log("button pressed");
    console.log(element.innerHTML)
    if (element.checked == 'false') {
        element.style.backgroundColor = "black";
        element.checked = 'true';
    }
    else {
        element.style.backgroundColor = "red";
        element.checked = 'false';
    }
    ;
}



