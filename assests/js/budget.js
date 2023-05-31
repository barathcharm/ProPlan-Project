let active_user = JSON.parse(localStorage.getItem("active_user"))

// showing budget form ny click the button

let create_budget = document.getElementById("create_budget")
let create_budget_div = document.querySelector(".budget")

create_budget.addEventListener("click",e=>{
    console.log("df");

    create_budget_div.classList.add("view")

    // backgroundblur()
})

//  Nothing to show-----------------

let nothing_to_show=document.querySelector(".nothing_to_show")

if(active_user["budget_plan"]){
    nothing_to_show.style.display ="none"
    
}
else{
    document.getElementById("edit_budget").style.display="none"
}



// Each category value--------------

let categories_data = document.querySelector(".categories_data")
if(active_user["budget_progress"]){
    let expense_categories = active_user["budget_progress"]
    console.log(expense_categories);
    for(let i=0;i<expense_categories.length;i++){
        let bar_height =(Number(expense_categories[i]["amount_spent"])/ Number(expense_categories[i]["category_budget"]))*180
        console.log(bar_height,"bb");
let chart_height=180
        if(bar_height>180){
chart_height-=(bar_height-180)
bar_height=180
console.log(chart_height);
        }

        categories_data.innerHTML+=
        `
        <div class="cateogory_details">
        <h3>${i+1}. ${expense_categories[i]["category_name"]}</h3>
        <p>Budget - ₹ ${expense_categories[i]["category_budget"]}/-</p>
        <p>Spent - ₹ ${expense_categories[i]["amount_spent"]}/-</p>
        <div class="category_chart">
            <div class="expenses_allowed" style=' height:${chart_height}px;' >
    
            </div>
            <div class="expenses_spent" style=' height:${bar_height}px;'>
    
            </div>
        </div>
    </div>
        `
    }
    
}


//  NeW BUDGET FORM-----------------

let next_step=document.querySelectorAll(".next_step")
let budget_set = document.querySelector(".budget_set")
let category_create_sec =document.querySelector(".category_create_sec")
let expenses_change_value =document.getElementById("expenses_change_value")
let savings_change_value = document.getElementById("savings_change_value")
let budget_range =document.getElementById("budget_range").value
let pre_value
let ex_percentage
let sav_value
let sav_percentage
let monthly_income
let monthly_income_input =document.getElementById("monthly_income")
next_step[0].addEventListener("click",e=>{
    
     monthly_income=document.getElementById("monthly_income").value
     monthly_income_input.disabled=true
     if(monthly_income>0){
         pre_value=(budget_range/100)*monthly_income       
         ex_percentage =((pre_value/monthly_income)*100).toFixed(0)
         sav_value =Number(monthly_income)-Number(pre_value)
         sav_percentage =100-Number(ex_percentage)
        console.log(sav_value,sav_percentage,"uytfd");
        expenses_change_value.innerHTML=`
        ${ex_percentage}% / ${pre_value} /-
        `
        savings_change_value.innerHTML=`
        ${sav_percentage}% / ${sav_value} /-
        `
        budget_set.classList.add("view")
        next_step[0].classList.add("not_view")

     }
     else{
        swal("Sorry!", "Enter Valid Monthly income","error");
        
     }
   
})

let budget_range_input=document.getElementById("budget_range")
budget_range_input.addEventListener("change",e=>{
let budget_range =document.getElementById("budget_range").value

     pre_value=(budget_range/100)*monthly_income       
     ex_percentage =((pre_value/monthly_income)*100).toFixed(0)
     sav_value =Number(monthly_income)-Number(pre_value)
     sav_percentage =100-Number(ex_percentage)
    console.log(sav_value,sav_percentage,"uytfd");
    expenses_change_value.innerHTML=`
    ${ex_percentage}% / ${pre_value} /-
    `
    savings_change_value.innerHTML=`
    ${sav_percentage}% / ${sav_value} /-
    `
})
let remaining_amount = document.getElementById("remaining_amount")

next_step[1].addEventListener("click",e=>{
    budget_range_input.disabled=true
    category_create_sec.classList.add("view")
    next_step[1].classList.add("not_view")
    remaining_amount.innerHTML=`${pre_value} /-`
})

