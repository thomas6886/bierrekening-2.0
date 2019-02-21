

//Function voor het vullen van de personen tabel
$(function () {
        var table = document.getElementById('test');

        for (var i = 1; i < 8; i++) {
                var row = table.insertRow();
                for(var j = 1; j < 6; j++) {
                        var cell = row.insertCell(0);
                        cell.innerHTML="<td id=\"'.$person_id[$i].'\" class=\"'.$gold.'\" ><div class=\"percentage_bar\"><progress ></progress> <span class=\"aantal_biertjes\">90</span> <span id=\"'.$person_id[$i].'_teller\" class=\"aantal_streepjes\"></span></div><div class=\"persoon_plaatje\"><img src='steven.jpg' alt='hello'/></img></div></td>";


                }
        }

});

// function voor het vullen van de bieren tabel
$(function () {
        var table = document.getElementById('bieren');
        var row = table.insertRow();
        for (var i = 1; i < 8; i++) {
                var cell = row.insertCell(0);
                cell.innerHTML="<td id=\"bier'.$i.'\" class=\"bier'.$i.'\" ><div class=\"plaatje\"><img src='/pictures/grolsch_pilsner_klein.png' alt='hello' ></div></td>";


        }

});







//GLOBAL VARIABLES, gebruikt om bij te houden welk bier geselecteerd is en wie hoeveel van welk soort bier geselecteerd heeft
var cur_bier; // the currently selected beer
var streepIncremental = false; // als TRUE worden biertjes incrementeel gestreept ipv aan-uit



// Verkrijg local IP (om vast te stellen of we op de steeptablet zitten)
var myIP;
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};
pc.createDataChannel("");    //create a bogus data channel
pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
pc.onicecandidate = function(ice){  //listen for candidate events
        if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
        myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
        pc.onicecandidate = noop;
};


// Stel vast of apparaat wordt opgeladen (inclusief event handler; boolean <charging> geeft real-time status)
var charging = true;
if("getBattery" in navigator) {
        navigator.getBattery().then(function(battery){
                charging = battery.charging;
                battery.onchargingchange = function(){charging = battery.charging;};
        });
}




// Event handlers: wat gebeurt er na een klik op welke knop?
// de onderste twee zijn met JQuery gedaan vanwege de makkelijke select
document.getElementById("reset").onclick=function(){window.location.reload()};
//document.getElementById("stats").onclick=function(){window.location.href='/streep/statestieken'};
document.getElementById("streepMethod").onclick=function(){switchStreepMethod()};
document.getElementById("send").onclick=function(){sendStreepjes()};
$(".personen table tr td").click(streepBier);
$(".bieren tr td").click(setBier);



// Functies, aangeroepen door event handlers
function setBier()
{
        if(cur_bier)
        {
                document.getElementById(cur_bier).className = cur_bier;
        }

        this.className = this.id + "_selected";
        cur_bier = this.id;
}

function streepBier()
{
        if(cur_bier)
        {
                if (streepjes[this.id] == 0)
                {
                        this.className = "persoon_" + cur_bier;
                        streepjes[this.id] = 1;
                        streepTypes[this.id] = bierLadingen[cur_bier.replace('bier', '')];
                } else {
                        if (streepIncremental && bierLadingen[cur_bier.replace('bier', '')] == streepTypes[this.id]){
                                streepjes[this.id] ++;
                                document.getElementById(this.id + "_teller").innerHTML = streepjes[this.id];
                        } else {
                                this.className = "persoon";
                                streepjes[this.id] = 0;
                                streepTypes[this.id] = 0;
                                document.getElementById(this.id + "_teller").innerHTML = "";
                        }
                }
        }
}

function switchStreepMethod()
{
        var image = document.getElementById('streepSwitchImage');
        if (streepIncremental) {
                streepIncremental = false;
                image.src = "/pictures/on_off.png"
        } else {
                streepIncremental = true;
                image.src = "/pictures/counting.png"
        }
}


