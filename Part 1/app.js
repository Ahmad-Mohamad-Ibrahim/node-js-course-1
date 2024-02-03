const http = require("http");
const fs = require("fs");

var handler = function(req,res){
    if(req.url == "/"){ 
        res.writeHead(200);
        fs.readFile("./template/index.html", (err, data) => {
            res.write(data);
            res.end("");
        });
    }
    else if(req.url == "/contact.html"){ 
        res.writeHead(200);
        fs.readFile("./template/contact.html", (err, data) => {
            res.write(data);
            res.end("");
        });
    }
    else if(req.url == "/about.html"){ 
        res.writeHead(200);
        fs.readFile("./template/about.html", (err, data) => {
            res.write(data);
            res.end("");
        });
    }

    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        fs.readFile("./template/404.html", (err, data) => {
            res.write(data);
            res.end("");
        });
    }

}

http.createServer(handler)
.listen(2000);