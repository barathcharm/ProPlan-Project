let active_user = JSON.parse(localStorage.getItem("active_user"))
console.log(active_user)
console.log(document.getElementById("display_name"));


let user_name = document.querySelectorAll(".name")

let div = document.querySelector(".right_content")
let div1 = document.querySelector(".right_content1")




add_details();
function add_details(){
 user_name[0].innerHTML = active_user["name"]
document.getElementById("display_name").innerHTML = active_user["display_name"]
document.getElementById("email").innerHTML = active_user["email"]
document.getElementById("ph_no").innerHTML = active_user["number"]
document.getElementById("profession").innerHTML = active_user["profession"]
}
let edit_button = document.querySelector("#edit")
edit_button.addEventListener("click", edit)
function edit() {

    div.classList.add("not_view")
    div1.classList.add("view")
    console.log(active_user["display_name"]);
    div1.innerHTML =
        `<p>Display Name 
    <input type="text" id="new_display_name" value="${active_user["display_name"]}">
    </p> 
    <p>Name 
    <input type="text" id="new_name" value="${active_user["name"]}">
    </p> 
    <p>Email 
    <input type="email" id="new_email" value="${active_user["email"]}" readonly> 
    </p> 
    <p>Phone number
    <input type="tel" id="new_ph_no" pattern=[0-9]{10} value="${active_user["number"]}"> 
    </p> 
    <p>Profession 
    <input type="text" id="new_profession" value="${active_user["profession"]}" > 
    </p> 

    <button id="save"> 
        <img src="../images/icons/save_icon.png" alt="icon"> 
        </button> 
`
    save_details();
}
function save_details() {
    let save_button = document.querySelector("#save")
    save_button.addEventListener("click", save)
    function save(e) {
        div.classList.remove("not_view")
        div1.classList.remove("view")

        e.preventDefault()
        let new_display_name = document.getElementById("new_display_name").value
        let new_name = document.getElementById("new_name").value
        let new_ph_no = document.getElementById("new_ph_no").value
        let new_profession = document.getElementById("new_profession").value
        let alpha ="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM "
        let check=0
        console.log(new_profession);
        for(let k=0;k<new_profession.length;k++){
        let check_sub=0

            for(let j=0;j<alpha.length;j++){
                if (new_profession[k]==alpha[j]) {
                    check_sub =1
                }

            }
            if (check_sub==0) {
               console.log("final");

                check=1
               break
            }
          
        }
        if(new_ph_no.length==10&&new_name!=""&&check==0){
            console.log("sdc")
            active_user["display_name"] = new_display_name
            active_user["name"] = new_name
            active_user["number"] = new_ph_no
            active_user["profession"] = new_profession
            localStorage.setItem("active_user", JSON.stringify(active_user))
    
            let users = JSON.parse(localStorage.getItem("users"))
            users.forEach(e => {
                if (e["email"] == active_user["email"]) {
    
                    e["display_name"] = new_display_name
                    e["name"] = new_name
                    e["number"] = new_ph_no
                    e["profession"] = new_profession
                }
            }
            )
            console.log(active_user);
            localStorage.setItem("users", JSON.stringify(users))
            window.location.href ="./profile.html"
        }
        else{
            alert("1.The Name cannot be empty. 2.Phone number should consists of 10 Numbers. 3.The Profession shouldn't be numbers.")
        }

      
    }
}