var currUsers = [];
var currLading = null;

function selectLading(ladingID){
    if(currLading != ladingID){
        currLading = ladingID;
        document.getElementById('lading_'+ladingID).classList.add('selected');
        console.log(document.getElementById('lading_'+ladingID));

    }else{
        document.getElementById('lading_'+ladingID).classList.remove('selected');
        console.log(document.getElementById('lading_'+ladingID));
        currLading = null;
    }
    console.log(currLading);
}

function selectByElementID(elementID){
    document.getElementById(elementID).classList.add(" selected");
}

function selectUser(userID){
    if(currLading != null){
        if(!currUsers.includes(userID)){
            currUsers.push(userID);
            document.getElementById('user_'+userID).classList.add('selected');
        }else{
            currUsers.splice(currUsers.indexOf(userID), 1);
            document.getElementById('user_'+userID).classList.remove('selected');
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
            userContent += '<div class="itemblock user" id=user_'+this.USERID+' onclick="selectUser('+this.USERID+')">';
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
            ladingenContent += '<div class="itemblock button lading" id=lading_'+this.LADINGID+' onclick="selectLading('+this.LADINGID+')">';
            ladingenContent += '<img class="profilePicture" src="pictures/merken/' + this.PLAATJE + '">';
            ladingenContent += '</div></div>'
        });
        $('#ladingList').html(ladingenContent);
    });
}

function streep(){
    if((currLading != null)&&currUsers.length > 0){
        for(let i=0; i<currUsers.length; i++){
            createStreep(currUsers[i], 1, currLading);
        }
        clearSelection();
        swal({
            title: "Gestreept",
            text: "Geniet ervan!",
            type: "success",
            timer: 2000
        })
    }
}

function clearSelection(){
    for(let i=0; i<currUsers.length; i++){
        document.getElementById('user_'+currUsers[i]).classList.remove('selected');
    }
    document.getElementById('lading_'+currLading).classList.remove('selected');
    currUsers = [];
    currLading = null;
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
