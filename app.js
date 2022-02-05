const express = require('express');
const  mongoose  = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const dotEnv = require('dotenv')

dotEnv.config()

app.use(cors());
app.use(bodyParser.json());

// Import Routes
const postsRoute = require('./routes/posts');
app.use('/acronym', postsRoute)

// Routes
    app.get('/',(req, res) => {
        res.send('we are on Home')
    })


// Connect to DB
    mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true}, () => {
        console.log('connected to db');
    })
// How do we start listening to the server
app.listen(3000) 