let fname = ["c","a","t"]
let temp
for(let i = 0;i<fname.length/2;i++){
    temp =fname[i]
    fname[i]=fname[fname.length-(i+1)]
    fname[fname.length-(i+1)] = temp
}
// console.log(fname);

let num =[1000,2,5,3,4,5,6]

// let num1 =num.sort(num.forEach(e=>{
//     let b =Math.max(num);
//     // let a= e+b
//     e=e+b
//     return e-b
//  }))

// num2=[];

let max=Math.max(...num)
let num1=num.forEach(e=>{
    // e=e+max;
    // f=e-max;
    if(e==max){
        let check=num.indexOf(e)
        num.splice(check,1)
        num.push(max)
    }
}) 
console.log(num);
