// DOM Ready =============================================================
$(document).ready(function() {
    populateUsers();
});

function populateUsers(){
    var userContent = '';
    $.getJSON( '/users/getall', function( data ) {
        $.each(data, function(){
            userContent += '<div class="col-2 itemwrapper">';
            userContent += '<div class="itemblock">';
            userContent += '<p>' + this.NAAM + '</p>';
            userContent += '</div></div>'
        });
        $('#usersList').html(userContent);
    });
}