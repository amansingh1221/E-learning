const fs=require("fs");
let text=fs.readFileSync("learn_js/1.txt","utf-8");
console.log(text);

text=text.replace("first","second");

console.log(text);

console.log("Creating a new file...");
fs.writeFileSync("learn_js/2.txt",text);