var currUsers = [];
var currLading = null;

function selectLading(ladingID){
    if(currLading != ladingID){
        currLading = ladingID;
    }else{
        currLading = null;
    }
    console.log(currLading);
}

function selectUser(userID){
    if(currLading != null){
        if(!currUsers.includes(userID)){
            currUsers.push(userID);
        }else{
            currUsers.splice(currUsers.indexOf(userID), 1);
        }

    }else{
        swal({
            title: "Selecteer eerst een lading!",
            text: "Om te kunnen strepen moet je eerst een lading selecteren",
            icon: "warning",
            dangerMode: true,
        })
    }
    console.log(currUsers);
}

function populateUsers(){
    var userContent = '';
    $.getJSON( '/api/users', function( data ) {
        $.each(data, function(){
            userContent += '<div class="col-2 itemwrapper">';
            userContent += '<div class="itemblock user" id='+this.USERID+' onclick="selectUser('+this.USERID+')">';
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
            ladingenContent += '<div class="itemblock button lading" id='+this.LADINGID+' onclick="selectLading('+this.LADINGID+')">';
            ladingenContent += '<img class="profilePicture" src="pictures/merken/' + this.PLAATJE + '">';
            ladingenContent += '</div></div>'
        });
        $('#ladingList').html(ladingenContent);
    });
}

function streep(){
    for(let i=0; i<currUsers.length; i++){
        createStreep(currUsers[i], 1, currLading);
    }
}

function createStreep(userid, aantal, ladingid){
    $.post( '/api/strepen?userid='+userid+'&aantal='+aantal+'&ladingid='+ladingid, function() {

    })
}

// DOM Ready =============================================================
$(document).ready(function() {
    populateLadingen();
    populateUsers();
});
