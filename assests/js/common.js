active_user = JSON.parse(localStorage.getItem("active_user"))??[]


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

// Active user set data in the users array in the local storage..!

function setDataInTheLocal(){
    
    let users = JSON.parse(localStorage.getItem("users"))
    let active_user_ = JSON.parse(localStorage.getItem("active_user"))
    users.forEach((e,index)=>{
        if(active_user_["email"]==e["email"]){
            users[index]=active_user_
        }
    })
    localStorage.setItem("users",JSON.stringify(users))


}

// DATE IN THE NAV BAR========================

let current_date = localStorage.getItem("current_date")??0
let date_value = document.getElementById("date_value")
date_value.innerHTML=current_date
let date_edit = document.getElementById("date_edit")
let date_div= document.getElementById("date")
date_edit.addEventListener("click",e=>{
    date.innerHTML=`
    <input type="date" id="new_date">
    <img src="../images/icons/save_img.png" alt="img" id="save_date">
    `
    document.getElementById("new_date").value= localStorage.getItem("current_date")
    savedate()
})
function savedate(){
    let save_date= document.getElementById("save_date")
save_date.addEventListener("click",e=>{
    let new_date=document.getElementById("new_date").value
    console.log(new_date);
    localStorage.setItem("current_date",new_date)
    location.reload()
})
}
// Mail sending function----------

    function sendEmail(to,subject,body) {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "proplan2023@gmail.com",
        Password: "9ED2566E1ADC31BAA6533970D825CD09C348",
        To: to,
        From: "proplan2023@gmail.com",
        Subject: subject,
        Body: body,
        // Attachments: [
        // {
        //     name: "File_Name_with_Extension",
        //     path: "Full Path of the file"
        // }]
    })
        .then(function (message) {
        alert("Mail has been sent successfully")
        })
        .catch((error)=>{
            console.log(error)
        })
    }
