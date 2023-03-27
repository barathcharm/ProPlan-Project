active_user = JSON.parse(localStorage.getItem("active_user"))


// LOg out Div -------------

let log_out = document.getElementById("log_out")
let log_out_div = document.querySelector(".log_out_div")
log_out.addEventListener("click",e=>{
    log_out_div.classList.toggle("view")
})

let log_out_button = document.getElementById("log_out_button")
log_out_button.addEventListener("click",e=>{
    let remember_me =document.getElementById("remember_me")
    if(remember_me.checked ==false){
        let users = JSON.parse(localStorage.getItem("users"))
        let active_user  =JSON.parse(localStorage.getItem("active_user"))
        console.log(users);

        users.forEach((e,index )=> {
            if(e["email"]==active_user["email"]){
                users.splice(index,1)
               console.log(users);
            }
        });
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.removeItem("active_user")
        window.location.href="../../index.html"
    }
    else{
        window.location.href="../../index.html"

    }
})

//  wallet balance on the nav-------------

let wallet_balance =active_user["wallet_balance"]?? 0
let nav_balance =document.getElementById("nav_balance")

nav_balance.innerHTML = wallet_balance+" /-"

//  name display on the right ----------

let displayy_name =document.getElementById("displayy_name")?? ""
displayy_name.innerHTML=active_user["display_name"]

let professionn = document.getElementById("professionn")??""
professionn.innerHTML =active_user["profession"]


// ----------- View total balance on right-----------
let  total_balance = active_user["total_balance"]?? 0

let display_total_balance =document.getElementById("total_balance")?? ""
display_total_balance.innerHTML = total_balance 

// ----------- View total income on right-----------
let   total_income =active_user["total_income"]?? 0

let display_total_income =document.getElementById("total_income")?? ""
display_total_income.innerHTML = total_income 

// ----------- View total expense on right-----------
let    total_expense =active_user["total_expense"]?? 0

let display_total_expense =document.getElementById("total_expense")??""
display_total_expense.innerHTML = total_expense