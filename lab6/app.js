const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Setup bodyParser
const bodyParser = require('body-parser')

//Define our models and init database
const {Sequelize, Model, DataTypes } = require('sequelize')
//create sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
})

//create models
const Customer = sequelize.define('Customers', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 2]  // State code length
        }
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\d{5}(-\d{4})?$/  // ZIP code format
        }
    },
    phone: {
        type: DataTypes.STRING,
        validate: {
            is: /^\+?[\d\s-]+$/  // Phone number format
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
})
const Order = sequelize.define('Orders', {
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
        isIn: ['S', 'M', 'L', 'XL']
        }
    },
    toppings: {
        type: DataTypes.STRING,
    },
    Notes: {
        type: DataTypes.STRING
    },
    Status: {
        type: DataTypes.STRING,
        validate: {
            isIn: ['New', 'Processing', 'Completed']
        }
    }
})
//middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.type('text/html')
    res.render('home')
});

app.post('/submit-customer', async (req,res)=>{
    try{
        const newUser = await Customer.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone
        });
        res.redirect('/orders')
    }catch (error){
        res.status(400).json({ error: error.message });
    }
});

app.get('/orders', async (req, res) => {
    try{
        const customers = await Customer.findAll();
        res.render('orders', {customers});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(3000);
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });