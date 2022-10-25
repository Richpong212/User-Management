const {dev} = require('./config/index');
const express = require("express");
const { clientError, serverError } = require('./controllers/error');
const userRoute = require('./routes/users');
const connectDB = require('./config/db');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.listen(dev.app.port, ()=> {
    console.log(`Server is running on port at http://localhost:${dev.app.port}`);
    connectDB();
})

app.get('/test', (req, res)=>{
    res.render('test');
})

//Routes
app.use(userRoute)

app.use(clientError)
app.use(serverError)