let add_category_button = document.getElementById("add_category")
let category_create = document.querySelector(".category_create")
add_category_button.addEventListener("click",e=>{
    let category_budget = document.querySelectorAll(".budget_value")
    let total_expense_value=0
category_budget.forEach(e=>{
    total_expense_value+=Number(e.value)
})
console.log(total_expense_value);
if(total_expense_value>pre_value||total_expense_value==pre_value){
alert("The categorised amount reached the allowed expense amount")
}
else{
    remaining_amount.innerHTML=`${pre_value-total_expense_value} /-`
    let div=`
    <div class="create_category_feild">
                    <input type="text" class="budget_category" placeholder="ex,Shopping..">
                    <input type="number" class="budget_value" placeholder="ex,4000/-...">
                </div>
    `
    category_create.insertAdjacentHTML('beforeend', div);

}

})

//  Saving the total budget values from the budget form------
let save_category_details = document.getElementById("save_category_details")
save_category_details.addEventListener("click",e=>{
    e.preventDefault()
    let expense_categories=[]
    let category_fields = document.querySelectorAll(".budget_category")
    let category_budget = document.querySelectorAll(".budget_value")
    let income =monthly_income
    let savings =sav_value
    let total_expense_allowed=pre_value

    active_user["category"]={}
    active_user["category"]["expense"]={}
    let check=0
    let check1=0
    let check2=0
    let total_category_value=0
    category_budget.forEach(e=>{
        total_category_value+=Number(e.value)
    })

    if(total_category_value<total_expense_allowed||total_category_value==total_expense_allowed){
    for(let i =0;i<category_fields.length;i++){
        let category_name
        let category_budget_value

        if(category_fields[i].value!=""&&category_budget[i].value!=""){
           
                category_name=category_fields[i].value.trim()
                category_budget_value = category_budget[i].value.trim()
    
    
                if(category_name!=""&&category_budget_value>0){
                    let category={
                        category_name ,
                        category_budget :category_budget_value
                    }
                    expense_categories.push(category)
                    active_user["category"]["expense"][category_fields[i].value]=[]
                }
                else{
                    check1=1
                }
            }
            else{
                check=1
                
            } 
        }
          
    }
    else{
        check2=1
    }
    if (check==1||check1==1) {
        alert("The fields cannot be empty")
    }
    else if(check2==1){
        alert("The categorized budget overtakes total budget for the expenses")
        
    }
    
    else{
        if(total_category_value<(total_expense_allowed-1)){
            let others={
                category_name:"Others",
                category_budget:total_expense_allowed-total_category_value
            }
            expense_categories.push(others)
            active_user["category"]["expense"]["Others"]=[]
        }
        let budget_data = {
            income,
            savings,
            total_expense_allowed,
            expense_categories,
            expenses_allowed_percentage:ex_percentage,
            savings_percentage:sav_percentage
    }
    
        active_user["budget_plan"]=budget_data
    
      
        active_user["category"]["income"]={
            Salary:[{
                type:"Salary",
                amount:income,
                category:"Salary"
            }]
        }
        active_user["transaction_list"]=[]
        let date = localStorage.getItem("current_date")
          let salary_transaction=  {
                "count": 1,
                "type": "salary",
                "category": "Salary",
                "amount": `+ ${income}`,
                 date,
                "id": "income",
                "total_balance": income
            }
            active_user["total_balance"]=income
            active_user["total_income"]=income
            active_user["transaction_count"]=1

active_user["transaction_list"].push(salary_transaction)
        
        console.log(budget_data,expense_categories);
      
        localStorage.setItem("active_user",JSON.stringify(active_user))
        // function3("Budget had been created successfully!")
        swal("Success!", "Budget had been created successfully!", "success");
        setTimeout(e=>{ location.reload()},2000)

    }

    

})

let back_button =document.querySelectorAll(".back")
back_button.forEach(e=>{
    e.addEventListener("click",e=>{
        location.reload()
    })
})


// Showing the budget create button----

