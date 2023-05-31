const deposit_button = document.getElementById("deposit_button");
const deposit_form = document.querySelector(".deposit_form");
const send_request = document.querySelector("#send_request");
const send_request_div = document.querySelector(".send_request");
const send_otp_request = document.getElementById("send_otp_request");
const send_request_otp = document.querySelector(".send_request_otp");
const done_button = document.querySelector("#done");
const active_user = JSON.parse(localStorage.getItem("active_user"));

const withdraw_form = document.querySelector(".withdraw_form");

const withdraw_wallet_balance = document.getElementById(
  "withdraw_wallet_balance"
);
// let wallet_balance

const withdraw_button = document.getElementById("withdraw_button");
const wallet_balance_amount_span = document.getElementById(
  "wallet_balance_amount"
);
const wallet_balance_amount = JSON.parse(
  localStorage.getItem("active_user")
).wallet_balance;
wallet_balance_amount_span.innerHTML = `${wallet_balance}/-`;

const withdraw_money = document.getElementById("withdraw_money");

function bg_blur() {
  document.querySelector("header").style.filter = "blur(2.5px)";
  document.querySelector(".left_side").style.filter = "blur(2.5px)";
  document.querySelector(".banner").style.filter = "blur(2.5px)";
  document.querySelector(".content1").style.filter = "blur(2.5px)";
  document.querySelector(".main2").style.filter = "blur(2.5px)";
}

// ---------------view deposit form
deposit_button.addEventListener("click", (e) => {
  deposit_form.classList.add("view");

  bg_blur();
});
// Expected amount display----------
let expected_amount;
const expected_amount_para = document.getElementById("expected_amount");
const three_month = document.getElementById("3_mon");
three_month.addEventListener("click", (e) => {
  const deposit_amount = document.querySelector("#deposit_amount").value;
  expected_amount = (Number(deposit_amount) / 100) * 5 + Number(deposit_amount);
  expected_amount_para.innerHTML = `  ${deposit_amount} * 5% (Interest) = <p id="expected_amount_value"> ₹ ${expected_amount}/-</p>`;
});

const six_month = document.getElementById("6_mon");
six_month.addEventListener("click", (e) => {
  const deposit_amount = document.querySelector("#deposit_amount").value;
  expected_amount =
    (Number(deposit_amount) / 100) * 10 + Number(deposit_amount);
  expected_amount_para.innerHTML = `  ${deposit_amount} * 10% (Interest) = <p id="expected_amount_value"> ₹ ${expected_amount}/-</p>`;
  // console.log(expected_amount,"dc");
});

// For selecting one payment method

const payment_method_label = document.querySelectorAll(".payment_method>label");
const payment_method_div = document.querySelectorAll(".payment_method");
payment_method_label.forEach((e, index) => {
  e.addEventListener("click", (el) => {
    payment_method_div[index].style.backgroundColor = "rgb(244, 244, 244)";

    payment_method_div.forEach((er, ind) => {
      if (ind != index) {
        payment_method_div[ind].style.backgroundColor = "white";
      }
    });
  });
});

// ------------------completion of deposit from

send_request.addEventListener("click", (e) => {
  const deposit_amount = document.querySelector("#deposit_amount").value;
  const upiId = document.querySelector("#upiid").value;

  if (deposit_amount != "" && upiId != "") {
    send_request_div.classList.remove("not_view");
    console.log(deposit_amount);
  }
});

// sending otp request to withdraw amount-----------

// send_otp_request.addEventListener("click", e => {
//     let withdraw_amount = document.querySelector("#withdraw_amount").value
//     let upiId = document.querySelector("#withdraw_upiid").value

//     if (withdraw_amount != "" && withdraw_upiid != "") {
//         send_request_otp.classList.remove("not_view")
//         // console.log(withdraw_amount);
//         // console.log(expected_amount,"dc");
//     }
// }
// )

// ------------------------   Getting deposited values and adding in the local storage

