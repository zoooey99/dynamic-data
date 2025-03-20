//initialize express
const express = require('express')
const app = express()
const port = process.env.port || 3000
const multer = require('multer')

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

app.post('/profile', upload.single('avatar'), function (req, res) {
    // req.file is the name of your file in the form above, here 'avatar'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
    console.log(`original name: ${req.file.originalname}`)
    console.log(`mime type: ${req.file.mimetype}`)
    res.type('text/html')
    res.send('uploaded!!!')
  });

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