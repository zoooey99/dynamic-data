const express = require('express');
const app = express();
const port = process.env.port || 3000;



//create some routes
app.get('/', (request, response) => {
    response.type('text/html');
    response.send('Home Page');
})

app.get('/beaches', (request, response) => {
    response.type('text/html');
    response.send('Beaches');
})

app.get('/nightlife', (request, response) => {
    response.type('text/html');
    response.send('Night Life');
})

app.get('/about', (request, response) =>{
    r.type('text/html'); //error!
    response.send("About Miami");

})

//default response = 404 not found
//      responses with 2 parameters! 
app.use( (request, response)=>{
    response.type('text/html');
    response.status(404);
    response.send('404 not found');
})

//response for error
//      responses with 4 parameters!
app.use( (error, request, response, next) => {
    console.log(error);
    response.type('text/html');
    response.status(500);
    response.send('500 server error');


})

//run the server
app.listen(port, ()=>{
    console.log(`Express is running on http://localhost:${port};`);
    console.log(` press Ctrl-C to terminate.`);

})