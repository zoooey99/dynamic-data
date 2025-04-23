const { Customer, Order, sequelize } = require('./models');

//app.get('customers/create', handler.customersCreate)
exports.customersCreate = async (req, res) => {
    res.type('text/html')
    res.render('home')
}

//app.get('/customers/edit/:id', handler.customerEdit)
exports.customerEdit = async (req, res) => {
    res.type('text/html')
    const customer = await Customer.findByPk(req.params.id);
    res.render('home', {customer})
}

exports.customerCreateSubmit = async (req,res)=>{
    try{
        console.log('Received form data:', req.body);
        const newUser = await Customer.create({
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone
        });
        console.log('User created:', newUser);
        res.redirect('/customers');
    }catch (error){
        console.error('Error details:', error);
        res.status(400).json({ 
            error: error.message,
            details: error.errors
        });
    }
};

exports.customerEditSubmit = async (req,res) => {
    try{
        console.log('Received form data:', req.body);
        const customerId = req.params.id;
        await Customer.update({
            id: req.body.ID,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone
        }, {where: { id: customerId}});

        console.log('User Edited:', req.params.id);
        res.redirect('/customers');
    }catch (error){
        console.error('Error details:', error);
        res.status(400).json({ 
            error: error.message,
            details: error.errors
        });
    }
}

exports.customers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.render('customers', { customers });
    } catch (error) {
        console.error('Error fetching customers:', error);
        // Don't try to use the customers variable here since it won't exist if there's an error
        res.render('customers', { 
            customers: [], // Just pass an empty array
            error: 'Unable to fetch customers'
        });
    }
};

exports.viewCustomer = async (req, res) => { // route '/customers/detail/:id'
    const selected = await Customer.findByPk(req.params.id)
    console.log(`Showing User: ${selected.dataValues.id}, ${selected.dataValues.firstName} ${selected.dataValues.lastName}`)
    res.render('customerDetails', {"selected":selected})
}

exports.deleteCustomer = async (req, res) => {
    const deleted = await Customer.findByPk(req.params.id)
    console.log(`Deleting User: ${deleted.id}, ${deleted.firstName} ${deleted.lastName}`)
    deleted.destroy()
    res.redirect('/customers')
}

exports.orders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.render('orders', { "orders" : orders });
    } catch (error) {
        console.error('Error fetching customers:', error);
        // Don't try to use the customers variable here since it won't exist if there's an error
        res.render('orders', { 
            customers: [], // Just pass an empty array
            error: 'Unable to fetch customers'
        });
    }
}

exports.createOrder = async (req,res) => {
    const customer = await Customer.findByPk(req.params.id)
    res.type('text/html')
    res.render('createOrder', {"customer": customer})
}

exports.orderCreateSubmit = async (req, res) => {
    console.log("CREATING NEW ORDER --------------------------------------")
    console.log("Request body:", req.body);
    console.log("Customer ID:", req.body.id);
    const customer = await Customer.findByPk(req.body.id);
    console.log("Customer found:", customer ? true : false);

    // If customer is null, this will cause an error
    if (!customer) {
        console.error("Customer not found with ID:", req.body.id);
        // Handle this error (maybe redirect to an error page)
        return res.redirect('/error');
    }

    let total = 0.0
    let size = req.body.size 
    let toppings = req.body.toppings
    if(size == 'S' ) {
        total += 10.00
    } else if(size == 'M' ) {
        total += 15.00
    } else if(size == 'L' ) {
        total += 18.00
    } else if(size == 'XL' ) {
        total += 22.00
    }
    toppings.forEach( (value) =>{ 
        if(value == 'ham') {
        total += 3.50
        }  
        if(value == 'pepperoni') {
        total += 3.00
        }  
        if(value == 'mushrooms') {
        total += 2.00
        } 
    })
    const toppingsStr = toppings.join(', ');
  // add the order to the customer object
  const newOrder = await customer.createOrder({
    size: size,
    toppings: toppingsStr,
    notes: req.body.notes,
    total: total,
    status: req.body.status
  })
  res.type('text/html')
  res.redirect('/orders')
}