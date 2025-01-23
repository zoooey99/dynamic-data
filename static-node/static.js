const http = require('http');
const fs = require('fs'); //allows you to access the other files within the folder
//with fs, you can create, delete, and edit files

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./public/home.html', (error, content)=>{
    //We need to handle errors first

    //if no errors, we can output the content
    res.end(content);
  });
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//function syntax

const funcName = (parameters)=> {
    console.log('parameters' + parameters);
}
funcName('hello');

