

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

document.getElementById("reset").onclick=function(){window.location.reload()};


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



//sweet alert pop up box en qr.js
$(function(){
        $('.panel-button').on("click", function() {


                var titleinput = $(this).attr("data-panelid");

                if (titleinput == 10) {
                        title = "Heel matig, arme sloeber"
                } else if (titleinput == 20){
                        title = "Beter dan 10 maar nog steeds niet veel"
                }else if (titleinput == 50){
                        title = "Goed bezig"
                }else if (titleinput == 100){
                        title = "Deze rijke tata verdient een sticker"
                }

                let timerInterval
                Swal.fire({
                        type: 'success',
                        title: title,
                        width: '50%',
                        html: '<div id="qrcode"></div>',
                        onOpen: () => {
                                var geld = $(this).attr("data-panelid");
                                var naam = "voor saldo van steven";
                                let qrcode = new QRCode("qrcode", {
                                        width: 500,
                                        height: 500,
                                        colorDark: "#000",
                                        colorLight: "#ffffff",
                                        correctLevel: QRCode.CorrectLevel.H
                                });

                                //var text= "BCD0011SCTINGBNL2ASteven LankheetNL59INGB0669324469EUR20";
                                var text= "BCD\n001\n1\nSCT\nINGBNL2A\nSteven Lankheet\nNL59INGB0669324469\nEUR"+geld+"\n\n\n"+naam;
                                qrcode.clear();
                                qrcode.makeCode(text);
                        },
                        onClose: () => {
                                clearInterval(timerInterval)
                        }
                })


        })
});











