const http = require('http');
const fs = require('fs'); //allows you to access the other files within the folder
//with fs, you can create, delete, and edit files

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
  
    switch(req.url){
      case "":
      case "/":
        displayPage('./public/home.html', res);
      break;

      case "/about":
        displayPage('./public/about.html', res);
      break;

      case "/contact":
        displayPage('./public/contact.html', res);
      break;

      default:
        displayPage('./public/404.html', res, 404);
    }

});


const displayPage = (path, r, status = 200)=> {

  r.statusCode = status;
  r.setHeader('Content-Type', 'text/html');
  fs.readFile( path, (error, content) =>{
    if(error){
      r.statusCode = 500;
      r.end("500 - error");
    }
    r.end(content);
  })
}


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//function syntax

const funcName = (parameters)=> {
    console.log('parameters' + parameters);
}
funcName('hello');

