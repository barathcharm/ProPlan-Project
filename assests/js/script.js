//      Setting budget------------------
let ac_user=JSON.parse(localStorage.getItem("active_user"))
// let current_date = localStorage.getItem("current_date")
// delete ac_user['budget']
// localStorage.setItem("active_user",JSON.stringify(ac_user))
if(!ac_user["budget"]){
    budgetform()

}

function budgetform(){
    backgroundblur()
    document.body.innerHTML+=`
    <div class="budget_div">
    <h3>You are almost there!</h3>
    <hr>
    <p>Set a Monthly Budget for your Expenses </p>
    <input type="range" id="budget_range"  min="10" max="90" step="5" list="budget_range_list" value="80" required>
    <datalist id="budget_range_list">
        <option value="10">10%</option>
        <option value="30">30%</option>
        <option value="50">50%</option>
        <option value="70">70%</option>
        <option value="90">90%</option>
    </datalist>
    <p>Selected Budget =<span id="selected_budget"> 80% </span> </p>
    <div class="budget_note">
        <p><span>!NOTE:</span> If your expenses are about to reach your monthly budget, you will receive an email.</p>
    </div>
    <p id="done_budget">Done</p>
</div>
    `
    let selected_budget= document.getElementById("selected_budget")
    let budget_range= document.getElementById("budget_range")
    budget_range.addEventListener("input", e=>{
        selected_budget.innerHTML=budget_range.value+"%"
    })
    
    let done_budget = document.getElementById("done_budget")
    done_budget.addEventListener("click",e=>{
       let budget_value= budget_range.value
      
       ac_user["budget"]=budget_value 
       localStorage.setItem("active_user",JSON.stringify(ac_user))
       location.reload()
    
    })
} 
//  Budget div in the home center page and sending mail=====

let budget_percentage =document.getElementById("budget_percentage")

let expenses_allowed =document.getElementById("expenses_allowed")


budget_percentage.innerHTML=ac_user["budget"]+"%"

expenses_allowed.innerHTML=(ac_user["total_income"]/100)*ac_user["budget"]
let warning_budget = ac_user["budget"]-10
//  Sending email if the expenses exceeds
if(ac_user["total_expense"]>(ac_user["total_income"]/100)*warning_budget){

    let to= ac_user["email"]
    let subject = `Hello ${ac_user["name"]} Your expenses are nearly to reach your monthly budget !`
    let body =`
    Hello ${ac_user["name"]} <br> Your total income for this month untill ${current_date} is ${ac_user["total_income"]} <br> Your budget for this month is ${ac_user["budget"]} which is ${(ac_user["total_income"]/100)*ac_user["budget"]} <br>Your actual expenses for this month is ${ac_user["total_expense"]} <br><br> <h3>Its time to take a look at your expenses before it meets your budget for this month `

    sendEmail(to,subject,body)
    alert("Its time to take a look at your expenses before it meets your budget for this month")
}
if(ac_user["total_expense"]>(ac_user["total_income"]/100)*ac_user["budget"]){

    let to= ac_user["email"]
    let subject = `Hello ${ac_user["name"]} Your expenses had reached your monthly budget !`
    let body =`
    Hello ${ac_user["name"]} <br> Your total income for this month untill ${current_date} is ${ac_user["total_income"]} <br> Your budget for this month is ${ac_user["budget"]} which is ${(ac_user["total_income"]/100)*ac_user["budget"]} <br>Your actual expenses for this month is ${ac_user["total_expense"]} <br><br> <h3>The Expenses have overataked your monthly budget. Kindly ensure to control your expenses `

    sendEmail(to,subject,body)
    alert("The Expenses have overataked your monthly budget. Kindly ensure to control your expenses")
}

// Background blur function---------

function backgroundblur(){
    document.querySelector("header").style.filter = "blur(2.5px)"
    document.querySelector(".left_side").style.filter = "blur(2.5px)"
    document.querySelector(".right_side").style.filter = "blur(2.5px)"
    document.querySelector(".center_side").style.filter = "blur(2.5px)"
}

//      Viewing Income form
let add_income = document.getElementById("add_income")

add_income.addEventListener("click", e => {

    let form1 = document.getElementsByClassName("add_income_form");
    form1[0].classList.add("view")
backgroundblur()
})

// Viewing Expense form

let add_expense = document.getElementById("add_expense")

add_expense.addEventListener("click", e => {
    let form1 = document.getElementsByClassName("add_expense_form");
    form1[0].classList.add("view")
backgroundblur()
})

//---------------Adding income lists-------------------

let add_income_submit = document.getElementsByClassName("add_income_form")

add_income_submit[0].addEventListener("submit",e=> {
    if (Math.abs(document.getElementById("income_amount").value>0)) {
        let form1 = document.getElementsByClassName("add_income_form")
        let income_type = document.getElementById("income_type").value
        let income_category = document.querySelector('input[name="income_category"]:checked').value;
        let income_amount = document.getElementById("income_amount").value
        let date = localStorage.getItem("current_date")
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
    }
    else{
        alert("Enter amount greater than 0")
    }

   

})

//---------------Adding Expense lists-------------------

let add_expense_submit = document.getElementsByClassName("add_expense_form")

add_expense_submit[0].addEventListener("submit", e => {
    let active_user =JSON.parse(localStorage.getItem("active_user"))
    let expense_amount = Math.abs(document.getElementById("expense_amount").value)
    if(expense_amount<=active_user["total_balance"]){
        let form2 = document.getElementsByClassName("add_expense_form")
        let expense_type = document.getElementById("expense_type").value
        let expense_category = document.querySelector('input[name="expense_category"]:checked').value;
    
        let date = localStorage.getItem("current_date")
        let home_table_body = document.getElementById("home_table_body")
      
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
    }
    else{
        alert("Expense overtakes balance amount")
    }
   
})

// Viewing table data in home page
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
    <td>${transaction_list[i]["date"]}</td>
    <td id="balance">${transaction_list[i]["total_balance"]}</td>
    
    </tr>`
    // <td><span id="edit_icon"><img src="../images/icons/edit_icon.jpg" alt="icon"></span></td>
    // <td><span id="delete_icon"><img src="../images/icons/delete_icon.jpg" alt="icon"></span></td>

}

// Edit icon in income expense


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
        
// 

let welcome_name = document.getElementById("name")
welcome_name.innerHTML=JSON.parse(localStorage.getItem("active_user")).name+" !"
// Doughnut chart in home page------------

var xValues = ["Expense","Remaining Budget amount", "Balance "];
var yValues = [total_expense,((ac_user["total_income"]/100)*ac_user["budget"])-total_expense, total_balance];
var barColors = [
    "#f27674",
    "#f7b1b0",
"#dee1e5"
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



