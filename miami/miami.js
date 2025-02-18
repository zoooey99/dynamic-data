const express = require('express');


const app = express();
const bodyParser = require('body-parser');
const handler = require('./lib/handler');
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.port || 3000;

let navigation = require("./data/navigation.json");

//set up the template engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');


//create some routes
app.get('/', (request, response) => {
    response.type('text/html');
    response.render("home", {title:"Miami Travel Site", nav: navigation}); //implement the template by referencing the template
})

app.get('/beaches', (request, response) => {
    response.type('text/html');
    response.render("page", {title: "Miami Beaches", nav: navigation});
})

app.get('/nightlife', (request, response) => {
    response.type('text/html');
    response.render("page", {title: "Night Life", nav: navigation});
})

app.get('/about', (request, response) =>{
    response.type('text/html'); 
    response.render("page", {title: "About Miami", nav: navigation});

})
app.get('/search', (request, response) =>{
    console.log(request);
    response.type('text/html'); 
    response.render("page", {title: "Search results for: " + request.query.q});

})
app.get('/basic', (req,res) =>{
    res.render('page', {req});
})

//newsletter routes
app.get('/newsletter-signup', handler.newsletterSignup)
app.post('/newsletter-signup/process', handler.newsletterSignupProcess)
app.get('/newsletter/list', handler.newsletterSignupList)
app.get('/newsletter/detail/:email', handler.newsletterUser)
app.get('/newsletter/delete/:email', handler.newsletterUserDelete)

//default response = 404 not found
//      responses with 2 parameters! 
app.use( (request, response)=>{
    response.type('text/html');
    response.status(404);
    response.send("404 not found");
})

//response for error
//      responses with 4 parameters!
app.use( (error, request, response, next) => {
    console.log(error);
    response.type('text/html');
    response.status(500);
    response.send("500 server error");


})

//run the server
app.listen(port, ()=>{
    console.log(`Express is running on http://localhost:${port};`);
    console.log(` press Ctrl-C to terminate.`);

})