const http = require("http");
const fs = require("fs");
const qs = require("querystring");
// const url = require("url");
const dBFilePath = './database/users.txt';

var handler = function(req,res) { 
    if(req.url == "/register.html" && req.method=="POST") {
        res.writeHead(200);
        let reqBody = "";
        req.on("data",function(data) {
            reqBody += data;
        });
        req.on('end',function(){
            console.log("This is reqBody : " + reqBody);
            let parsedQuery = qs.parse(reqBody);
            console.log(parsedQuery);
            console.log("Password is : " + parsedQuery.password);
            if (parsedQuery.password.length >= 8) {
                res.write("Registration Successful");
                fs.exists(dBFilePath, exists => {
                    if(!exists) {
                        fs.open(dBFilePath, 'w', function (err, file) {
                            if (err) throw err;
                            console.log('Created!');
                            console.log(file);
                        });
                        fs.writeFile(dBFilePath, `user:${parsedQuery.username}\nEmail:${parsedQuery.email}\nPassword:${parsedQuery.password}\n\n`, (err) => {
                            res.end("");
                        } ); 
                    }
                    else {
                        fs.appendFile(dBFilePath, `user:${parsedQuery.username}\nEmail:${parsedQuery.email}\nPassword:${parsedQuery.password}\n\n`, (err) => {
                            res.end("");
                        }  );
                    }
                });
            } 
            else {
                res.write("Error password is less than 8 characters");
                res.end("");
            }
        })

    }

    else if(req.url == "/register.html" && req.method=="GET") {
        res.writeHead(200);
        fs.readFile("./template/register.html", (err, data) => {
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