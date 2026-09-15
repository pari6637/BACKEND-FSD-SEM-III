//Practice routing using http module
import http from "http";

const server=http.createServer((req,res)=>{
    res.writeHead(200,{"Content-type":"text/html"});
    if(req.url==="/"){
        res.end("<h1> Welcome to Home Page </h1>");
    }
    else if(req.url==="/about"){
        res.end("<h1> Welcome to About Page");
    }
    else if(req.url==="/contact"){
        res.end("<h1> Welcome to Contact Page");
    }
    else{
        res.writeHead(404,{"Content-Type":"text/html"});
    }

})

server.listen(3000,()=>{
    console.log("Server is running on ")
})
