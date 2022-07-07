const express=require('express');
const app=express();
app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
  })

const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-type':'text/html'});
    

    url=req.url;
    console.log(url);
    if(url=='/')
    {
        res.end(fileContent);
    }
    if(url=='/course.html'){
        res.end(course);
    }
})
server.listen(80,'127.0.0.1',()=>{
    console.log("Listening on port 80");
} )