//  ----------- Login Form ----------

const form_check = document.getElementById("check");
form_check.addEventListener("submit", (e) => {
  e.preventDefault();
  const user_email = document.getElementById("email").value;
  const user_pass = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users"));
  let check;
  users.find((element) => {
    if (element.email == user_email && element.password == user_pass) {
      const active_user = JSON.stringify(element);
      localStorage.setItem("active_user", active_user);
      return (check = 1);
    }
    return (check = 0);
  });
  if (check == 1) {
    window.location.href = "./budget.html";
    alert("Successfully logged in");
  } else {
    alert("incorrect");
  }
});

