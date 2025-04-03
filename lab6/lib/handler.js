const { Customer, Order, sequelize } = require('./models');

//app.get('customers/create', handler.customersCreate)
exports.customersCreate = async (req, res) => {
    res.type('text/html')
    res.render('home')
}

//app.get('/customers/edit/:id', handler.customerEdit)
exports.customerEdit = async (req, res) => {
    res.type('text/html')
    const customer = await Customer.findByPk(req.params.id, {
        raw: true
    });
    res.render('home', {customer})
}

exports.customerCreateSubmit = async (req,res)=>{
    try{
        console.log('Received form data:', req.body);
        const newUser = await Customer.create({
            id: req.body.ID,
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

        console.log('User Edited:', newUser.id);
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
        const customers = await Customer.findAll({
            raw: true  // This converts Sequelize models to plain objects
        });
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
    const selected = await Customer.findByPk(req.params.id, {
        raw: true  // Convert Sequelize model to plain object
    })
    console.log(`Showing User: ${selected.id}, ${selected.firstName} ${selected.lastName}`)
    res.render('customerDetails', {selected})
}

exports.deleteCustomer = async (req, res) => {
    const deleted = await Customer.findByPk(req.params.id)
    console.log(`Deleting User: ${deleted.id}, ${deleted.firstName} ${deleted.lastName}`)
    deleted.destroy()
    res.redirect('/customers')
}