// // let fname = ["c","a","t"]


// // let temp



// // for(let i = 0;i<fname.length/2;i++){
// //     temp =fname[i]
// //     fname[i]=fname[fname.length-(i+1)]
// //     fname[fname.length-(i+1)] = temp
// // }
// // // console.log(fname);

// // let num =[1000,2,5,3,4,5,6]

// // // let num1 =num.sort(num.forEach(e=>{
// // //     let b =Math.max(num);
// // //     // let a= e+b
// // //     e=e+b
// // //     return e-b
// // //  }))

// // // num2=[];

// // let max=Math.max(...num)
// // let num1=num.forEach(e=>{
// //     // e=e+max;
// //     // f=e-max;
// //     if(e==max){
// //         let check=num.indexOf(e)
// //         num.splice(check,1)
// //         num.push(max)
// //     }
// // }) 
// // console.log(num);


// let a ="Give respect take respect"
// let st
// let count
// let output={}
// for(let i=0;i<a.length;i++){
//     st =a[i]
//     count =0;

//     for (let j = 0; j < a.length; j++) {
//       if(st==a[j]){
//         count++
//       }  
//     }
//     output[st] = count
// }
// console.log(output);

// // let a=[1,2,2,2,3,4,5]

// // for(let i=0;i<1;i++){
// //     st = a[i]
// //     for(let j=0;j<1;j++){
// //         if(st ==a[j]){
// //             a.splice(a[j],1)
// //         }

// //     // console.log(a);
// //     }
// //     console.log(a);


// //     a.unshift(st)
// // }
// // console.log(a);



function processData(input) {
  //Enter your code here
  let value = {
    0: ' ',

    1: '',

    2: 'abc',

    3: 'def',

    4: 'ghi',

    5: 'jkl',

    6: 'mno',

    7: 'pars',

    8: 'tuv',

    9: 'wxyz',
  }
  let given = input
  console.log(given[1]);


  let given1 = value[given[1]]
  let given2 = String(value[given[2]])
  console.log(value[0],"dec");
  console.log(given2,"2");
      console.log(given2[0],"29087");

  console.log(given[1], given[2], value[given[1]], given1, given1.length, String(value[given[2]]), given2, given2.length);
  let output = ""
  if (given1.length >= 1) {
    console.log("if open");
    for (let i = 0; i < given1.length; i++) {
      if (given2.length >= 1) {
        for (let j = 0; j < given2.length; j++) {
          let values = ""
          values += ' "' + given1[i] + given2[j] + '"' + ","
          console.log(given2[j], "if")
          output += values
        }
      }
      else {
        let values = ""
        values += ' "' + given1[i] + '"' + ","
        console.log(given2[j],"if")
        output += values
      }
    }
  }
  else {
    // console.log("else open");
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < given2.length; j++) {
        let values = ""
        values += ' "' + given2[j] + '"' + ","
        console.log(given2[j], "else")
        output += values
      }
    }
  }
  output = output.slice(0, (output.length - 1))
  output += "]"
  let temp = "["
  output = temp + (output.slice(1, output.length))
  console.log(output);
}