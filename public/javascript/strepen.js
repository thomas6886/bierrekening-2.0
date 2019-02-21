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
            userContent += '<div class="topRowInfo"><p>12</p><p>18</p></div>';
            userContent += '<img class="profilePicture" src="pictures/profile_pictures/' + this.PLAATJE + '">';
            userContent += '<div class="bottomRowInfo"><p>12</p><p>18</p></div>';
            userContent += '</div></div>'
        });
        $('#usersList').html(userContent);
    });
}