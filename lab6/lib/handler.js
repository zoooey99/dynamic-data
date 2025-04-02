const { Customer, Order, sequelize } = require('./models');


exports.submitCustomer = async (req,res)=>{
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

exports.customers = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            raw: true  // This converts Sequelize models to plain objects
        });
        res.render('customers', { customers });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.render('customers', { 
            customers: [],
            error: 'Unable to fetch customers'
        });
    }
};

exports.viewCustomer = async (req, res) => {

}

exports.deleteCustomer = async (req, res) => {
    const deleted = await Customer.findByPk(req.params.id)
    console.log(`Deleting User: ${deleted.id}, ${deleted.firstName} ${deleted.lastName}`)
    deleted.destroy()
    res.redirect('/customers')
}