if(active_user["budget_plan"]){

    let create_budget = document.getElementById("create_budget")
    create_budget.style.display="none"

    let monthly_income_value= document.getElementById("monthly_income_value")
    monthly_income_value.innerHTML=`₹ ${active_user["budget_plan"]["income"]} /-`
    
    let total_expenses_allowed = document.getElementById("total_expenses_allowed")
    total_expenses_allowed.innerHTML=`₹ ${active_user["budget_plan"]["total_expense_allowed"]} /-`

    let total_expenses_allowed_percen = document.getElementById("total_expenses_allowed_percen")

    let total_expenses_allowed_percentage = (active_user["budget_plan"]["expenses_allowed_percentage"])

    total_expenses_allowed_percen.innerHTML=`${Number(total_expenses_allowed_percentage).toFixed(2)} %`

    let total_amount_spent=0
    if(active_user["budget_progress"]){
        for(let i=0;i<active_user["budget_progress"].length;i++){
            total_amount_spent+=Number(active_user["budget_progress"][i]["amount_spent"])
            console.log(Number(active_user["budget_progress"][i]["amount_spent"]),"h");
        }
    }
    console.log(total_amount_spent,"ppp");


    let totally_spent = document.getElementById("totally_spent")
    totally_spent.innerHTML=`₹ ${total_amount_spent} /- `

    let total_expenses_spent_percen = document.getElementById("total_expenses_spent_percen")

    let total_expenses_spent_percentage = (total_amount_spent/active_user["budget_plan"]["income"])*100

    total_expenses_spent_percen.innerHTML=`${total_expenses_spent_percentage.toFixed(2)} %`

    // chart difference in the header--------

    let expenses_allowed = document.querySelector(".expenses_allowed")
    let expenses_spent=document.querySelector(".expenses_spent")

    let total_expenses_spent_percentage_chart= (total_amount_spent/Number(active_user["budget_plan"]["total_expense_allowed"]))*120

    expenses_spent.style.height = `${((total_expenses_spent_percentage_chart/120)*120)}px`



    // ---------- Edit budget form------------

    let edit_budget=document.getElementById("edit_budget")
    let edit_budget_form =document.querySelector(".edit_budget_form")
    edit_budget.addEventListener("click",e=>{
        edit_budget_form.classList.add("view")
    })


let category_values  =document.querySelector(".category_values")
let categorised_data = active_user["budget_plan"]["expense_categories"]
for(let i=0;i<categorised_data.length;i++){
    category_values.innerHTML+=`
    <div class="create_category_feild">
                    <input type="text" class="updated_budget_category" placeholder="ex,Shopping.." value=${categorised_data[i]["category_name"]}>
                    <input type="number" class="updated_budget_value" placeholder="ex,4000/-..." value=${categorised_data[i]["category_budget"]}>
                </div>
    `
}

let updated_monthly_income=document.getElementById("updated_monthly_income")
updated_monthly_income.value=active_user["budget_plan"]["income"]

let updated_budget_range =document.getElementById("updated_budget_range")

let pre_value
let ex_percentage
let sav_value
let sav_percentage

let updated_monthly_income_value
let updated_next_step=document.querySelectorAll(".updated_next_step")
updated_next_step[0].addEventListener("click",e=>{
    updated_next_step[0].classList.add("not_view")
    updated_monthly_income_value=document.getElementById("updated_monthly_income").value
document.getElementById("updated_monthly_income").disabled=true

let updated_budget_values =document.querySelector(".updated_budget_values")
updated_budget_values.classList.remove("not_view")
updated_budget_range.value=active_user["budget_plan"]["expenses_allowed_percentage"]

pre_value=( updated_monthly_income_value*( active_user["budget_plan"]["expenses_allowed_percentage"]/100)).toFixed(2)
ex_percentage=active_user["budget_plan"]["expenses_allowed_percentage"]
sav_value=(updated_monthly_income_value*( active_user["budget_plan"]["savings_percentage"]/100)).toFixed(2)
sav_percentage=active_user["budget_plan"]["savings_percentage"]
document.getElementById("updated_expenses_change_value").innerHTML=
`${ex_percentage}% / ${pre_value}/-`

document.getElementById("updated_savings_change_value").innerHTML=
`${sav_percentage}% / ${sav_value}/-`

})


let updated_expenses_change_value =document.getElementById("updated_expenses_change_value")
let updated_savings_change_value = document.getElementById("updated_savings_change_value")

let updated_budget_range_input=document.getElementById("updated_budget_range")

updated_budget_range_input.addEventListener("change",e=>{
let updated_budget_range =document.getElementById("updated_budget_range").value

     pre_value=(updated_budget_range/100)*updated_monthly_income_value    

     ex_percentage =((pre_value/updated_monthly_income_value)*100).toFixed(0)
     sav_value =Number(updated_monthly_income_value)-Number(pre_value)
     sav_percentage =100-Number(ex_percentage)

     updated_expenses_change_value.innerHTML=`
    ${ex_percentage}% / ${pre_value.toFixed(2)} /-
    `
    updated_savings_change_value.innerHTML=`
    ${sav_percentage}% / ${sav_value.toFixed(2)} /-
    `
})
let updated_expense_allowed
let updated_expense_allowed_percen
let updated_savings
let updated_savings_percen
let updated_remaining_amount = document.getElementById("updated_remaining_amount")

updated_next_step[1].addEventListener("click",e=>{
    updated_next_step[1].classList.add("not_view")

    console.log(pre_value,ex_percentage,sav_percentage,sav_value);
    updated_budget_range.disabled=true
    let category_values =document.querySelector(".updated_category_values")
    category_values.classList.remove("not_view")
    let category_budget = document.querySelectorAll(".updated_budget_value")
    let total_expense_value=0
category_budget.forEach(e=>{
    total_expense_value+=Number(e.value)
})
    updated_remaining_amount.innerHTML=`${pre_value-total_expense_value} /-`

})
let add_category_button = document.getElementById("updated_add_category")
let category_create = document.querySelector(".category_values")
add_category_button.addEventListener("click",e=>{
    let category_budget = document.querySelectorAll(".updated_budget_value")
    let total_expense_value=0
category_budget.forEach(e=>{
    total_expense_value+=Number(e.value)
})
console.log(total_expense_value);
if(total_expense_value>pre_value||total_expense_value==pre_value){
alert("The categorised amount reached the allowed expense amount")
}
else{
    updated_remaining_amount.innerHTML=`${pre_value-total_expense_value} /-`
    let div=`
    <div class="create_category_feild">
                    <input type="text" class="updated_budget_category" placeholder="ex,Shopping..">
                    <input type="number" class="updated_budget_value" placeholder="ex,4000/-...">
                </div>

    `
    category_create.insertAdjacentHTML('beforeend', div);

}

})



let update_button= document.getElementById("update_category_details")
update_button.addEventListener("click",e=>{
    
    e.preventDefault()
    let expense_categories=active_user["budget_plan"]["expense_categories"]
    let category_fields = document.querySelectorAll(".updated_budget_category")
    let category_budget = document.querySelectorAll(".updated_budget_value")
    let income =updated_monthly_income_value
    let savings =sav_value
    let total_expense_allowed=pre_value

    // active_user["category"]={}
    // active_user["category"]["expense"]={}
    let check=0
    let check1=0
    let check2=0

    let total_category_value=0
    category_budget.forEach(e=>{
        total_category_value+=Number(e.value)
    })

   
    if(total_category_value<total_expense_allowed||total_category_value==total_expense_allowed){

    for(let i =0;i<category_fields.length;i++){
        let category_name
        let category_budget_value

        if(category_fields[i].value!=""&&category_budget[i].value!=""){
       
                category_name=category_fields[i].value.trim()
                category_budget_value = category_budget[i].value.trim()
    
                if(category_name!=""&&category_budget_value>0){
                    let current_category_index
                    expense_categories.forEach((e,i)=>{
                        if(e["category_name"]==category_name){
                            current_category_index=i
                           
                        }
                    })
                    if(current_category_index!=undefined){
                        expense_categories[current_category_index]["category_budget"]=category_budget_value
                        console.log("updated");
                    }
                    else{
                        let category={
                            category_name,
                            category_budget :category_budget_value
                        }
                        console.log("created");
                        expense_categories.push(category)
                        active_user["category"]["expense"][category_fields[i].value]=[]
                    }
                   
                }
                else{
                    check1=1
                }
            }
            else{
        check=1 

            }
        }
 
    }
    else{
        check2=1

    }
    
    if (check==1||check1==1) {
        alert("The fields cannot be empty")
    }
    else if(check2==1){
        alert("The categorized budget overtakes total budget for the expenses")
        
    }
    else{
        if(total_category_value<(total_expense_allowed-1)){
let cate="Others"
let cate_ind
            expense_categories.forEach((e,i)=>{
                if(e["category_name"]==cate){
                    cate_ind=i
                }
            })
            if(cate_ind!=undefined){
expense_categories[cate_ind]["category_budget"]=Number(expense_categories[cate_ind]["category_budget"])+ Number(total_expense_allowed-total_category_value)

            }
            else{
                let cate_detail={
                    category_name:'Others',
                    category_budget:total_expense_allowed-total_category_value
                }
                expense_categories.push(cate_detail)
                console.log("iiiiiii");
                active_user["category"]["expense"]["Others"]=[]
            }

        }
        let budget_data = {
            income,
            savings,
            total_expense_allowed,
            expense_categories,
            expenses_allowed_percentage:ex_percentage,
            savings_percentage:sav_percentage
    }
    
        active_user["budget_plan"]=budget_data
    
      
        active_user["category"]["income"]={
            Income:[{
                type:"Salary",
                amount:income,
                category:"Salary"
            }]
        }
        
        console.log(budget_data,expense_categories);
      
        localStorage.setItem("active_user",JSON.stringify(active_user))
        swal("Success!", "Budget had been updated successfully!", "success");
        setTimeout(e=>{ location.reload()},2000)

    }

    
})
}

setDataInTheLocal()