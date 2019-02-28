var users = [];
var currLading = null;

function selectLading(ladingID){
    if(currLading != ladingID){
        if(currLading != null){
          document.getElementById('lading_'+currLading).classList.remove('selected');
        }
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

function selectUser(userID){
    if(currLading != null){
        if(users[userID] === 0){
            users[userID] = 1;
            document.getElementById('user_'+userID).classList.add('selected');
        }else{
            users[userID] = 0;
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
}

function populateUsers(){
    var userContent = '';
    $.getJSON( '/api/users', function( data ) {
        $.each(data, function(){
            userContent += '<div class="itemwrapper">';
            userContent += '<div class="itemblock user" id=user_'+this.USERID+' onclick="selectUser('+this.USERID+')">';
            userContent += '<div class="topRowInfo"><p>12</p><p>18</p></div>';
            userContent += '<img class="profilePicture" src="pictures/profile_pictures/' + this.PLAATJE + '">';
            userContent += '<div class="bottomRowInfo"><p>'+this.NAAM+'</p></div>';
            userContent += '</div></div>';
            users[this.USERID] = 0;
        });
        $('#usersList').html(userContent);
    });
}

function populateLadingen(){
    var ladingenContent = '';
    $.getJSON( '/api/ladingen/active', function( data ) {
        $.each(data, function(){
            ladingenContent += '<div class="itemwrapper">';
            ladingenContent += '<div class="itemblock button lading" id=lading_'+this.LADINGID+' onclick="selectLading('+this.LADINGID+')">';
            ladingenContent += '<img class="profilePicture" src="pictures/merken/' + this.PLAATJE + '">';
            ladingenContent += '</div></div>'
        });
        $('#ladingList').html(ladingenContent);
    });
}

function streep(){
    if(currLading != null){
        for(let i=0; i<users.length; i++){
            if(users[i] !== 0){
              createStreep(i, users[i], currLading);
            }
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
    for(let i=0; i<users.length; i++){
        if(users[i] > 0){
            document.getElementById('user_'+i).classList.remove('selected');
        }
    }
    document.getElementById('lading_'+currLading).classList.remove('selected');
    currLading = null;
}

function createStreep(userid, aantal, ladingid){
    $.post('/api/strepen?userid='+userid+'&aantal='+aantal+'&ladingid='+ladingid, function() {

    })
}

// DOM Ready =============================================================
$(document).ready(function() {
    populateLadingen();
    populateUsers();
});
