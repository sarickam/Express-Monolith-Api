var http = require("http");

listner = function (request, response){
    response.writeHead(200, {'content-Type':'text/html'});
    response.end('<h2 style="text-align: centre;">Hello World</h2>');
};

server = http.Server(listner);
server.listen(3000);

console.log("server is running");