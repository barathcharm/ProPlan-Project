// var xValues = ["Expense", "Balance"];
// var yValues = [17500, 8500];
// var barColors = [
//     "#f68685",
//     "#ececec",
// ];

// new Chart("homechart", {
//     type: "doughnut",
//     data: {
//         labels: xValues,
//         datasets: [{
//             backgroundColor: barColors,
//             data: yValues
//         }]
//     },
//     options: {
//         title: {
//             display: true,
//             text: "Expenses in January 2023"
//         }
//     }
// });
let a=[1,2,3,4,5,6,7]
let g = 2;
let n = a.length - (g - 1);
let max =0;
for (i = 0; i < n; i++) {
    let add = 0;
    for (j = i; j < (i + g); j++) {
        add += a[j]
    }
    if (max < add) {
        max = add
    }
}
console.log(max)

