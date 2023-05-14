let active_user = JSON.parse(localStorage.getItem("active_user"))

// showing budget form ny click the button

let create_budget = document.getElementById("create_budget")
let create_budget_div = document.querySelector(".create_budget_div")

create_budget.addEventListener("click",e=>{
    console.log("df");

    create_budget_div.classList.add("view")
    backgroundblur()
})
// backgroundblur -------------------

function backgroundblur() {
    document.querySelector("header").style.filter = "blur(2.5px)";
    document.querySelector(".left_side").style.filter = "blur(2.5px)";
    document.querySelector(".center_content").style.filter = "blur(2.5px)";
  }
//  Adding a category on the budget creating form

let add_category_button = document.getElementById("add_category")
let category_create = document.querySelector(".category_create")
add_category_button.addEventListener("click",e=>{

    let div=`
    <div class="create_category_feild">
                    <input type="text" class="budget_category" placeholder="ex,Shopping..">
                    <input type="number" class="budget_value" placeholder="ex,4000/-...">
                </div>

    `
    category_create.insertAdjacentHTML('beforeend', div);

})

//  Saving the total budget values from the budget form-0--

let save_category_details = document.getElementById("save_category_details")
save_category_details.addEventListener("click",e=>{
    let expense_categories=[]
    let category_fields = document.querySelectorAll(".budget_category")
    let category_budget = document.querySelectorAll(".budget_value")
    let income =category_budget[0].value
    let savings =category_budget[1].value

    
    for(let i =2;i<category_fields.length;i++){
        let category={
            category_name : category_fields[i].value,
            category_budget :category_budget[i].value 
        }
        expense_categories.push(category)
    }

    let budget_data = {
        income,
        savings,
        expense_categories
}

    // console.log(budget_data);
    active_user["budget_plan"]=budget_data
    active_user["category"]["income"]={
        Income:[{
            type:"Salary",
            amount:income,
            category:"Income"
        }]
    }
    localStorage.setItem("active_user",JSON.stringify(active_user))
    console.log("ok");
    location.reload()

})

let back_button =document.getElementById("back")
back.addEventListener("click",e=>{
    location.reload()
})

// Each category value--------------

let categories_data = document.querySelector(".categories_data")

let expense_categories = active_user["budget_progress"]
console.log(expense_categories);
for(let i=0;i<expense_categories.length;i++){
    let bar_height =(Number(expense_categories[i]["amount_spent"])/ Number(expense_categories[i]["category_budget"]))*180
    console.log(bar_height);
    categories_data.innerHTML+=
    `
    <div class="cateogory_details">
    <h3>${i+1}, ${expense_categories[i]["category_name"]}</h3>
    <p>Budget - ₹ ${expense_categories[i]["category_budget"]}/-</p>
    <p>Spent - ₹ ${expense_categories[i]["amount_spent"]}/-</p>
    <div class="category_chart">
        <div class="expenses_allowed" >

        </div>
        <div class="expenses_spent" style=' height:${bar_height}px;'>

        </div>
    </div>
</div>
    `
}

// Each category pie charts-------------


let budget_progress= []

let expense_category_details = active_user["budget_plan"]["expense_categories"]


for(let r=0;r<expense_category_details.length;r++){
    let category_name=expense_category_details[r]["category_name"]
    let each_expense_details={
        category_name,
        category_budget:Number(expense_category_details[r]["category_budget"]),
    }

let expense_category_values = active_user["category"]["expense"][category_name]
let amount_spent=0
for(let y=0;y<expense_category_values.length;y++){
    amount_spent+=expense_category_values[y]["amount"]
}

each_expense_details["amount_spent"]=amount_spent

budget_progress.push(each_expense_details)
}

console.log(budget_progress);

active_user["budget_progress"]=budget_progress
localStorage.setItem("active_user",JSON.stringify(active_user))


