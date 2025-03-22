const express = require('express');


const app = express();
const bodyParser = require('body-parser');
const handler = require('./lib/handler');
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.port || 3000;

let navigation = require("./data/navigation.json");
let slideshow = require("./data/slideshow.json");
let gallery = require('./data/gallery.json');
let content = require('./data/pages.json');
let destinations = require('./data/destinations.json');

//set up the template engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.use(express.static('./public'));


//home page
app.get('/', (request, response) => {
    let slides = slideshow.slides.filter((slide)=>{
        return slide.home == true;
    })

    response.type('text/html');
    response.render("page", {title:"Visit San Francisco", nav: navigation, slides: slides, images: gallery.images}); //implement the template by referencing the template
})

//dynamic route
app.get('/page/:page', (req,res) => {
    //filter pages object to get page form :page req.params.page
    let page = content.pages.filter((item)=>{
        return item.page == req.params.page;
    })
    let slides = slideshow.slides.filter((slide) => {
        return slide.page == req.params.page;
    })
    let dest = destinations.locations.filter((loc)=>{
        return loc.page == req.params.page;
    })

    res.type('text/html');
    res.render("page", {
        title: page[0].title, 
        description: page[0].description,
        nav: navigation, 
        slides: slides, 
        images: gallery.images,
        locations: dest
    }); //implement the template by referencing the template

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