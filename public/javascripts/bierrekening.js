//bierrekening functies
//home pagina

// data boven aan de pagina
$(function(){
        var data = [201, 43, 2400, 6432, 123499, 53.32];
        var persoonlijk_jaar = document.getElementById('persoonlijkjaar');
        var persoonlijk_maand = document.getElementById('persoonlijkmaand');
        var persoonlijk_totaal = document.getElementById('persoonlijktotaal');
        var totaal_jaar = document.getElementById('totaaljaar');
        var totaal_totaal = document.getElementById('totaaltotaal');
        var persoonlijk_saldo = document.getElementById('persoonlijksaldo');
        persoonlijk_jaar.innerHTML = data[0];
        persoonlijk_maand.innerHTML = data[1];
        persoonlijk_totaal.innerHTML = data[2];
        totaal_jaar.innerHTML = data[3];
        totaal_totaal.innerHTML = data[4];
        persoonlijk_saldo.insertAdjacentHTML("beforeend", data[5])
        //saldo check
        if (data[5] > 50) {
            persoonlijk_saldo.classList.add("green");
        } else if (data[5] < 0) {
            persoonlijk_saldo.classList.add("red");
        }
});

//data in blokje prestaties
$(function(){
        var data_prestatie = ["80%", "10%", "20%", "40%", "20%", "20%"]
        var prestatie_kant = document.getElementById('prestatie_kant');
        var prestatie_kant_jaar = document.getElementById('prestatie_kant_jaar');
        var prestatie_1 = document.getElementById('prestatie_1');
        var prestatie_2 = document.getElementById('prestatie_2');
        var prestatie_3 = document.getElementById('prestatie_3');
        prestatie_kant.style.width = data_prestatie[0];
        prestatie_kant_jaar.style.width = data_prestatie[1];
        prestatie_1.style.width = data_prestatie[2];
        prestatie_2.style.width = data_prestatie[3];
        prestatie_3.style.width = data_prestatie[4];
    });

//data in blokje laatste streepjes

$(function(){
    var streep1 = [{"STREEPID":1,"TIMESTAMP":"2019-02-19T13:25:36.000Z","USERID":100,"AANTAL":4,"LADING":"Grolsch 4"},{"STREEPID":2,"TIMESTAMP":"2019-02-19T13:40:35.000Z","USERID":100,"AANTAL":3,"LADING":"Palm 2"},{"STREEPID":3,"TIMESTAMP":"2019-02-19T13:48:24.000Z","USERID":100,"AANTAL":3,"LADING":"Grolsch 3"},{"STREEPID":4,"TIMESTAMP":"2019-02-19T13:53:23.000Z","USERID":100,"AANTAL":3,"LADING":"Palm 2"},{"STREEPID":5,"TIMESTAMP":"2019-02-19T13:53:26.000Z","USERID":100,"AANTAL":3,"LADING":"Grolsch 3"},{"STREEPID":6,"TIMESTAMP":"2019-02-19T13:53:45.000Z","USERID":100,"AANTAL":3,"LADING":"Grolsch 3"}];
    var tableContent = '';
    var dagen = ["zondag","maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
    $.each(streep1,function(){
        var d = new Date(this.TIMESTAMP);

        tableContent += '<tr>';
        tableContent += '<td>' + this.USERID + '</td>';
        tableContent += '<td>' + this.LADING + '</td>';
        tableContent += '<td>' + d.getHours() + ":" + d.getMinutes() + '</td>';
        tableContent += '<td>' + dagen[d.getDay()]; + '</td>';

    });
    $('#myTable2').append(tableContent);
});




//lijnchart - links onder
$(function(){

        var ctx = document.getElementById("lineChart1");
        var lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: "rgba(38, 185, 154, 0.31)",
                    borderColor: "rgba(38, 185, 154, 0.7)",
                    pointBorderColor: "rgba(38, 185, 154, 0.7)",
                    pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data: [31, 100, 6, 39, 20, 85, 7]
                }, {
                    label: "My Second dataset",
                    backgroundColor: "rgba(3, 88, 106, 0.3)",
                    borderColor: "rgba(3, 88, 106, 0.70)",
                    pointBorderColor: "rgba(3, 88, 106, 0.70)",
                    pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(151,187,205,1)",
                    pointBorderWidth: 1,
                    data: [82, 23, 66, 9, 99, 4, 2]
                }]
            },
        });

});

//barchart - recht onder
$(function(){

    var ctx = document.getElementById("mybarChart1");
    var mybarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: '# of Votes',
                backgroundColor: "#26B99A",
                data: [51, 30, 40, 28, 92, 50, 45]
            }, {
                label: '# of Votes',
                backgroundColor: "#03586A",
                data: [41, 56, 25, 48, 72, 34, 12]
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

});

//
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
                let qrcode = new QRCode("qrcode", {
                    width: 500,
                    height: 500,
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

// sidebar

$(function(){
    var width = 100;
    var $menu = $('#sidebar');
    var i = 0;
    $('.menu-button').on("click", function() {


        if (i==0) {
            $menu.animate({'margin-left': 0}, 1000);
            i = 1;
        } else {
            $menu.animate({'margin-left': -100}, 1000);
            i = 0;
        }



    })
});









































