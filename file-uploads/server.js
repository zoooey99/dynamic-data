//initialize express
const express = require('express')
const app = express()
const port = process.env.port || 3000
const multer = require('multer')

//Setup bodyParser
const bodyParser = require('body-parser')

//Define our models and init database
const {Sequelize, Model, DataTypes } = require('sequelize')
//create sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
})
//create your first Model
const ProfileImage = sequelize.define('ProfileImages', {
  url: DataTypes.STRING,
})
//Initialize bodyparser... converts POST request objects to json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//sync the models to the database
sequelize.sync()


//initialize hanlebars
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', './views');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

//create routes
app.get('/', (req,res) => {
    res.type('text/html')
    res.render('page')
})

app.post('/profile', upload.single('avatar'), async (req, res) => {
    // req.file is the name of your file in the form above, here 'avatar'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
    console.log(`original name: ${req.file.originalname}`)
    console.log(`mime type: ${req.file.mimetype}`)
    res.type('text/html')
    //res.send('uploaded!!!')
    const img = await ProfileImage.create({
      url: req.file.filename
    })
    res.json(img)
  });

//Addition CRUD Routes
// Get all images
app.get('/images', async (req,res)=>{
  const images = await ProfileImage.findAll()
  res.json(images)
})
// Get specific image Select * From 
app.get('/image/:id', async (req,res)=>{
  const image = await ProfileImage.findByPk(req.params.id)
  res.json(image)
})
// Delete a record
app.get('/image/delete/:id', async (req, res) => {
  const image = await ProfileImage.findByPk(req.params.id)
  image.destroy()
  res.json(image)
})


app.use((req,res) => {
    res.type('text/html')
    res.status(404)
    res.send('not found')
})
app.use((error, req, res, next) => {
    console.error(error);
    res.type('text/html')
    res.status(500)
    res.send('server error')
})

app.listen(port, ()=> {
    console.log(`server started on http://localhost:${port} ctrl + c to terminate`)
})