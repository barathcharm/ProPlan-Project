let act_user = JSON.parse(localStorage.getItem("active_user"))

// Total graph in th analytics page----------

var xValues = ['01/01', '02/01', '03/01', '05/01', '06/01', '06/01', '08/01', '12/01', '15/01', '17/01', '19/01', '22/01', '24/01', '26/01', '27/01', '28/01'];
var yValues = [4000, 5000, 5000, 2500, 2000, 2000, 500, 1000, 2000, 1000, 1000, 2000, 2000, 1000, 2000, 0];
var zValues = [4000, 2000, 2500, 2000, 2000]
var barColors = ["#f3d251", "#f3d251", "#f78787", "#f78787", "#f78787", "#f78787", "#f78787", "#f78787", "#f3d251", "#f78787", "#f78787", "#f78787", "#f3d251", "#f78787", "#f78787", "#f78787"];

new Chart("total_graph", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            // backgroundColor:"rgba(0,0,255,1.0)",
            borderColor: "#fe7676",
            data: yValues,
            fill: false
        },
        {
            // backgroundColor:"rgba(0,0,255,1.0)",
            borderColor: "#f4cf28",
            data: zValues,
            fill: false
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



//  Category wise expense pie chart---------------


var xValues = ["Bills", "Personal", "Shopping", "Entertainment", "Travel", "Vehicle", "Investment"];
var yValues = [8500, 3000, 3000, 500, 1000, 2000, 2000];
var barColors = ["#a179bf", "#fe7676", "#f4cf28", "#5dbeaa", "#6fa6df", "#603cb5","#0075a4, #ed7226", "#c8a4b6", "#a0a0a0",
"#1f7043","#72b037","#c1bb7f","#7e7e7c","#b9614c"];

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


//  Income wise expense pie chart----------------


var xValues = ["Bills", "Personal", "Shopping", "Entertainment", "Travel", "Vehicle", "Investment"];
var yValues = [8500, 3000, 3000, 500, 1000, 2000, 2000];
var barColors = ["#a179bf", "#fe7676", "#f4cf28", "#5dbeaa", "#6fa6df", "#603cb5","#0075a4, #ed7226", "#c8a4b6", "#a0a0a0",
"#1f7043","#72b037","#c1bb7f","#7e7e7c","#b9614c"];

new Chart("incomecategorychart", {
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
            text: "Category wise Inflows of JAN 2023"
        }
    }
});


//  Displaying expense category details==================

let category_list = JSON.parse(localStorage.getItem("active_user"))["category"]

let expense_categories = document.querySelector(".expense_categories")
let expense_category = category_list["expense"]
let expense_category_names =Object.keys(category_list["expense"])
console.log(expense_category)
expense_category_names.forEach((e, i) => {
    let total_category_amount=0
    let each_category_titles=""
    for(let n=0;n<expense_category[e].length;n++){
        total_category_amount+=Number(expense_category[e][n]["amount"])
        each_category_titles+= `
        <p>${expense_category[e][n]["type"]} <span class="each_expense_value">${expense_category[e][n]["amount"]}/-</span></p>
      
        `
    }
    expense_categories.innerHTML += `
    <div class="every_expense_category">
                    <div class="expense_category_header">
                        <p class="expense_category_name">${e}</p>
                        <div class="amount">
                            <p class="expense_category_spending">${total_category_amount}/-</p>
                            <img src="../images/icons/arrow_down.png" alt="icon">
                        </div>
                    </div>
                    <div class="expense_category_details">
                        <div class="each_expense_details">
                            ${each_category_titles}
                        </div>
                        <div class="each_category_total_value">
                            <p>Total <span class="each_expense_total">${total_category_amount}/-</span></p>
                        </div>
                    </div>
                </div>
    `
   
})

// Display income category details-------------------

let income_categories = document.querySelector(".income_categories")
let income_category = category_list["income"]
let income_category_names =Object.keys(category_list["income"])
income_category_names.forEach((e,i)=>{
    let total_category_amount=0
    let each_category_titles=""
    for(let n=0;n<income_category[e].length;n++){
        total_category_amount+=Number(income_category[e][n]["amount"])
        each_category_titles+= `
        <p>${income_category[e][n]["type"]}<span class="each_income_value">${income_category[e][n]["amount"]}/-</span></p>
        `
    }
    income_categories.innerHTML+=`
    <div class="every_income_category">
    <div class="income_category_header">
        <p class="income_category_name">${e}</p>
        <div class="amount">
            <p class="income_category_spending">${total_category_amount}/-</p>
            <img src="../images/icons/arrow_down.png" alt="icon">
        </div>
    </div>
    <div class="income_category_details">
        <div class="each_income_details">
        ${each_category_titles}
        </div>
        <div class="each_category_total_value">
            <p>Total <span class="each_income_total">${total_category_amount}/-</span></p>
        </div>
    </div>
</div>
    `
})



// Viewing the income and expense details...while clicking----------------

let expense_details_div= document.querySelectorAll(".expense_category_details")
let expense_category_header=document.querySelectorAll(".expense_category_header")
console.log(expense_category_header);
expense_category_header.forEach((e,i)=>{
    console.log("iugc");
    e.addEventListener("click",el=>{
        console.log(expense_details_div[i]);
        expense_details_div[i].classList.toggle("view")
    })
})

let income_details_div= document.querySelectorAll(".income_category_details")
let income_category_header=document.querySelectorAll(".income_category_header")
console.log(income_category_header);
income_category_header.forEach((e,i)=>{
    console.log("iugc");
    e.addEventListener("click",el=>{
        console.log(income_details_div[i]);
        income_details_div[i].classList.toggle("view")
    })
})


// Viewing total expenses and income-------------------


let total_income_value = document.querySelectorAll(".total_income_value")
total_income_value.forEach(e=>{
    e.innerHTML=act_user["total_income"]+" /-"
})
 

let total_expense_value = document.querySelectorAll(".total_expense_value")
total_expense_value.forEach(e=>{
    e.innerHTML=act_user["total_expense"]+" /-"
})


//  category list details  with different colors expense and income----------=================


let chartcolors=["#a179bf", "#fe7676", "#f4cf28", "#5dbeaa", "#6fa6df", "#603cb5","#0075a4, #ed7226", "#c8a4b6", "#a0a0a0",
"#1f7043","#72b037","#c1bb7f","#7e7e7c","#b9614c"]

let expense_category_details =  document.querySelector(".expense_category_chart .category_lists")
console.log(expense_category_names);
expense_category_names.forEach((e,i)=>{
    console.log(e);
    let total_amount=0
    for(let u=0;u<expense_category[e].length;u++){
total_amount+=Number(expense_category[e][u]["amount"])
    }
    console.log(total_amount);
    expense_category_details.innerHTML+=`
    <div class="category_list">
           <div class="category_color color_1" style="background-color:${chartcolors[i]};"></div>
            <p>${e} <span class="expense_category_value">${total_amount} /-</span></p>
    </div>
    `
})

let income_category_details =  document.querySelector(".income_category_chart .category_lists")
console.log(expense_category_names);
income_category_names.forEach((e,i)=>{
    console.log(e);
    let total_amount=0
    for(let u=0;u<income_category[e].length;u++){
total_amount+=Number(income_category[e][u]["amount"])
    }
    console.log(total_amount);
    income_category_details.innerHTML+=`
    <div class="category_list">
           <div class="category_color color_1" style="background-color:${chartcolors[i]};"></div>
            <p>${e} <span class="income_category_value">${total_amount} /-</span></p>
    </div>
    `
})
