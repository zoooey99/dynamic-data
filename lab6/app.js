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

// --- Import models HERE ---
// This line ensures Sequelize knows about your models *before* sync
const { sequelize, Customer, Order } = require('./lib/models');


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

app.get('/orders', handler.orders)
app.get('/orders/create/:id', handler.createOrder)
app.post('/orders/create', handler.orderCreateSubmit)

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    // Start the server only after syncing
    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });