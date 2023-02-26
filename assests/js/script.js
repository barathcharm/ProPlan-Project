let add_income = document.getElementById("add_income")

add_income.addEventListener("click",e =>{

    // let form1 =document.createElement("form")
    // form1.setAttribute("class","add_income_form")

    // let form1_h2 = document.createElement("h2")
    // form1_h2.innerHTML ="Add an Income"
    // form1.append(form1_h2)

    // let form1_label1 = document.createElement("label")
    // form1_label1.setAttribute("for","category")
    // form1_label1.innerHTML ="Category"
    // form1.append(form1_label1)

    // let form1_input1 = document.createElement("input")
    // form1_input1.setAttribute("type","text")
    // form1_input1.setAttribute("id","category")
    // form1_input1.setAttribute("placeholder","ex: Salary, Stock returns..,")
    // form1_label1.append(form1_input1)

    // let form1_label2 = document.createElement("label")
    // form1_label2.setAttribute("for","amount")
    // form1_label2.innerHTML ="Amount"
    // form1.append(form1_label2)

    // let form1_input2 = document.createElement("input")
    // form1_input2.setAttribute("type","text")
    // form1_input2.setAttribute("id","amount")
    // form1_input2.setAttribute("placeholder","ex: 1000, 2000..,")
    // form1_label2.append(form1_input2)

    // let button_div =document.createElement("div")
    // button_div.setAttribute("class","button_div")
    // form1.append(button_div)

    // let button1=document.createElement("button")
    // button1.innerHTML="Add Income"
    // button_div.append(button1)

    // let button2=document.createElement("button")
    // button2.innerHTML="Back"
    // button_div.append(button2)

    // let center_side_div =document.getElementsByClassName("center_side")
    // center_side_div[0].append(form1)
 let form1=document.getElementsByClassName("add_income_form");
 form1[0].classList.add("view")
 document.querySelector("header").style.filter= "blur(2.5px)"
 document.querySelector(".left_side").style.filter= "blur(2.5px)"
 document.querySelector(".right_side").style.filter= "blur(2.5px)"
 document.querySelector(".center_side").style.filter= "blur(2.5px)"
})

let add_expense = document.getElementById("add_expense")

add_expense.addEventListener("click",e=>{
    let form1=document.getElementsByClassName("add_expense_form");
    form1[0].classList.add("view")
    document.querySelector("header").style.filter= "blur(2.5px)"
    document.querySelector(".left_side").style.filter= "blur(2.5px)"
    document.querySelector(".right_side").style.filter= "blur(2.5px)"
    document.querySelector(".center_side").style.filter= "blur(2.5px)"
})
//---------------Adding income lists-------------------
let add_income_submit = document.getElementsByClassName("add_income_form")
let count=0
add_income_submit[0].addEventListener("submit",e=>{
    e.preventDefault()
    count++;
    let form1=document.getElementsByClassName("add_income_form")
    let income_type =document.getElementById("income_type").value
    let income_category =document.getElementById("income_category").value
    let income_amount =document.getElementById("income_amount").value
    let home_table_body = document.getElementById("home_table_body")

    home_table_body.innerHTML += ` <tr>
    <td>${count}</td>
    <td>${income_type}<br>
        <span>${income_category}</span>
    </td>
    <td id="income">${income_amount}</td>
    <td>27/01</td>
    <td id="balance">8,500</td>
    <td><span id="edit_icon"><img src="../images/icons/edit_icon.jpg" alt="icon"></span></td>
    <td><span id="delete_icon"><img src="../images/icons/delete_icon.jpg" alt="icon"></span></td>
    </tr>`

    form1[0].classList.remove("view")
    document.querySelector("header").style.filter= "blur(0px)"
    document.querySelector(".left_side").style.filter= "blur(0px)"
    document.querySelector(".right_side").style.filter= "blur(0px)"
    document.querySelector(".center_side").style.filter= "blur(0px)"
    
    
})
