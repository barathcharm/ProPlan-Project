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
    swal("Success!", "Logged In Successfully", "success");
   setTimeout(redirect,2000)
  } else {
    swal("Sorry!", "Enter Valid Email Id and Password","error");
  }
});

function redirect(){
  window.location.href = "./budget.html";
}

let pass_close_img=document.getElementById("pass_close")
let pass_open_img=document.getElementById("pass_open")

let pass1_input = document.getElementById("password")

pass_close_img.addEventListener("click",e=>{
  pass_close_img.style.display="none"
  pass_open_img.style.display="block"
pass1_input.type="text"

})
pass_open_img.addEventListener("click",e=>{
  pass_close_img.style.display="block"
  pass_open_img.style.display="none"
pass1_input.type="password"

})