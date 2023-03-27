
var xValues =['01/01', '02/01', '03/01', '05/01', '06/01','06/01','08/01','12/01','15/01','17/01','19/01','22/01','24/01','26/01','27/01','28/01'];
var yValues = [4000,5000,5000,2500,2000,2000,500,1000,2000,1000,1000,2000,2000,1000,2000,0];
var zValues =[4000,2000,5000,2500,2000,2000,500,1000,2000,1000,1000,2000,2000,1000,2000,0]
var barColors = [ "#f3d251", "#f3d251", "#f78787","#f78787","#f78787","#f78787","#f78787","#f78787","#f3d251","#f78787","#f78787","#f78787","#f3d251","#f78787","#f78787","#f78787"];

new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            // backgroundColor:"rgba(0,0,255,1.0)",
            borderColor: "blue",
            data: yValues,
            fill:false
        },
        {
            // backgroundColor:"rgba(0,0,255,1.0)",
            borderColor: "green",
            data: zValues,
            fill:false
        }]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: "Statistics on day to day Expenses - JAN 2023"
        }
    }
});

var xValues =["Bills","Personal","Shopping","Entertainment","Travel","Vehicle","Investment"];
var yValues = [8500,3000,3000,500,1000,2000,2000];
var barColors = ["#a179bf","#fe7676","#f4cf28","#5dbeaa","#6fa6df","#603cb5","#a2bfc6"];

new Chart("categorychart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: "Category wise expenses of JAN 2023"
        }
    }
});
