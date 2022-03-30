const http = require('http');
const path = require('path');
const fs = require('fs');
const { userInfo } = require('os');

const server = http.createServer( (req, res) => {
    
    //Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url); //sets filePath to whatever request is made

    //Get extension of the file
    let extname = path.extname(filePath);

    //Sets initial content type
    let contentType = "text.html";

    //Check ext and set content type
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //Read File
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                //Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text.html'});
                    res.end(content, 'utf8');
                })
            } else {
                //server error
                res.writeHead(500);
                res.end(`Server Error ${error.code}`);
            }
        } else {
            //Success!
            res.writeHead(200, {'Content-Type': contentType }); //uses content type to know what is being requested
            res.end(content, 'utf8')
        }
    })

    // if(req.url === '/'){ //Checks what is being requested. Singe / = homepage
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), //reads the html file at this listed location
    //     (err, content) => {
    //         if(err) throw err; //checks for error
    //         res.writeHead(200, {'Content-Type': 'text.html'}); //sets status and content type
    //         res.end(content); //serves the browser our html
    //     })

    // }

    // if(req.url === '/api/users'){
    //     const users = [
    //         {name: 'Bob Smith', age: 40},
    //         {name: 'Jim Smith', age: 38}
    //     ];
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users))
    // }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));