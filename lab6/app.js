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

//create model
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
    
})

app.get('/', (req, res) => {
    res.type('text/html')
    res.render('home')
});


app.listen(3000);