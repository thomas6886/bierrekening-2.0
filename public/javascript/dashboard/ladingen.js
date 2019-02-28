function populateLadingen(){
    var tableContent = '';
    $.getJSON( '/api/ladingen/active', function( data ) {
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.LADINGID + '</td>';
            tableContent += '<td>' + this.MERK + '</td>';
            tableContent += '<td> <a href="ladingen/'+ this.LADINGID+ '">Info</a></td>';
            tableContent += '</tr>';
        });
        $('#ladingList tbody').html(tableContent);
    });
}
// DOM Ready =============================================================
$(document).ready(function() {
    populateLadingen();
});
