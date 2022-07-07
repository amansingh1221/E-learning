// Synchronous or blocking
// means line by line execution i.e first line willbe
// executed first then second line
const fs=require("fs");
let text1=fs.readFileSync("learn_js/1.txt","utf-8");
console.log(text1);



// Asynchronous or non-blocking
// line by line execution not guaranteed
// callbacks will fire
let text2=fs.readFile("learn_js/1.txt","utf-8",(err,data)=>{
    console.log(err+" "+data);
});//it means let it to read file and till that execute next line. When
//the file is read then execute callback function
console.log("This is massage");