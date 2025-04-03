const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//import handler
const handler = require('./lib/handler')

//Setup bodyParser
const bodyParser = require('body-parser')

//Define our models and init database
const {Sequelize, Model, DataTypes } = require('sequelize')
//create sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
})


//middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.redirect('customers/create')
});

app.get('/customers/create', handler.customersCreate)
app.get('/customers', handler.customers)
app.get('/customers/detail/:id', handler.viewCustomer)
app.get('/customers/delete/:id', handler.deleteCustomer)
app.get('/customers/edit/:id', handler.customerEdit)
app.post('/customers/submitCreate', handler.customerCreateSubmit)
app.post('/customers/submitEdit/:id', handler.customerEditSubmit)

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(3000);
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });