
//  ----------- Login Form ----------

let form_check = document.getElementById("check")
form_check.addEventListener("submit",e=>{
    e.preventDefault()
    let user_email = document.getElementById("email").value
    let user_pass = document.getElementById("password").value  
    let users = JSON.parse(localStorage.getItem("users"))
    let check;
    users.find(element => {
        if (element["email"] == user_email && element["password"] == user_pass) {
            const active_user = JSON.stringify(element)
            localStorage.setItem("active_user", active_user)
            return check = 1
        }
        else {
            return check = 0
        }
    })
    if (check == 1) {
        window.location.href = "./home.html"
        alert("Successfully logged in")
    }
    else {
        alert("incorrect")
    }
})

