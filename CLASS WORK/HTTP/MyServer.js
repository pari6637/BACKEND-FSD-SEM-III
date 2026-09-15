const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200,{"content-type":"text/html"});
    res.write("<h1> Hello Pari </h1>");
    res.end("Hello from server");
});

server.listen(8000, () => {
    console.log("server is running on port 8000");
});