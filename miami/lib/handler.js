let eList = require('../data/emails.json');
const fs = require('fs');

//include the navigation
let navigation = require("../data/navigation.json");

exports.newsletterSignup= (req,res) =>{
    res.render('newsletter-signup', { nav : navigation, csrf : 'supersecret'});
    //res.render("page", {title: "About Miami", nav: navigation});
    //res.render('newsletter-signup',{csrf : 'supersecret', nav: navigation});
}

exports.newsletterSignupProcess = (req, res) =>{
    console.log(req.body);
    let user = {

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email
    }
    //add the user to our list
    eList.users.push(user);
    console.log(eList);
    let json = JSON.stringify(eList);
    fs.writeFileSync('./data/emails.json', json, 'utf-8', ()=>{});

    res.redirect('/newsletter/list');

    //res.render('newsletter-signup', { csrf : 'supersecret'});

}

exports.newsletterSignupList = (req,res) =>{
    let eList = require('../data/emails.json');

    console.log(eList);
    res.render('userspage', {nav : navigation, "users":eList.users});
}

exports.newsletterUser = (req,res) => {
   console.log(eList);
   let userDetails = eList.users.filter((user)=>{ 
    if (user.email == req.params.email){
        return user;
    }
    });
    console.log(userDetails);
    res.render('userdetails', {"users": userDetails, nav : navigation});

}

exports.newsletterUserDelete = (req, res) => {
    let newList = {};
    newList.users = eList.users.filter((user)=>{ 
        return user.email != req.params.email;
        });
    console.log("Deleting " + req.params.email);

    let json = JSON.stringify(newList);
    fs.writeFileSync('./data/emails.json', json, 'utf-8', ()=>{});
    
    delete require.cache[require.resolve("../data/emails.json")]; //clearing cache for module
    
    res.redirect('/newsletter/list');

}