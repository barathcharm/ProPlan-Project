
// ----------Signup Form -------------

let form = document.querySelector("#signup_form")
form.addEventListener("submit", store)
function store(e) {
    e.preventDefault()
    let password = document.getElementById("password").value
    let cpassword = document.getElementById("cpassword").value
    let users = JSON.parse(localStorage.getItem("users")) ?? [];
    let user_email = document.getElementById("email").value
    let test = 0
    users.forEach(e => {

        if (e["email"] == user_email) {
            test = 1

        }
    })
    if (test == 1) {
        alert("The entered mail id already exist")
    }
    else {
        if (password == cpassword) {

            let user_name = document.getElementById("name").value
            let user_email = document.getElementById("email").value
            let user_number = document.getElementById("phone_num").value
            let user_profession = document.getElementById("Profession").value
            let user_pass = document.getElementById("password").value

            let user_data = {
                "display_name": "",
                "name": user_name,
                "email": user_email,
                "number": user_number,
                "profession": user_profession,
                "password": user_pass,
            }

            users = JSON.parse(localStorage.getItem("users")) ?? [];
            users.push(user_data)
            localStorage.setItem("users", JSON.stringify(users))

            let users_backup_information = JSON.parse(localStorage.getItem("users_backup_information")) ?? [];
            users_backup_information.push(user_data)
            localStorage.setItem("users_backup_information", JSON.stringify(users_backup_information))


            window.location.href = "./assests/pages/login.html";
        }
        else {
            alert("password & confirm password doesn't match")
        }
    }





}
