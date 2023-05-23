// ----------Signup Form -------------

const form = document.querySelector("#signup_form");
form.addEventListener("submit", store);
function store(e) {
  e.preventDefault();
  const password = document.getElementById("password").value;
  const cpassword = document.getElementById("cpassword").value;
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  const user_email = document.getElementById("email").value;
  let test = 0;
  users.forEach((e) => {
    if (e.email == user_email) {
      test = 1;
    }
  });
  if (test == 1) {
    alert("The entered mail id already exist");
  } else if (password == cpassword) {
    const user_name = document.getElementById("name").value;
    const user_email = document.getElementById("email").value;
    const user_number = document.getElementById("phone_num").value;
    const user_profession = document.getElementById("Profession").value;
    const user_pass = document.getElementById("password").value;

    const user_data = {
      display_name: "",
      name: user_name.trim(),
      email: user_email.trim(),
      number: user_number.trim(),
      profession: user_profession.trim(),
      password: user_pass.trim(),
    };

    users = JSON.parse(localStorage.getItem("users")) ?? [];
    users.push(user_data);
    localStorage.setItem("users", JSON.stringify(users));

    const users_backup_information =
      JSON.parse(localStorage.getItem("users_backup_information")) ?? [];
    users_backup_information.push(user_data);
    localStorage.setItem(
      "users_backup_information",
      JSON.stringify(users_backup_information)
    );

    window.location.href = "./assests/pages/login.html";
  } else {
    alert("password & confirm password doesn't match");
  }
}
