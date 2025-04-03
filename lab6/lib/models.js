const { Sequelize, DataTypes } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Define Customer model
const Customer = sequelize.define('Customers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
        // validate: {
        //     len: [2, 2]  // State code length
        // }
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     is: /^\d{5}(-\d{4})?$/  // ZIP code format
        // }
    },
    phone: {
        type: DataTypes.STRING,
        // validate: {
        //     is: /^\+?[\d\s-]+$/  // Phone number format
        // }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
        // validate: {
        //     isEmail: true
        // }
    }
});

// Define Order model
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
});
//Make the relationship to Customer
Order.belongsTo(Customer)
Customer.hasMany(Order)


// Export everything needed
module.exports = {
    sequelize,
    Customer,
    Order
};