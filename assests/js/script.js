
//      Viewing Income form
let add_income = document.getElementById("add_income")

add_income.addEventListener("click", e => {

    let form1 = document.getElementsByClassName("add_income_form");
    form1[0].classList.add("view")
    document.querySelector("header").style.filter = "blur(2.5px)"
    document.querySelector(".left_side").style.filter = "blur(2.5px)"
    document.querySelector(".right_side").style.filter = "blur(2.5px)"
    document.querySelector(".center_side").style.filter = "blur(2.5px)"
})

//      Viewing Expense form

let add_expense = document.getElementById("add_expense")

add_expense.addEventListener("click", e => {
    let form1 = document.getElementsByClassName("add_expense_form");
    form1[0].classList.add("view")
    document.querySelector("header").style.filter = "blur(2.5px)"
    document.querySelector(".left_side").style.filter = "blur(2.5px)"
    document.querySelector(".right_side").style.filter = "blur(2.5px)"
    document.querySelector(".center_side").style.filter = "blur(2.5px)"
})

//---------------Adding income lists-------------------

let add_income_submit = document.getElementsByClassName("add_income_form")

add_income_submit[0].addEventListener("submit", e => {

    let form1 = document.getElementsByClassName("add_income_form")
    let income_type = document.getElementById("income_type").value
    let income_category = document.getElementById("income_category").value
    let income_amount = document.getElementById("income_amount").value
    let date = new Date().toLocaleDateString();
    let home_table_body = document.getElementById("home_table_body")
    let active_user =JSON.parse(localStorage.getItem("active_user"))
    let total_income = active_user["total_income"]?? 0
    let total_balance = active_user["total_balance"]?? 0
    let transaction_list = active_user["transaction_list"]?? []
    let transaction_count =  active_user["transaction_count"]?? 0

    transaction_count = transaction_count + 1;
    total_balance = total_balance + Number(income_amount)
    total_income = total_income +Number(income_amount)

    let transaction_data = {
        "count": transaction_count,
        "type": income_type,
        "category": income_category,
        "amount": "+"+income_amount,
        "date": date,
        "id": "income",
        "total_balance": total_balance
    }

    console.log(transaction_list);

    transaction_list.unshift(transaction_data)

    active_user["total_income"] = total_income
    active_user["total_balance"] = total_balance
    active_user["transaction_list"] = transaction_list
    active_user["transaction_count"] = transaction_count

    localStorage.setItem("active_user", JSON.stringify(active_user))

    form1[0].classList.remove("view")

})

//---------------Adding Expense lists-------------------

let add_expense_submit = document.getElementsByClassName("add_expense_form")

add_expense_submit[0].addEventListener("submit", e => {

    let form2 = document.getElementsByClassName("add_expense_form")
    let expense_type = document.getElementById("expense_type").value
    let expense_category = document.getElementById("expense_category").value
    let expense_amount = document.getElementById("expense_amount").value
    let date = new Date().toLocaleDateString();
    let home_table_body = document.getElementById("home_table_body")

    let active_user =JSON.parse(localStorage.getItem("active_user"))
    let total_expense = active_user["total_expense"]?? 0
    let total_balance = active_user["total_balance"]?? 0
    let transaction_list = active_user["transaction_list"]?? []
    let transaction_count =  active_user["transaction_count"]?? 0

    transaction_count = transaction_count + 1;
    total_balance = total_balance - Number(expense_amount)
    total_expense = total_expense +Number(expense_amount)

    let transaction_data = {
        "count": transaction_count,
        "type": expense_type,
        "category":expense_category,
        "amount": "-"+expense_amount ,
        "date": date,
        "id": "expense",
        "total_balance": total_balance
    }

    console.log(transaction_list);

    transaction_list.unshift(transaction_data)

    active_user["total_expense"] = total_expense
    active_user["total_balance"] = total_balance
    active_user["transaction_list"] = transaction_list
    active_user["transaction_count"] = transaction_count

    localStorage.setItem("active_user", JSON.stringify(active_user))

    form2[0].classList.remove("view")



})
let active_user =JSON.parse(localStorage.getItem("active_user"))

let transaction_list =active_user["transaction_list"]?? []
for (let i = 0; i < transaction_list.length; i++) {

    home_table_body.innerHTML +=
     ` 
    <tr>
    <td>${transaction_list[i]["count"]}</td>
    <td>${transaction_list[i]["type"]}<br>
        <span >${transaction_list[i]["category"]}</span>
    </td>
    <td id="${transaction_list[i]["id"]}">${transaction_list[i]["amount"]}</td>
    <td>27/01</td>
    <td id="balance">${transaction_list[i]["total_balance"]}</td>
    <td><span id="edit_icon"><img src="../images/icons/edit_icon.jpg" alt="icon"></span></td>
    <td><span id="delete_icon"><img src="../images/icons/delete_icon.jpg" alt="icon"></span></td>
    </tr>`

}




// Viewing the Percentage statistics in home page---------
  total_income =active_user["total_income"]?? 0
   total_expense =active_user["total_expense"]?? 0

 total_balance = active_user["total_balance"]?? 0

let expense_percentage = ((total_expense/total_income)*100).toFixed(2)

let balance_percentage = ((total_balance/total_income)*100).toFixed(2)

document.getElementById("expense_percentage").innerHTML = expense_percentage+"%"

document.getElementById("balance_percentage").innerHTML =balance_percentage+"%"

// Storing in the original user table----------


let users = JSON.parse(localStorage.getItem("users"))
users.forEach((e,index) => {
    if (e["email"] == active_user["email"]) {

        users[index]=active_user
    }
}
)

localStorage.setItem("users", JSON.stringify(users))
        

// Doughnut chart in home page------------

var xValues = ["Expense", "Balance"];
var yValues = [total_expense, total_balance];
var barColors = [
    "#f68685",
    "#ececec",
];

new Chart("homechart", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: "Expenses in January 2023"
        }
    }
});
