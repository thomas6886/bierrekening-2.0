// DOM Ready =============================================================
$(document).ready(function() {
    populateLadingen();
    populateUsers();
});

function populateUsers(){
    var userContent = '';
    $.getJSON( '/api/users', function( data ) {
        $.each(data, function(){
            userContent += '<div class="col-2 itemwrapper">';
            userContent += '<div class="itemblock">';
            userContent += '<div class="topRowInfo"><p>12</p><p>18</p></div>';
            userContent += '<img class="profilePicture" src="pictures/profile_pictures/' + this.PLAATJE + '">';
            userContent += '<div class="bottomRowInfo"><p>'+this.NAAM+'</p></div>';
            userContent += '</div></div>'
        });
        $('#usersList').html(userContent);
    });
}

function populateLadingen(){
    var ladingenContent = '';
    $.getJSON( '/api/ladingen/active', function( data ) {
        $.each(data, function(){
            ladingenContent += '<div class="col-2 itemwrapper">';
            ladingenContent += '<div class="itemblock button">';
            ladingenContent += '<img class="profilePicture" src="pictures/merken/' + this.PLAATJE + '">';
            ladingenContent += '</div></div>'
        });
        $('#ladingList').html(ladingenContent);
    });
}