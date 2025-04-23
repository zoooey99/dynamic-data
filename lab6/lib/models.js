const { Sequelize, DataTypes } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Define Customer model
const Customer = sequelize.define('Customers',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    })
  
   const Order = sequelize.define('Orders', {
    size: DataTypes.STRING,
    toppings: DataTypes.STRING,
    notes: DataTypes.STRING,
    total: DataTypes.FLOAT,
    status: DataTypes.STRING,
  }) 
  
  // Make the relationship to Customer
  Order.belongsTo(Customer)
  Customer.hasMany(Order)


// Export everything needed
module.exports = {
    sequelize,
    Customer,
    Order
};