let deposit_button = document.getElementById("deposit_button")
let deposit_form = document.querySelector(".deposit_form")
let send_request = document.querySelector("#send_request")
let send_request_div = document.querySelector(".send_request")
let send_otp_request = document.getElementById("send_otp_request")
let send_request_otp =document.querySelector(".send_request_otp")
let done_button = document.querySelector("#done")
let active_user= JSON.parse(localStorage.getItem("active_user"))


let withdraw_button = document.getElementById("withdraw_button")
let withdraw_form = document.querySelector(".withdraw_form")

let wallet_balance_amount = document.querySelector("#wallet_balance_amount")
let  withdraw_wallet_balance = document.getElementById("withdraw_wallet_balance")
// let wallet_balance

let withdraw_money = document.getElementById("withdraw_money")


function bg_blur() {
    document.querySelector("header").style.filter = "blur(2.5px)"
    document.querySelector(".left_side").style.filter = "blur(2.5px)"
    document.querySelector(".banner").style.filter = "blur(2.5px)"
    document.querySelector(".content1").style.filter = "blur(2.5px)"
}


// ---------------view deposit form
deposit_button.addEventListener("click", e => {
    deposit_form.classList.add("view")
    
    bg_blur();
})


// For selecting one payment method

let selected_payment_method = document.getElementsByClassName("step2_list")[0,1].querySelectorAll("div")
selected_payment_method.forEach(e => {
    e.addEventListener("click", el => {
        e.style.backgroundColor = "rgb(244, 244, 244)"
    }
    )
})


//------------------completion of deposit from

send_request.addEventListener("click", e => {
    let deposit_amount = document.querySelector("#deposit_amount").value
    let upiId = document.querySelector("#upiid").value

    if (deposit_amount != "" && upiId != "") {
        send_request_div.classList.remove("not_view")
        console.log(deposit_amount);
    }
}
)

// sending otp request to withdraw amount-----------


send_otp_request.addEventListener("click", e => {
    let withdraw_amount = document.querySelector("#withdraw_amount").value
    let upiId = document.querySelector("#withdraw_upiid").value

    if (withdraw_amount != "" && withdraw_upiid != "") {
        send_request_otp.classList.remove("not_view")
        console.log(withdraw_amount);
    }
}
)

// ------------------------   Getting deposited value


done_button.addEventListener("click", e => {
    e.preventDefault()
    let deposit_amount = document.querySelector("#deposit_amount").value
    let upiId = document.querySelector("#upiid").value
    if (deposit_amount != "" && upiId != "") {
        
        wallet_balance = active_user["wallet_balance"]??0
        wallet_balance += Number(deposit_amount)
        active_user["wallet_balance"] =wallet_balance

        localStorage.setItem("active_user", JSON.stringify(active_user))

        window.location.href = "./wallet.html"


    }

})
// ---------------------viewing Withdraw form----------    

withdraw_button.addEventListener("click", e => {
    withdraw_form.classList.add("view")

    bg_blur();
})
withdraw_wallet_balance.innerHTML = wallet_balance+"/-"


//  -----------Withdrawing money from deposit-------

withdraw_money.addEventListener("click",e=>{

    e.preventDefault()
    let withdraw_amount = document.querySelector("#withdraw_amount").value

    let withdraw_upiid = document.querySelector("#withdraw_upiid").value

   
    if (withdraw_amount != "" && withdraw_upiid != ""  ) {
        if(wallet_balance>=withdraw_amount&& withdraw_amount>0){
            wallet_balance = active_user["wallet_balance"]??0
            wallet_balance -= Number(withdraw_amount)
            active_user["wallet_balance"] =wallet_balance
    
            localStorage.setItem("active_user", JSON.stringify(active_user))
    
            window.location.href = "./wallet.html"
        }
        else{
            alert("Entered withdraw amount overtakes Wallet balance..! or Enter amount greater than 0")
        }
        


}})

//-------------transactions_view by clicking image


let count = 2
let transactions_view = document.getElementById("transactions_view")
let transactions_table = document.querySelector(".transactions_table")
transactions_view.addEventListener("click", e => {

    count++
    let deg = 180 * count
    transactions_view.style.transform = `rotate(${deg}deg)`
    transactions_table.classList.toggle("not_view")
})




// let wallet_balance = JSON.parse(localStorage.getItem("wallet_balance"))

wallet_balance_amount.innerHTML = wallet_balance + "/-"
