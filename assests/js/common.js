let wallet_bal =JSON.parse(localStorage.getItem("wallet_balance"))
let nav_balance =document.getElementById("nav_balance")

nav_balance.innerHTML = wallet_bal+" /-"

let activee_user = JSON.parse(localStorage.getItem("active_user"))
let displayy_name =document.getElementById("displayy_name")
displayy_name.innerHTML=activee_user["display_name"]

let professionn = document.getElementById("professionn")
professionn.innerHTML =activee_user["profession"]