// let transaction_id
//  transaction_id =10000
done_button.addEventListener("click", (e) => {
  e.preventDefault();
  const deposit_amount = document.querySelector("#deposit_amount").value;
  const upiId = document.querySelector("#upiid").value;
  const maturity_period = document.querySelector(
    ".maturity_period:checked"
  ).value;
  const selected_payment_method = document.querySelector(
    ".payment_method input:checked"
  ).value;
  console.log(selected_payment_method);
  const date = localStorage.getItem("current_date");

  // console.log(expected_amount,"ttt");
  if (deposit_amount != "" && upiId != "" && maturity_period) {
    console.log("sdfvc");
    const interest = maturity_period == "6 Months" ? "10 %" : "5%";
    console.log(interest);
    wallet_balance = active_user.wallet_balance ?? 0;
    wallet_balance += Number(deposit_amount);
    active_user.wallet_balance = wallet_balance;

    const proplan_wallet = active_user.proplan_wallet ?? [];
    let transaction_id = active_user.proplan_wallet
      ? active_user.proplan_wallet[proplan_wallet.length - 1].transaction_id
      : 1000;
    console.log(transaction_id, "bwh");
    transaction_id += 1;
    console.log(transaction_id);
    const wallet_transaction = {
      type: "Deposited",
      upiId,
      amount: deposit_amount,
      expected_amount,
      maturity_period,
      wallet_balance,
      interest,
      selected_payment_method,
      date,
      transaction_id,
      plan_status: true,
    };
    proplan_wallet.push(wallet_transaction);
    active_user.proplan_wallet = proplan_wallet;

    localStorage.setItem("active_user", JSON.stringify(active_user));
    setDataInTheLocal();
    location.reload();
  } else {
    alert("The input fields cannot be empty!");
  }
});
// ---------------------viewing Withdraw form----------

withdraw_button.addEventListener("click", (e) => {
  // withdraw_form.classList.add("view")

  // bg_blur();
  window.location.href = "./wallet_transaction.html?page=history";
});
// withdraw_wallet_balance.innerHTML = wallet_balance+"/-"

//  -----------Withdrawing money from deposit-------

// withdraw_money.addEventListener("click",e=>{

//     e.preventDefault()
//     let withdraw_amount = document.querySelector("#withdraw_amount").value

//     let withdraw_upiid = document.querySelector("#withdraw_upiid").value

//     let otp=document.getElementById("otp").value

//     if (withdraw_amount != "" && withdraw_upiid != ""  ) {
//         if(wallet_balance>=withdraw_amount&& withdraw_amount>0){
//             wallet_balance = active_user["wallet_balance"]??0
//             wallet_balance -= Number(withdraw_amount)
//             active_user["wallet_balance"] =wallet_balance

//             let proplan_wallet = active_user["proplan_wallet"]??[]
//             let wallet_transaction= {
//                 type:"Withdrawed",
//                 upiId:withdraw_upiid,
//                 amount:withdraw_amount,
//                 otp,
//                 wallet_balance
//             }
//             proplan_wallet.push(wallet_transaction)
//             active_user["proplan_wallet"]=proplan_wallet

//             localStorage.setItem("active_user", JSON.stringify(active_user))
//             setDataInTheLocal()

//             window.location.href = "./wallet.html"
//         }
//         else{
//             alert("Entered withdraw amount overtakes Wallet balance..! or Enter amount greater than 0")
//         }

// }})

// -------------transactions_view by clicking image

// let count = 2
// let transactions_view = document.getElementById("transactions_view")
// let transactions_table = document.querySelector(".transactions_table")
// transactions_view.addEventListener("click", e => {

//     count++
//     let deg = 180 * count
//     transactions_view.style.transform = `rotate(${deg}deg)`
//     transactions_table.classList.toggle("not_view")
// })

// //  values in the table./.

// wallet_table_body= document.getElementById("wallet_table_body")
// for(let i=active_user["proplan_wallet"].length-1;i>=0;i--){
//     wallet_table_body.innerHTML+=
//         `
//         <tr>
//         <td>${i+1}</td>
//         <td id=${active_user["proplan_wallet"][i]["type"]}>${active_user["proplan_wallet"][i]["type"]}</td>
//         <td>${active_user["proplan_wallet"][i]["amount"]}</td>
//         <td>${active_user["proplan_wallet"][i]["upiId"]}</td>
//         <td>22/04/2023</td>
//         <td>${active_user["proplan_wallet"][i]["wallet_balance"]}</td>

//     </tr>
//         `
// }

// let actibe= JSON.parse(localStorage.getItem("active_user"))
// console.log(actibe,"uy")
// actibe["proplan_wallet"] =[]
// localStorage.setItem("active_user",JSON.stringify(actibe))

setDataInTheLocal()