// verstuur arrays streepjes en streepTypes naar server
function sendStreepjes()
{

        if (!charging && myIP == "192.168.1.118") {
                $("td#send").css("background-color","red");
                window.alert("Een huischgenoot-nazi heeft de oplader gestolen. Geen oplader == niet stepen. Je steepjes zijn dan ook niet verzonden. Wieeeuuwwieeeuuuwiieeeuw.");
                window.location.reload();
        } else {

                document.getElementById("send").removeAttribute('onclick');
                $("td#send").css("background-color","gold");

//var audio = new Audio('steepsound.mp3');
//audio.play();

                //pak arrays in in streepArrays dmv JSON en verstuur naar sendStreep.php
                var streepArrays = {};
                streepArrays.arPoints = [{'x':1, 'y': 2},{'x': 2.3, 'y': 3.3},{'x': -1, 'y': -4}];

                $.ajax({
                        url: 'send-streep.php',
                        type: 'post',
                        async: false,
                        data: {streepjes : JSON.stringify(streepjes),streepTypes : JSON.stringify(streepTypes)},
                        success: function(data) {
                                // window.alert("Aantal biertjes per id: " + streepjes);
                                // window.alert("Gestreepte ladingnummer per id: " + streepTypes);
                                //window.alert(data);
                        },
                        error: function() {
                                window.alert("Stepen is mislukt! De pagina wordt nu vernieuwd zonder streepjes te versturen. Probeer het nog eens!");
                        },
                        complete: function() {
                                window.location.reload();
                        }
                });

        }
}




// barchart

$(function(){

        var ctx = document.getElementById("mybarChart1");
        var mybarChart = new Chart(ctx, {
                type: 'bar',
                data: {
                        labels: ["Deze week", "vorige", "daarvoor", "daarvoor", "daarvoor", "daarvoor", "daarvoor"],
                        datasets: [{
                                label: '% biertjes tenopzichte van hoogste week',
                                backgroundColor: "#26B99A",
                                data: [51, 30, 40, 28, 100, 50, 45]
                        }]
                },

                options: {
                        scales: {
                                yAxes: [{
                                        ticks: {
                                                fontsize: 40,
                                                beginAtZero: true
                                        }
                                }],
                                xAxes: [{
                                        ticks: {
                                                fontsize: 40,
                                                beginAtZero: true
                                        }
                                }]
                        },
                        legend: {
                                labels: {
                                        // This more specific font property overrides the global property
                                        fontSize: 30
                                }
                        }
                }
        });
});



$(function(){
        var ctx = document.getElementById("pieChart2");
        var data = {
                datasets: [{
                        data: [80, 20 ],
                        backgroundColor: [
                                "#455C73",
                                "#BDC3C7"
                        ],
                        label: ['bentrot 37', 'bentrot 37'] // for legend
                }],
                labels: [
                        "Bentrot 37",
                        "bentrot 35"
                ]
        };
        var pieChart = new Chart(ctx, {
                data: data,
                type: 'pie',
                otpions: {
                        legend: {
                                labels: {
                                        // This more specific font property overrides the global property
                                        fontSize: 30
                                }
                        }
                }
        });
});




$(function(){
        $('.panel-button').on("click", function() {


                //var text= "BCD0011SCTINGBNL2ASteven LankheetNL59INGB0669324469EUR20";

                let timerInterval
                Swal.fire({
                        type: 'success',
                        title: 'Lekker bezig pik',
                        width: '50%',
                        html: '<div id="qrcode"></div>',
                        onOpen: () => {
                                var geld = $(this).attr("data-panelid");
                                let qrcode = new QRCode("qrcode", {
                                        width: 177,
                                        height: 177,
                                        colorDark: "#000",
                                        colorLight: "#ffffff",
                                        correctLevel: QRCode.CorrectLevel.H
                                });

                                //var text= "BCD0011SCTINGBNL2ASteven LankheetNL59INGB0669324469EUR20";
                                var text= "BCD\n001\n1\nSCT\nINGBNL2A\nSteven Lankheet\nNL59INGB0669324469\nEUR"+geld;
                                qrcode.clear();
                                qrcode.makeCode(text);
                        },
                        onClose: () => {
                                clearInterval(timerInterval)
                        }
                })


        })
});